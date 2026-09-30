// AuraMart Admin Portal Script
const API_BASE = "";

// Global Admin State
let state = {
    user: JSON.parse(localStorage.getItem("admin_user")) || null,
    products: [],
    orders: [],
    riders: [],
    isOffline: false
};

// Check authorization
const adminToken = localStorage.getItem("admin_token");
if (!state.user || (state.user.role !== "owner" && state.user.role !== "admin") || !adminToken) {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    window.location.href = "/admin-login.html";
} else {
    state.user.token = adminToken;
}

// Initialize Admin App
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    document.getElementById("admin-user-name").textContent = state.user.name;

    // Bind Event Listeners
    document.getElementById("admin-add-product-btn").addEventListener("click", () => openProductModal());
    document.getElementById("close-admin-modal").addEventListener("click", () => toggleModal("admin-product-modal", false));
    document.getElementById("cancel-product-btn").addEventListener("click", () => toggleModal("admin-product-modal", false));
    document.getElementById("product-form").addEventListener("submit", saveProductHandler);
    document.getElementById("admin-logout-btn").addEventListener("click", handleLogout);

    // Theme toggle
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

    // Initial Load
    loadData();

    // Socket.IO real-time initialization
    if (typeof io !== 'undefined') {
        const adminSocket = io(window.location.origin, { transports: ['websocket', 'polling'] });
        adminSocket.on('connect', () => {
            console.log('[Admin] Socket connected:', adminSocket.id);
            // Join global owner room for new order notifications if needed, though backend currently broadcasts to all admins
        });
        // Listen for global hooks
        adminSocket.on('new_order_placed', (data) => {
            showToast(`🛒 New order placed by ${data.customerName || 'Customer'}! ₹${data.totalAmount?.toFixed(2)}`, 'info');
            loadOrders();
        });
        adminSocket.on('order_status_changed_global', (data) => {
            loadOrders();
        });
    } else {
        console.warn('[Admin] Socket.IO not loaded, falling back to polling');
        setInterval(loadOrders, 6000);
    }
});

// Load Products and Orders
async function loadData() {
    showGlobalLoader(true);
    await checkConnection();
    await loadProducts();
    await loadRiders();
    await loadOrders();
    showGlobalLoader(false);
}

async function loadRiders() {
    if (state.isOffline) {
        state.riders = JSON.parse(localStorage.getItem("riders")) || [];
    } else {
        try {
            const res = await apiCall("/api/auth/riders", "GET", null, true);
            if (res.ok && res.data && res.data.riders) {
                state.riders = res.data.riders;
                localStorage.setItem("riders", JSON.stringify(state.riders));
            }
        } catch (err) {
            console.error("Failed to load riders from server:", err);
        }
    }
}

window.assignOrderRiderHandler = async function (orderId, riderId) {
    showGlobalLoader(true);
    if (state.isOffline) {
        const order = state.orders.find(o => o._id === orderId);
        if (order) {
            if (riderId) {
                const rider = state.riders.find(r => r._id === riderId);
                order.deliveryBoy = rider ? { _id: rider._id, name: rider.name, email: rider.email } : null;
            } else {
                order.deliveryBoy = null;
            }
        }
        localStorage.setItem("orders", JSON.stringify(state.orders));
        showGlobalLoader(false);
        renderOrders();
        showToast("Rider assignment updated (offline)", "success");
    } else {
        try {
            const res = await apiCall(`/api/orders/${orderId}/assign-rider`, "PUT", { deliveryBoyId: riderId || null }, true);
            showGlobalLoader(false);
            if (res.ok) {
                showToast("Rider assigned successfully", "success");
                loadOrders();
            } else {
                showToast(res.data.message || "Failed to assign rider", "error");
            }
        } catch (err) {
            showGlobalLoader(false);
            showToast("Failed to assign rider", "error");
        }
    }
};

async function checkConnection() {
    try {
        const res = await fetch("/api/products");
        state.isOffline = !res.ok;
    } catch (e) {
        state.isOffline = true;
    }
}

async function loadProducts() {
    if (state.isOffline) {
        // Fallback to local storage or mocks
        state.products = JSON.parse(localStorage.getItem("products")) || [];
        if (state.products.length === 0) {
            // Load mock catalog
            state.products = getMockProducts();
            localStorage.setItem("products", JSON.stringify(state.products));
        }
    } else {
        try {
            const res = await apiCall("/api/products");
            if (res.ok && res.data && res.data.products) {
                state.products = res.data.products;
                localStorage.setItem("products", JSON.stringify(state.products));
            }
        } catch (err) {
            console.error("Failed to load products from server:", err);
        }
    }
    renderProducts();
}

async function loadOrders() {
    if (state.isOffline) {
        state.orders = JSON.parse(localStorage.getItem("orders")) || [];
    } else {
        try {
            const res = await apiCall("/api/orders", "GET", null, true);
            if (res.ok && res.data && res.data.orders) {
                state.orders = res.data.orders;
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }
        } catch (err) {
            console.error("Failed to load orders from server:", err);
        }
    }
    renderOrders();
}

// Packer Checklist State
let packerChecklists = {};

window.togglePackerChecklistItem = function (checkbox, orderId) {
    const key = checkbox.getAttribute("data-checklist-key");
    packerChecklists[key] = checkbox.checked;

    // Check if all checkboxes of this order are now checked
    const checkboxes = document.querySelectorAll(`.packer-checkbox-${orderId}`);
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    const packStatusLabel = document.getElementById(`pack-status-${orderId}`);
    const packBtn = document.getElementById(`pack-btn-${orderId}`);

    if (packStatusLabel) {
        if (allChecked) {
            packStatusLabel.textContent = "Checked & Verified";
            packStatusLabel.style.color = "var(--success)";
        } else {
            packStatusLabel.textContent = "Pending Check";
            packStatusLabel.style.color = "var(--warning)";
        }
    }

    if (packBtn) {
        if (allChecked) {
            packBtn.disabled = false;
            packBtn.style.opacity = "1";
            packBtn.style.cursor = "pointer";
            packBtn.innerHTML = `<i class="fa-solid fa-box-open"></i> Complete Packing`;
        } else {
            packBtn.disabled = true;
            packBtn.style.opacity = "0.5";
            packBtn.style.cursor = "not-allowed";
            packBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Check All Items to Pack`;
        }
    }
};

// Calculate and update dashboard stats panels
function updateMetrics() {
    // Total Revenue (all placed, accepted, prepared, dispatched or delivered runs)
    const totalSales = state.orders
        .filter(o => o.status !== "placed" && o.status !== "cancelled")
        .reduce((sum, o) => sum + o.totalAmount, 0);
    const revenueEl = document.getElementById("metric-revenue");
    if (revenueEl) revenueEl.textContent = `₹${totalSales.toFixed(2)}`;

    // Active runs (accepted, prepared, dispatched)
    const activeRuns = state.orders.filter(o => o.status === "dispatched" || o.status === "prepared" || o.status === "accepted").length;
    const runsEl = document.getElementById("metric-active-runs");
    if (runsEl) runsEl.textContent = activeRuns;

    // Low stock warnings
    const lowStock = state.products.filter(p => p.stock < 15).length;
    const lowStockEl = document.getElementById("metric-low-stock");
    if (lowStockEl) lowStockEl.textContent = lowStock;

    // Total orders received
    const totalCount = state.orders.length;
    const totalOrdersEl = document.getElementById("metric-total-orders");
    if (totalOrdersEl) totalOrdersEl.textContent = totalCount;

    // Order status categories
    const pendingApprovalCount = state.orders.filter(o => o.status === "pending_approval").length;
    const placedCount = state.orders.filter(o => o.status === "placed").length;
    const acceptedCount = state.orders.filter(o => o.status === "accepted").length;
    const preparedCount = state.orders.filter(o => o.status === "prepared").length;
    const dispatchedCount = state.orders.filter(o => o.status === "dispatched").length;
    const deliveredCount = state.orders.filter(o => o.status === "delivered").length;
    const cancelledCount = state.orders.filter(o => o.status === "cancelled").length;

    const metricsHTML = `
        <div style="background: rgba(245,158,11,0.05); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid rgba(245,158,11,0.3); text-align: center;">
            <strong>Pending:</strong> <span style="font-weight:700; color:var(--warning);">${pendingApprovalCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <strong>Total:</strong> <span style="font-weight:700; color:var(--primary);">${totalCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <strong>Preparing:</strong> <span style="font-weight:700; color:var(--accent);">${acceptedCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <strong>Packed:</strong> <span style="font-weight:700; color:var(--warning);">${preparedCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <strong>Out for Del:</strong> <span style="font-weight:700; color:var(--primary);">${dispatchedCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center;">
            <strong>Delivered:</strong> <span style="font-weight:700; color:var(--success);">${deliveredCount}</span>
        </div>
        <div style="background: var(--bg-surface-secondary); padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); text-align: center; grid-column: span 3;">
            <strong style="color: var(--text-muted);">Cancelled:</strong> <span style="font-weight:700; color:var(--text-muted);">${cancelledCount}</span>
        </div>
    `;

    const metricsContainer = document.getElementById("admin-order-status-metrics");
    if (metricsContainer) metricsContainer.innerHTML = metricsHTML;

    // --- Chart.js Updates ---
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    // Group orders by date for the Chart (last 7 days logic)
    const dailyData = {};
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dtStr = d.toISOString().split('T')[0];
        dailyData[dtStr] = { rev: 0, orders: 0 };
        return dtStr;
    });

    state.orders.forEach(o => {
        if (!o.createdAt || o.status === 'cancelled') return;
        const dStr = new Date(o.createdAt).toISOString().split('T')[0];
        if (dailyData[dStr]) {
            dailyData[dStr].orders++;
            if (o.status !== 'placed') {
                dailyData[dStr].rev += o.totalAmount;
            }
        }
    });

    const labels = last7Days.map(d => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    });
    const revData = last7Days.map(d => dailyData[d].rev);

    if (adminRevenueChart) {
        adminRevenueChart.data.labels = labels;
        adminRevenueChart.data.datasets[0].data = revData;
        adminRevenueChart.update();
    } else {
        adminRevenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue (₹)',
                    data: revData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1a1b2e',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                        ticks: { color: '#9191a8' }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                        ticks: { color: '#9191a8', callback: function (value) { return '₹' + value; } }
                    }
                }
            }
        });
    }
}

// Render Products Table
function renderProducts() {
    const tableBody = document.getElementById("admin-products-table-body");
    const countEl = document.getElementById("total-inventory-count");

    countEl.textContent = state.products.length;

    if (state.products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding:40px; color:var(--text-muted);">No products found in catalog.</td></tr>`;
        return;
    }

    tableBody.innerHTML = state.products.map(p => {
        const isLowStock = p.stock < 15;
        return `
            <tr style="border-bottom: 1px solid var(--border-color); vertical-align: middle;">
                <td style="padding: 16px 8px; display: flex; align-items: center; gap: 12px;">
                    <img src="${p.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80'}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color);">
                    <div>
                        <strong style="color:var(--text-primary); font-size:0.95rem;">${p.name}</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted); max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${p.description}">${p.description}</div>
                    </div>
                </td>
                <td style="padding: 16px 8px;"><span class="stock-tag" style="background:var(--bg-surface-secondary); color:var(--text-secondary);">${p.category}</span></td>
                <td style="padding: 16px 8px; font-weight:700; color:var(--primary);">₹${p.price.toFixed(2)}</td>
                <td style="padding: 16px 8px;">
                    <span class="stock-tag ${p.stock > 0 ? (isLowStock ? 'stock-out' : 'stock-in') : 'stock-out'}" style="${isLowStock && p.stock > 0 ? 'background: rgba(245,158,11,0.1); color: var(--warning);' : ''}">
                        ${p.stock > 0 ? `${p.stock} Units ${isLowStock ? '(Low)' : ''}` : 'Sold Out'}
                    </span>
                </td>
                <td style="padding: 16px 8px; text-align: right;">
                    <button class="btn btn-secondary btn-sm" onclick="openProductModal('${p._id}')" style="margin-right:6px;"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-secondary btn-sm" onclick="deleteProductHandler('${p._id}')" style="color:var(--danger);"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    }).join("");

    updateMetrics();
}

// Render Orders Preparation Queue
function renderOrders() {
    const container = document.getElementById("admin-orders-queue-container");
    const countEl = document.getElementById("active-orders-count");

    // Filters active orders including pending approval
    const activeOrders = state.orders.filter(o => o.status === "pending_approval" || o.status === "placed" || o.status === "accepted" || o.status === "prepared" || o.status === "dispatched");
    countEl.textContent = activeOrders.length;

    if (activeOrders.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="padding: 40px 0; color: var(--text-secondary);">
                <i class="fa-solid fa-mug-hot" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom:12px;"></i>
                <p>No active grocery orders to prepare/track right now.</p>
            </div>
        `;
        updateMetrics();
        return;
    }

    container.innerHTML = activeOrders.map(o => {
        let actionBtn = "";
        let statusBadge = "";

        if (o.status === "pending_approval") {
            statusBadge = `<span class="stock-tag" style="background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.3); animation: pulseGlow 2s infinite;">⏳ Awaiting Approval</span>`;
            actionBtn = `
                <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
                    <p style="font-size:0.8rem; color:var(--text-secondary); text-align:center; margin:0;">Review the order and approve to begin preparation.</p>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-primary w-full btn-sm" onclick="changeOrderStatusHandler('${o._id}', 'placed')" style="background: linear-gradient(135deg, var(--success), var(--accent)); border:none;">
                            <i class="fa-solid fa-circle-check"></i> Approve Order
                        </button>
                    </div>
                </div>
            `;
        } else if (o.status === "placed") {
            statusBadge = `<span class="stock-tag stock-out" style="background: rgba(239,68,68,0.1); color: var(--danger);">Placed</span>`;
            actionBtn = `<button class="btn btn-primary w-full btn-sm" onclick="changeOrderStatusHandler('${o._id}', 'accepted')"><i class="fa-solid fa-check"></i> Accept Order</button>`;
        } else if (o.status === "accepted") {
            statusBadge = `<span class="stock-tag stock-in" style="background: rgba(6,182,212,0.1); color: var(--accent);">Preparing</span>`;

            // Check if all items of this order are checked
            const allChecked = o.items.every((item, itemIdx) => packerChecklists[`${o._id}-${itemIdx}`] === true);
            actionBtn = `
                <button class="btn btn-warning w-full btn-sm" id="pack-btn-${o._id}" 
                    ${allChecked ? '' : 'disabled style="opacity: 0.5; cursor: not-allowed;"'} 
                    onclick="changeOrderStatusHandler('${o._id}', 'prepared')">
                    ${allChecked ? '<i class="fa-solid fa-box-open"></i> Complete Packing' : '<i class="fa-solid fa-lock"></i> Check All Items to Pack'}
                </button>
            `;
        } else if (o.status === "prepared") {
            statusBadge = `<span class="stock-tag stock-in" style="background: rgba(245,158,11,0.1); color: var(--warning);">Packed</span>`;

            // Rider Assignment Dropdown
            const ridersOptions = state.riders.map(r =>
                `<option value="${r._id}" ${o.deliveryBoy && o.deliveryBoy._id === r._id ? 'selected' : ''}>🛵 ${r.name}</option>`
            ).join('');

            const hasRiderAssigned = !!o.deliveryBoy;

            actionBtn = `
                <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
                    <select class="form-control" style="background:var(--bg-surface-secondary); color:var(--text-primary); border:1px solid var(--border-color); padding:8px; border-radius:var(--border-radius-sm); font-size:0.9rem;" 
                        onchange="assignOrderRiderHandler('${o._id}', this.value)">
                        <option value="">-- Assign Delivery Rider --</option>
                        ${ridersOptions}
                    </select>
                    <button class="btn btn-warning w-full btn-sm" onclick="changeOrderStatusHandler('${o._id}', 'dispatched')" ${!hasRiderAssigned ? 'disabled style="opacity: 0.5; cursor: not-allowed;" title="Assign a rider first"' : ''}>
                        <i class="fa-solid fa-truck-fast"></i> Dispatch Order
                    </button>
                </div>
            `;
        } else if (o.status === "dispatched") {
            statusBadge = `<span class="stock-tag stock-in" style="background: rgba(16,185,129,0.1); color: var(--primary);">Out for Delivery</span>`;
            actionBtn = `
                <div style="text-align:center; font-size:0.85rem; color:var(--text-secondary); width:100%;">
                    <p style="margin-bottom:8px;">🚚 Handled by <strong style="color:var(--text-primary);">${o.deliveryBoy ? o.deliveryBoy.name : 'Rider'}</strong></p>
                    <button class="btn btn-success w-full btn-sm" onclick="changeOrderStatusHandler('${o._id}', 'delivered')"><i class="fa-solid fa-house-circle-check"></i> Deliver Order</button>
                </div>
            `;
        }

        const dateStr = new Date(o.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isPreparing = o.status === "accepted";

        return `
            <div class="cart-item" style="display:block; width:100%; border:1px dashed var(--border-color); padding: 20px; border-radius: var(--border-radius-md);">
                <div class="flex justify-between align-center" style="margin-bottom:12px;">
                    <div>
                        <strong style="font-family:monospace; font-size:1rem; color:var(--primary);">ORDER-${o._id ? o._id.substring(o._id.length - 8).toUpperCase() : 'MOCK'}</strong>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${dateStr}</div>
                    </div>
                    ${statusBadge}
                </div>
                
                <div style="font-size:0.95rem; margin-bottom:12px;">
                    <div style="font-weight:600; color:var(--text-primary);">${o.customer && typeof o.customer === 'object' ? o.customer.name : 'Customer'}</div>
                    <div style="font-size:0.85rem; color:var(--text-secondary); max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">To: ${o.shippingAddress}</div>
                    ${o.customerPhone ? `<div style="font-size:0.85rem; color:var(--text-secondary);"><i class="fa-solid fa-phone"></i> Phone: ${o.customerPhone}</div>` : ''}
                    ${o.deliveryInstructions ? `<div style="font-size:0.85rem; color:var(--warning); font-style:italic;"><i class="fa-solid fa-circle-info"></i> Notes: ${o.deliveryInstructions}</div>` : ''}
                </div>

                <div style="font-size:0.9rem; background: var(--bg-surface-secondary); padding: 12px; border-radius:6px; margin-bottom: 16px;">
                    <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; font-weight:700;">
                        <span>📦 Item Checklist</span>
                        ${isPreparing ? `<span id="pack-status-${o._id}" style="color:var(--warning); font-weight:700;">Pending Check</span>` : ''}
                    </h4>
                    
                    ${o.items.map((item, itemIdx) => {
            const checklistKey = `${o._id}-${itemIdx}`;
            const isChecked = packerChecklists[checklistKey] || false;

            if (isPreparing) {
                return `
                                <label style="display:flex; align-items:center; gap:10px; margin-bottom:8px; cursor:pointer; font-weight:500; user-select:none;">
                                    <input type="checkbox" class="packer-checkbox-${o._id}" data-checklist-key="${checklistKey}" ${isChecked ? 'checked' : ''} onchange="togglePackerChecklistItem(this, '${o._id}')" style="accent-color: var(--warning); width:16px; height:16px;">
                                    <span style="${isChecked ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">
                                        ${item.name} <strong style="color:var(--primary)">x${item.quantity}</strong>
                                    </span>
                                </label>
                            `;
            } else {
                return `
                                <div class="flex justify-between" style="margin-bottom:6px; font-weight:500;">
                                    <span><i class="fa-solid fa-square-check" style="color:var(--success); margin-right:6px;"></i> ${item.name} <strong style="color:var(--primary)">x${item.quantity}</strong></span>
                                    <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                            `;
            }
        }).join("")}
                    
                    <hr class="dropdown-divider" style="margin: 10px 0; border-color:var(--border-color);">
                    <div class="flex justify-between" style="font-weight:700;">
                        <span>Total Paid</span>
                        <span style="color:var(--primary);">₹${o.totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div class="flex justify-center" style="width:100%; margin-bottom:12px;">
                    ${actionBtn}
                </div>
            </div>
        `;
    }).join("");

    updateMetrics();
}

// Chart Instance
let adminRevenueChart = null;

// Open Add/Edit Product Modal
function openProductModal(productId = "") {
    const modalTitle = document.getElementById("admin-modal-title");
    const formId = document.getElementById("form-product-id");
    const formName = document.getElementById("form-name");
    const formPrice = document.getElementById("form-price");
    const formStock = document.getElementById("form-stock");
    const formCategory = document.getElementById("form-category");
    const formImage = document.getElementById("form-image");
    const formDesc = document.getElementById("form-desc");

    if (productId) {
        const p = state.products.find(item => item._id === productId);
        if (p) {
            modalTitle.textContent = "Modify Premium Product";
            formId.value = p._id;
            formName.value = p.name;
            formPrice.value = p.price;
            formStock.value = p.stock;
            formCategory.value = p.category;
            formImage.value = p.image || "";
            formDesc.value = p.description || "";
        }
    } else {
        modalTitle.textContent = "Add Premium Product";
        formId.value = "";
        formName.value = "";
        formPrice.value = "";
        formStock.value = "";
        formCategory.value = "";
        formImage.value = "";
        formDesc.value = "";
    }

    toggleModal("admin-product-modal", true);
}

// Save Product Form Action
async function saveProductHandler(e) {
    e.preventDefault();
    showGlobalLoader(true);

    const id = document.getElementById("form-product-id").value;
    const name = document.getElementById("form-name").value;
    const price = parseFloat(document.getElementById("form-price").value);
    const stock = parseInt(document.getElementById("form-stock").value);
    const category = document.getElementById("form-category").value;
    const image = document.getElementById("form-image").value || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80";
    const description = document.getElementById("form-desc").value;

    const payload = { name, price, stock, category, image, description };

    if (id) {
        // Edit existing product
        if (state.isOffline) {
            const idx = state.products.findIndex(p => p._id === id);
            if (idx !== -1) {
                state.products[idx] = { ...state.products[idx], ...payload };
            }
            localStorage.setItem("products", JSON.stringify(state.products));
            showToast("Product updated successfully", "success");
            toggleModal("admin-product-modal", false);
            renderProducts();
            showGlobalLoader(false);
        } else {
            const res = await apiCall(`/api/products/update/${id}`, "PUT", payload, true);
            showGlobalLoader(false);
            if (res.ok) {
                showToast("Product updated successfully", "success");
                toggleModal("admin-product-modal", false);
                await loadProducts();
            } else {
                showToast(res.data.message || "Failed to update product", "error");
            }
        }
    } else {
        // Add new product
        if (state.isOffline) {
            const hexSuffix = Math.floor(100000 + Math.random() * 900000);
            const newProduct = {
                _id: "60c72b2f9b1d8a23c4003" + hexSuffix,
                ...payload
            };
            state.products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(state.products));
            showToast("Product added successfully", "success");
            toggleModal("admin-product-modal", false);
            renderProducts();
            showGlobalLoader(false);
        } else {
            const res = await apiCall("/api/products/add", "POST", payload, true);
            showGlobalLoader(false);
            if (res.ok) {
                showToast("Product added successfully", "success");
                toggleModal("admin-product-modal", false);
                await loadProducts();
            } else {
                showToast(res.data.message || "Failed to add product", "error");
            }
        }
    }
}

// Delete Product Action
window.deleteProductHandler = async function (productId) {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;
    showGlobalLoader(true);

    if (state.isOffline) {
        state.products = state.products.filter(p => p._id !== productId);
        localStorage.setItem("products", JSON.stringify(state.products));
        showToast("Product deleted successfully", "success");
        renderProducts();
        showGlobalLoader(false);
    } else {
        const res = await apiCall(`/api/products/delete/${productId}`, "DELETE", null, true);
        showGlobalLoader(false);
        if (res.ok) {
            showToast("Product deleted successfully", "success");
            await loadProducts();
        } else {
            showToast(res.data.message || "Failed to delete product", "error");
        }
    }
};

// Change Order Status Prepare Action
window.changeOrderStatusHandler = async function (orderId, status) {
    showGlobalLoader(true);
    if (state.isOffline) {
        const order = state.orders.find(o => o._id === orderId);
        if (order) {
            order.status = status;
            localStorage.setItem("orders", JSON.stringify(state.orders));
            showToast(`Order status updated to ${status}`, "success");
        }
        showGlobalLoader(false);
        renderOrders();
    } else {
        const res = await apiCall(`/api/orders/${orderId}/status`, "PUT", { status }, true);
        showGlobalLoader(false);
        if (res.ok) {
            showToast(`Order status updated to ${status}`, "success");
            await loadOrders();
        } else {
            showToast(res.data.message || "Failed to update order status", "error");
        }
    }
};

// Helper fetch API wrapper
async function apiCall(url, method = "GET", body = null, secure = false) {
    try {
        const headers = { "Content-Type": "application/json" };
        if (secure && state.user && state.user.token) {
            headers["Authorization"] = `Bearer ${state.user.token}`;
        }
        const options = { method, headers };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        const data = await response.json();

        // Globally catch token expiration
        if (response.status === 401 && !url.includes("/api/auth/login")) {
            if (window.handleLogout) {
                window.handleLogout();
            }
        }

        return { ok: response.ok, status: response.status, data };
    } catch (err) {
        return { ok: false, status: 500, data: { message: err.message } };
    }
}

// Modal Toggle
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    } else {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }
}

// Global Loader
function showGlobalLoader(show) {
    const loader = document.getElementById("main-loader");
    if (!loader) return;
    if (show) loader.classList.remove("hidden");
    else loader.classList.add("hidden");
}

// Theme logic
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;
    const icon = themeBtn.querySelector("i");
    if (theme === "dark") {
        icon.className = "fa-regular fa-sun";
    } else {
        icon.className = "fa-regular fa-moon";
    }
}

// Custom Premium Toast
window.showToast = function (message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    let iconClass = "fa-solid fa-circle-check";
    if (type === "error") iconClass = "fa-solid fa-circle-xmark";
    else if (type === "warning") iconClass = "fa-solid fa-triangle-exclamation";

    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="${iconClass} toast-icon"></i>
        <div class="toast-message">${message}</div>
        <span class="toast-close">&times;</span>
    `;
    container.appendChild(toast);
    const closeBtn = toast.querySelector(".toast-close");
    const removeToast = () => {
        toast.classList.add("removing");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    };
    closeBtn.addEventListener("click", removeToast);
    setTimeout(removeToast, 4000);
};

function handleLogout() {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    window.location.href = "/admin-login.html";
}

// Fallback product seeding catalog
function getMockProducts() {
    return [
        {
            _id: "60c72b2f9b1d8a23c4001101",
            name: "Organic Fresh Strawberries (1lb)",
            description: "Sweet, juicy, and 100% organic farm-fresh strawberries. Packed with antioxidants and vitamins.",
            price: 399.00,
            category: "Groceries",
            image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
            stock: 35
        },
        {
            _id: "60c72b2f9b1d8a23c4001102",
            name: "Premium Hass Avocados (4 Pack)",
            description: "Fresh, creamy, and ready-to-eat organic Hass avocados. Perfect for salads, toast, or guacamole.",
            price: 450.00,
            category: "Groceries",
            image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
            stock: 24
        },
        {
            _id: "60c72b2f9b1d8a23c4001116",
            name: "AuraSound Alpha ANC Headphones",
            description: "Experience premium active noise cancelling with 40-hour battery life, high-res audio drivers.",
            price: 19999.00,
            category: "Electronics",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            stock: 15
        }
    ];
}

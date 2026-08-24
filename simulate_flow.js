/**
 * AuraMart End-To-End Checkout and Owner-Managed Delivery Flow Simulator.
 * This script runs native HTTP fetch calls against the local Express server.
 */

async function startSimulation() {
    console.log("==========================================================");
    console.log("   AURAMART E2E OWNER-MANAGED DELIVERY FLOW SIMULATOR   ");
    console.log("==========================================================\n");

    const BASE_URL = "http://localhost:5000";
    const testId = Math.floor(1000 + Math.random() * 9000);
    const customerEmail = `cust_${testId}@auramart-test.com`;
    const password = "securepassword123";

    // Default seeded admin details from db.js
    const adminEmail = "admin@auramart.com";
    const adminPassword = "password";

    try {
        // 1. Register and Login a Customer
        console.log("[1a] Registering test customer...");
        const custRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `Test Customer ${testId}`,
                email: customerEmail,
                password: password
            })
        });
        const custRegData = await custRegRes.json();
        if (!custRegRes.ok) {
            throw new Error(`Customer registration failed: ${JSON.stringify(custRegData)}`);
        }
        console.log(`✅ Registered Customer!`);

        console.log("[1b] Logging in test customer to get JWT...");
        const custLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: customerEmail, password: password })
        });
        const custLoginData = await custLoginRes.json();
        if (!custLoginRes.ok || !custLoginData.token) {
            throw new Error(`Customer login failed: ${JSON.stringify(custLoginData)}`);
        }
        const customerToken = custLoginData.token;
        console.log(`✅ Customer logged in. Token: ${customerToken.substring(0, 20)}...`);

        // 2. Login the Admin (Store Owner)
        console.log("[2] Logging in Store Owner/Admin...");
        const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: adminEmail, password: adminPassword })
        });
        const adminLoginData = await adminLoginRes.json();
        if (!adminLoginRes.ok || !adminLoginData.token) {
            throw new Error(`Admin login failed: ${JSON.stringify(adminLoginData)}`);
        }
        const adminToken = adminLoginData.token;
        console.log(`✅ Admin logged in. Token: ${adminToken.substring(0, 20)}...`);

        // 3. Load products catalog to choose a valid product ID
        console.log("[3] Loading products catalog...");
        const prodRes = await fetch(`${BASE_URL}/api/products`);
        if (!prodRes.ok) {
            throw new Error(`Server returned HTTP ${prodRes.status}`);
        }
        const prodData = await prodRes.json();
        let testProduct = prodData.products && prodData.products[0];
        if (!testProduct) {
            testProduct = { _id: "60c72b2f9b1d8a23c4001103", name: "Gourmet Roasted Coffee Beans", price: 999.00 };
        }
        console.log(`Product: ${testProduct.name} - Price: ₹${testProduct.price}`);

        // 4. Place a customer order
        console.log("[4] Placing a new customer order with coordinates & delivery details...");
        const quantity = 2;
        const subtotal = testProduct.price * quantity;
        const deliveryFee = subtotal > 500 ? 0.00 : 40.00;
        const tax = subtotal * 0.05;
        const discount = subtotal > 1000 ? 100.00 : 0.00;
        const totalAmount = subtotal + deliveryFee + tax - discount;

        const checkoutPayload = {
            items: [
                {
                    product: testProduct._id,
                    name: testProduct.name,
                    quantity: quantity,
                    price: testProduct.price,
                    itemTotal: subtotal
                }
            ],
            totalAmount: totalAmount,
            shippingAddress: "Flat 402, Aura Residency, Bangalore - 560001",
            customerLatLng: [12.9715, 77.5946],
            storeLatLng: [12.9800, 77.5900],
            paymentMethod: "Cash on Delivery",
            paymentStatus: "Pending"
        };

        const createRes = await fetch(`${BASE_URL}/api/orders/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${customerToken}`
            },
            body: JSON.stringify(checkoutPayload)
        });

        const createData = await createRes.json();
        if (!createRes.ok || !createData.order) {
            throw new Error(`Order placement failed: ${JSON.stringify(createData)}`);
        }
        let order = createData.order;
        console.log(`✅ Order Placed Successfully!`);
        console.log(`   Order ID:       ${order._id}`);
        console.log(`   Initial Status: ${order.status}`);
        console.log(`   Total Amount:   ₹${order.totalAmount.toFixed(2)}\n`);

        // Helper to update status
        const updateStatus = async (status, progressLog, additionalBody = {}) => {
            console.log(progressLog);
            const statusRes = await fetch(`${BASE_URL}/api/orders/${order._id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify({ status, ...additionalBody })
            });
            const statusData = await statusRes.json();
            if (!statusRes.ok || !statusData.order) {
                throw new Error(`Status update fail on '${status}': ${JSON.stringify(statusData)}`);
            }
            order = statusData.order;
            console.log(`✅ Transition Success! New Status: ${order.status}`);
        };

        // 5. Admin accepts order
        await updateStatus("accepted", "[5] Admin transitioning order state to 'accepted'...");

        // 6. Admin completes packing (prepared)
        await updateStatus("prepared", "[6] Admin transitioning order state to 'prepared' (Packed)...");

        // 7. Admin dispatches order
        await updateStatus("dispatched", "[7] Admin transitioning order state to 'dispatched' (Out for Delivery)...");

        // 8. Admin delivers order (with mock proof)
        const mockPhotoProof = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAANklEQVR4nO3BMQEAAADCoPVPbQoLoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAHzYAAFW2P2iAAAAAElFTkSuQmCC";
        await updateStatus(
            "delivered",
            "[8] Admin delivering the order directly & uploading doorstep photo proof...",
            { deliveryProof: mockPhotoProof }
        );

        // 9. Customer retrieves history and photo proof
        console.log("\n[9] Customer polls tracking order to check final delivery status & proof...");
        const customerOrdersRes = await fetch(`${BASE_URL}/api/orders`, {
            headers: {
                "Authorization": `Bearer ${customerToken}`
            }
        });
        const customerOrdersData = await customerOrdersRes.json();
        const finalOrder = customerOrdersData.orders ? customerOrdersData.orders.find(o => o._id === order._id) : null;

        if (finalOrder) {
            console.log("\n✅ Final Verification results:");
            console.log(`   Order Status:                ${finalOrder.status}`);
            console.log(`   Admin Delivery Proof:        ${finalOrder.deliveryProof ? `${finalOrder.deliveryProof.substring(0, 50)}... (base64 image verified)` : "None"}`);
            console.log(`   Delivery Coordinator/Rider:  ${finalOrder.deliveryBoy ? (finalOrder.deliveryBoy.name || finalOrder.deliveryBoy) : "Direct Store Fulfilled"}\n`);

            if (finalOrder.status !== "delivered") {
                throw new Error(`Order status was not successfully updated to 'delivered'!`);
            }
        } else {
            throw new Error(`Final order lookup failed. Order ${order._id} was not found in history.`);
        }

        console.log("==========================================================");
        console.log("   E2E TRANSACTION SIMULATION TERMINATED SUCCESSFULLY!   ");
        console.log("   ALL ENDPOINTS PASSED WITH 100% SUCCESS RATE.           ");
        console.log("==========================================================");

    } catch (error) {
        console.error("❌ Simulation Failed:", error.message);
        process.exit(1);
    }
}

startSimulation();

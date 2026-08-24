const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order (Customer)
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, customerLatLng, storeLatLng, paymentMethod, paymentStatus, customerPhone, deliveryInstructions, deliveryAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required"
            });
        }

        let dbSubtotal = 0;
        const validatedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.product} not found`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }

            const itemPrice = product.price; // DB validated price
            const itemTotal = itemPrice * item.quantity;
            dbSubtotal += itemTotal;

            validatedItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: itemPrice,
                itemTotal: itemTotal
            });

            // Deduct stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Apply formula: Subtotal + Delivery Fee + Tax - Discount
        const dbDeliveryFee = dbSubtotal > 500 ? 0.00 : 40.00;
        const dbTax = dbSubtotal * 0.05;
        const dbDiscount = dbSubtotal > 1000 ? 100.00 : 0.00;
        const dbTotalAmount = dbSubtotal + dbDeliveryFee + dbTax - dbDiscount;

        // Perform threshold verification
        if (Math.abs(dbTotalAmount - totalAmount) > 2.0) {
            return res.status(400).json({
                success: false,
                message: `Order amount validation failed. Client calculated: ₹${totalAmount}, Server verified: ₹${dbTotalAmount}`
            });
        }

        // Estimated delivery time: 10 minutes from now (Zepto style)
        const estimatedTime = new Date(Date.now() + 10 * 60 * 1000);

        const order = await Order.create({
            customer: req.user._id,
            items: validatedItems,
            subtotal: dbSubtotal,
            deliveryFee: dbDeliveryFee,
            tax: dbTax,
            discount: dbDiscount,
            totalAmount: dbTotalAmount,
            shippingAddress: shippingAddress || (deliveryAddress ? deliveryAddress.address : ""),
            estimatedTime,
            customerLatLng: customerLatLng || (deliveryAddress ? [deliveryAddress.latitude, deliveryAddress.longitude] : [12.9700, 77.6100]),
            storeLatLng,
            paymentMethod: paymentMethod || "Credit Card",
            paymentStatus: paymentStatus || "Paid",
            customerPhone: customerPhone || (deliveryAddress ? deliveryAddress.mobile : ""),
            deliveryInstructions: deliveryInstructions || "",
            deliveryAddress: deliveryAddress || {
                fullName: req.user.name || "Customer",
                mobile: customerPhone || "",
                address: shippingAddress || "",
                latitude: (customerLatLng && customerLatLng[0]) || 12.9700,
                longitude: (customerLatLng && customerLatLng[1]) || 77.6100
            }
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Orders (Role-based)
const getOrders = async (req, res) => {
    try {
        let orders;

        if (req.user.role === "customer" || req.user.role === "user") {
            orders = await Order.find({ customer: req.user._id })
                .populate("deliveryBoy", "name email")
                .sort({ createdAt: -1 });
        } else if (req.user.role === "owner" || req.user.role === "admin") {
            orders = await Order.find()
                .populate("customer", "name email")
                .populate("deliveryBoy", "name email")
                .sort({ createdAt: -1 });
        } else if (req.user.role === "delivery") {
            // Delivery boys get only their assigned orders
            orders = await Order.find({ deliveryBoy: req.user._id })
                .populate("customer", "name email")
                .sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Assign or Reassign Delivery Rider by Admin/Owner
const assignRiderByAdmin = async (req, res) => {
    try {
        const { deliveryBoyId } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Check if rider exists and has role "delivery"
        if (deliveryBoyId) {
            const User = require("../models/User");
            const rider = await User.findById(deliveryBoyId);
            if (!rider || rider.role !== "delivery") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid rider. User must have role 'delivery'"
                });
            }
            order.deliveryBoy = deliveryBoyId;
        } else {
            order.deliveryBoy = null;
        }

        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("customer", "name email")
            .populate("deliveryBoy", "name email");

        res.status(200).json({
            success: true,
            message: "Rider assignment updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Order Status (Owner or Delivery)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Authorization checks for transitions
        if (req.user.role === "owner" || req.user.role === "admin") {
            // Owner/Admin can perform any status transition: accepted, prepared, dispatched, delivered
            if (status !== "accepted" && status !== "prepared" && status !== "dispatched" && status !== "delivered") {
                return res.status(400).json({
                    success: false,
                    message: "Owner can only transition status to 'accepted', 'prepared', 'dispatched' or 'delivered'"
                });
            }
        } else if (req.user.role === "delivery") {
            // Delivery Boy can mark as dispatched or delivered (retained for fallback)
            if (status !== "dispatched" && status !== "delivered") {
                return res.status(400).json({
                    success: false,
                    message: "Rider can only transition status to 'dispatched' or 'delivered'"
                });
            }
            if (order.deliveryBoy && order.deliveryBoy.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "This order is assigned to another delivery agent"
                });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: "Customers cannot update order status"
            });
        }

        order.status = status;
        if (req.body.deliveryProof) {
            order.deliveryProof = req.body.deliveryProof;
        }
        await order.save();

        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Self-assign Delivery Rider (Delivery Agent only)
const assignDelivery = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (req.user.role !== "delivery") {
            return res.status(403).json({
                success: false,
                message: "Only delivery partners can accept deliveries"
            });
        }

        if (order.deliveryBoy) {
            return res.status(400).json({
                success: false,
                message: "Order already assigned to a rider"
            });
        }

        order.deliveryBoy = req.user._id;
        order.status = "dispatched"; // Set status to dispatched/out-for-delivery automatically upon assignment
        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("deliveryBoy", "name email");

        res.status(200).json({
            success: true,
            message: "Delivery successfully accepted",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus,
    assignDelivery,
    assignRiderByAdmin
};

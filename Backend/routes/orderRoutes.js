const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    updateOrderLocation,
    assignDelivery,
    assignRiderByAdmin
} = require("../controllers/orderController");

const { protect, requireRole } = require("../middleware/authMiddleware");

// All order actions require user login session
router.use(protect);

router.post("/create", requireRole(["customer", "owner", "admin"]), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", requireRole(["owner", "admin", "delivery"]), updateOrderStatus);
router.put("/:id/location", requireRole(["delivery"]), updateOrderLocation);
router.put("/:id/assign", requireRole(["owner", "admin"]), assignDelivery);
router.put("/:id/assign-rider", requireRole(["owner", "admin"]), assignRiderByAdmin);

module.exports = router;

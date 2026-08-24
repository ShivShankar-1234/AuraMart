const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    updateOrderStatus,
    assignDelivery,
    assignRiderByAdmin
} = require("../controllers/orderController");

const { protect, requireRole } = require("../middleware/authMiddleware");

// All order actions require user login session
router.use(protect);

router.post("/create", requireRole(["customer"]), createOrder);
router.get("/", getOrders);
router.put("/:id/status", requireRole(["owner", "admin"]), updateOrderStatus);
router.put("/:id/assign", requireRole(["owner", "admin"]), assignDelivery);
router.put("/:id/assign-rider", requireRole(["owner", "admin"]), assignRiderByAdmin);

module.exports = router;

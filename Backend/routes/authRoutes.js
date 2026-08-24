const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    registerDelivery,
    getRiders
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Register Delivery Partner
router.post("/register-delivery", registerDelivery);

// Get All Riders (Admin only)
router.get("/riders", protect, admin, getRiders);

module.exports = router;
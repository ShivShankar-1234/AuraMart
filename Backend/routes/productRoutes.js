const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// Add Product (Admin Only)
router.post("/add", protect, admin, addProduct);

// Get All Products (Public)
router.get("/", getProducts);

// Get Single Product (Public)
router.get("/:id", getSingleProduct);

// Update Product (Admin Only)
router.put("/update/:id", protect, admin, updateProduct);

// Delete Product (Admin Only)
router.delete("/delete/:id", protect, admin, deleteProduct);

module.exports = router;
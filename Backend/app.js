const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../Frontend")));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Configure dynamic API keys endpoint
app.get("/api/config/google-maps-key", (req, res) => {
    res.json({
        success: true,
        apiKey: process.env.GOOGLE_MAPS_API_KEY || ""
    });
});

// Fallback for SPA routing: serve index.html for any unknown non-api paths
app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next();
    }
    res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { initSocket } = require("./socket/socketManager");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Make io accessible in controllers via app.set
app.set("io", io);

// Initialize socket event handlers
initSocket(io);

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

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[AuraMart] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[AuraMart] Socket.IO real-time tracking enabled`);
});
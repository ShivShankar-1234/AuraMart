const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (exclude password)
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, user not found"
                });
            }

            return next();
        } catch (error) {
            console.error("Auth error:", error);
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        });
    }
};

const admin = (req, res, next) => {
    if (req.user && (req.user.role === "owner" || req.user.role === "admin")) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Not authorized, owner or admin privileges required"
        });
    }
};

const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (req.user && allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: `Forbidden: requires one of the following roles: ${allowedRoles.join(", ")}`
            });
        }
    };
};

module.exports = { protect, admin, requireRole };

/**
 * AuraMart Socket.IO Manager
 * Handles real-time delivery tracking events between riders and customers.
 */

let ioInstance = null;

function initSocket(io) {
    ioInstance = io;

    io.on("connection", (socket) => {
        console.log(`[Socket] Client connected: ${socket.id}`);

        // Customer/Admin: join a specific order's tracking room
        socket.on("join_order_room", (orderId) => {
            socket.join(`order_${orderId}`);
            console.log(`[Socket] ${socket.id} joined room: order_${orderId}`);
        });

        // Rider: join their rider-specific room
        socket.on("join_rider_room", (riderId) => {
            socket.join(`rider_${riderId}`);
            console.log(`[Socket] Rider ${riderId} joined their room`);
        });

        // Rider broadcasts their GPS location for a specific order
        socket.on("rider_location_update", (data) => {
            // data: { orderId, lat, lng, riderId }
            const { orderId, lat, lng, riderId } = data;
            if (!orderId || lat == null || lng == null) return;

            console.log(`[Socket] Location update for order ${orderId}: [${lat}, ${lng}]`);

            // Broadcast to the order's room (customer + admin watching that order)
            io.to(`order_${orderId}`).emit("location_updated", {
                orderId,
                lat,
                lng,
                riderId,
                timestamp: Date.now()
            });
        });

        // Rider/Admin: emit order status change to all watchers
        socket.on("order_status_changed", (data) => {
            const { orderId, status } = data;
            if (!orderId || !status) return;

            io.to(`order_${orderId}`).emit("status_updated", {
                orderId,
                status,
                timestamp: Date.now()
            });
        });

        socket.on("disconnect", () => {
            console.log(`[Socket] Client disconnected: ${socket.id}`);
        });
    });

    return io;
}

function getIO() {
    if (!ioInstance) {
        throw new Error("Socket.IO has not been initialized. Call initSocket(io) first.");
    }
    return ioInstance;
}

module.exports = { initSocket, getIO };

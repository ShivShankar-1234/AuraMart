/**
 * AuraMart Database Seed Script
 * Run with: node seed.js
 * 
 * Creates the default owner and demo customer accounts if they don't exist.
 */

require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const DEMO_USERS = [
    { name: "Store Owner", email: "admin@auramart.com", password: "password", role: "owner" },
    { name: "Customer", email: "user@auramart.com", password: "password", role: "customer" },
    { name: "Delivery Rider", email: "delivery@auramart.com", password: "password", role: "delivery" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB\n");

        for (const u of DEMO_USERS) {
            const existing = await User.findOne({ email: u.email });
            if (existing) {
                console.log(`⚠️  ${u.email} already exists (role: ${existing.role}) — skipping`);
                continue;
            }
            const hashed = await bcrypt.hash(u.password, 10);
            await User.create({ name: u.name, email: u.email, password: hashed, role: u.role });
            console.log(`✅ Created: ${u.email}  (role: ${u.role})`);
        }

        console.log("\n🎉 Seed complete. You can now log in with:");
        DEMO_USERS.forEach(u => console.log(`   ${u.role.padEnd(10)} → ${u.email} / ${u.password}`));

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();

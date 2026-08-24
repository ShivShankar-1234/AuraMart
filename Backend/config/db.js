const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Product = require("../models/Product");

const seedDatabase = async () => {
    try {
        // 1. Seed Owner (previously Admin)
        const ownerEmail = "admin@auramart.com";
        const existingOwner = await User.findOne({ email: ownerEmail });
        
        if (!existingOwner) {
            const hashedPassword = await bcrypt.hash("password", 10);
            await User.create({
                name: "Store Owner",
                email: ownerEmail,
                password: hashedPassword,
                role: "owner"
            });
            console.log("🌱 Database Seeding: Created Default Owner Account (admin@auramart.com)");
        }

        // 2. Seed Default Customer
        const customerEmail = "user@auramart.com";
        const existingCustomer = await User.findOne({ email: customerEmail });
        if (!existingCustomer) {
            const hashedPassword = await bcrypt.hash("password", 10);
            await User.create({
                name: "Customer User",
                email: customerEmail,
                password: hashedPassword,
                role: "customer"
            });
            console.log("🌱 Database Seeding: Created Default Customer Account (user@auramart.com)");
        }

        // 3. Seed Default Delivery Boy
        const deliveryEmail = "delivery@auramart.com";
        const existingDelivery = await User.findOne({ email: deliveryEmail });
        if (!existingDelivery) {
            const hashedPassword = await bcrypt.hash("password", 10);
            await User.create({
                name: "Delivery Rider",
                email: deliveryEmail,
                password: hashedPassword,
                role: "delivery"
            });
            console.log("🌱 Database Seeding: Created Default Delivery Account (delivery@auramart.com)");
        }

        // 3. Seed Products if empty or old set (less than 10 items)
        let productCount = await Product.countDocuments();
        if (productCount < 50) {
            console.log("🧹 Database Seeding: Clearing old product list to seed new groceries list...");
            await Product.deleteMany({});
            productCount = 0;
        }

        if (productCount === 0) {
            const defaultProducts = [
          {
                    "_id": "60c72b2f9b1d8a23c4001101",
                    "name": "Organic Fresh Strawberries (1lb)",
                    "description": "Sweet, juicy, and 100% organic farm-fresh strawberries. Packed with antioxidants and vitamins.",
                    "price": 399,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
                    "stock": 35
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001102",
                    "name": "Premium Hass Avocados (4 Pack)",
                    "description": "Fresh, creamy, and ready-to-eat organic Hass avocados. Perfect for salads, toast, or guacamole.",
                    "price": 450,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
                    "stock": 24
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001103",
                    "name": "Gourmet Roasted Coffee Beans (12oz)",
                    "description": "Artisanal medium roast coffee beans sourced ethically from single-origin Colombian farms.",
                    "price": 999,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=80",
                    "stock": 50
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001104",
                    "name": "Pure Raw Organic Honey (16oz)",
                    "description": "Unfiltered, unpasteurized, and 100% pure raw wildflower honey. Sourced from sustainable apiaries.",
                    "price": 650,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
                    "stock": 18
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001105",
                    "name": "Organic Whole Milk (1 Gallon)",
                    "description": "Fresh and creamy pasteurized organic whole milk from pasture-raised local dairy cows.",
                    "price": 320,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80",
                    "stock": 20
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001106",
                    "name": "Fresh Brown Eggs (1 Dozen)",
                    "description": "Grade-A cage-free brown eggs, gathered daily from local family farms. Rich in protein.",
                    "price": 180,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80",
                    "stock": 40
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001107",
                    "name": "Crisp Organic Fuji Apples (3lb)",
                    "description": "Sweet, crunchy, and freshly picked organic Fuji apples. High in dietary fiber.",
                    "price": 490,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
                    "stock": 15
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001108",
                    "name": "Fresh Bunch of Bananas (5-6 pcs)",
                    "description": "Sweet and perfectly ripened yellow bananas. Rich in potassium and ideal for energy.",
                    "price": 120,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001109",
                    "name": "Organic Baby Spinach (16oz)",
                    "description": "Pre-washed and ready to eat, tender organic baby spinach leaves.",
                    "price": 240,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
                    "stock": 22
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001110",
                    "name": "Whole Wheat Sourdough Bread",
                    "description": "Freshly baked, artisanal sourdough bread with a crispy crust and soft crumb.",
                    "price": 150,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80",
                    "stock": 12
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001111",
                    "name": "Extra Virgin Olive Oil (500ml)",
                    "description": "Cold-pressed extra virgin olive oil imported from Mediterranean groves.",
                    "price": 890,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001112",
                    "name": "Premium Basmati Rice (5kg)",
                    "description": "Aromatic, long-grain basmati rice. Aged to perfection, ideal for biryani.",
                    "price": 750,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
                    "stock": 18
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001113",
                    "name": "Red Cherry Tomatoes (10oz)",
                    "description": "Sweet, vine-ripened red cherry tomatoes. Perfect for salads or roasting.",
                    "price": 130,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
                    "stock": 35
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001114",
                    "name": "Fresh Organic Carrots (1lb)",
                    "description": "Sweet and crunchy farm-fresh organic orange carrots.",
                    "price": 90,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80",
                    "stock": 45
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001115",
                    "name": "Dark Chocolate Granola Bar (6pc)",
                    "description": "Whole grain oats mixed with organic honey and premium dark chocolate chips.",
                    "price": 290,
                    "category": "Groceries",
                    "image": "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001116",
                    "name": "AuraSound Alpha ANC Headphones",
                    "description": "Experience premium active noise cancelling with 40-hour battery life, high-res audio drivers.",
                    "price": 19999,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
                    "stock": 15
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001117",
                    "name": "Chronos Active Smartwatch",
                    "description": "Stunning AMOLED screen, 10-day battery life, continuous heart rate and SpO2 tracking.",
                    "price": 14999,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
                    "stock": 22
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001121",
                    "name": "Nexus Dual-Band Wifi Router",
                    "description": "High speed gigabit coverage up to 2500 sq ft. Ideal for gaming and 4K streaming.",
                    "price": 4500,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
                    "stock": 15
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001122",
                    "name": "Quantum Wireless Mechanical Keyboard",
                    "description": "Tactile brown switches, RGB backlit keys, dual Bluetooth-wireless connectivity.",
                    "price": 8999,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
                    "stock": 12
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001123",
                    "name": "StreamVision 4K Ultra Webcam",
                    "description": "Dual stereo mics, autofocus, privacy cover, excellent low light performance.",
                    "price": 6500,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1603538466133-c419967675f9?w=600&auto=format&fit=crop&q=80",
                    "stock": 14
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001124",
                    "name": "Apex Pro Ergonomic Gaming Mouse",
                    "description": "Ultra-lightweight design, 16000 DPI optical sensor, custom RGB side lights.",
                    "price": 4999,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
                    "stock": 20
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001125",
                    "name": "SoundPulse Portable Speaker",
                    "description": "IPX7 waterproof, deep bass, 24-hour playtime. Perfect for pool parties.",
                    "price": 3499,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001126",
                    "name": "ChargeSpeed 20000mAh Power Bank",
                    "description": "22.5W fast charge output with 3 USB ports. Charge devices multiple times.",
                    "price": 1899,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001127",
                    "name": "Lumina LED Ring Light (10-inch)",
                    "description": "3 light modes, 10 brightness levels, tripod stand, holds any size smartphone.",
                    "price": 1200,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1590608897129-79da98d15969?w=600&auto=format&fit=crop&q=80",
                    "stock": 35
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001128",
                    "name": "HD-Focus Clip-on Lapel Mic",
                    "description": "Omnidirectional microphone, noise reduction, 3.5mm jack with adapter, crystal clear audio.",
                    "price": 950,
                    "category": "Electronics",
                    "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80",
                    "stock": 50
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001118",
                    "name": "Metro-Pack Anti-Theft Backpack",
                    "description": "Waterproof fabric, hidden zipper compartments, built-in USB charging port.",
                    "price": 3499,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
                    "stock": 45
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001131",
                    "name": "Classic Navy Button-down Shirt",
                    "description": "100% premium cotton, slim fit, button-down collar, comfortable daily wear.",
                    "price": 1499,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001132",
                    "name": "Slim-Fit Stretch Denim Jeans",
                    "description": "Durable denim blend, stretch recovery fabric, classic 5-pocket styling.",
                    "price": 2499,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80",
                    "stock": 20
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001133",
                    "name": "BreezeWalk Running Shoes",
                    "description": "Breathable knit upper, shock absorbing outsole, cushioned heel.",
                    "price": 4999,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
                    "stock": 18
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001134",
                    "name": "Urban Leather Bomber Jacket",
                    "description": "Premium synthetic faux leather, ribbed cuffs, classic stand-up collar design.",
                    "price": 7999,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
                    "stock": 8
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001135",
                    "name": "Cotton Crewneck Pocket T-Shirt",
                    "description": "Ultra soft combed cotton, tagless neck label, chest utility pocket.",
                    "price": 690,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001136",
                    "name": "CozyKnit Fleece Winter Hoodie",
                    "description": "Brushed fleece interior, adjustable drawstring hood, kangaroo front pouch.",
                    "price": 1890,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
                    "stock": 22
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001137",
                    "name": "ComfortFit Athletic Jogger Pants",
                    "description": "Elastic waistband, ribbed ankle cuffs, side zipper pockets for keys/phone.",
                    "price": 1290,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
                    "stock": 35
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001138",
                    "name": "ActiveShield Polarized Sunglasses",
                    "description": "100% UV protection, shatterproof lenses, lightweight polycarbonate frame.",
                    "price": 990,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
                    "stock": 40
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001139",
                    "name": "All-Weather Canvas Slip-on Shoes",
                    "description": "Durable canvas material, vulcanized rubber sole, easy elastic slip-on.",
                    "price": 1990,
                    "category": "Fashion",
                    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80",
                    "stock": 24
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001141",
                    "name": "ErgoFlow Minimalist Office Chair",
                    "description": "Adjustable 3D lumbar support, breathable mesh, aluminum base, posture support.",
                    "price": 12999,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80",
                    "stock": 10
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001142",
                    "name": "CozyNook Scented Candles (3 Set)",
                    "description": "Eco-friendly soy wax, therapeutic essential oils (Lavender, Vanilla, Citrus).",
                    "price": 890,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001143",
                    "name": "HydroGlow Cool Mist Humidifier",
                    "description": "Whisper-quiet operation, auto-off functionality, 7-color soothing night light.",
                    "price": 2190,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&auto=format&fit=crop&q=80",
                    "stock": 15
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001144",
                    "name": "Velvet Touch Memory Foam Pillows",
                    "description": "Ergonomic contour design, bamboo pillowcase, slow-rebound memory foam.",
                    "price": 1490,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001145",
                    "name": "AeroBreeze High-Velocity Fan",
                    "description": "3 speeds, 90-degree oscillation, sturdy tilt base, sleek modern styling.",
                    "price": 1890,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1618946897711-2eb28dfeb4fa?w=600&auto=format&fit=crop&q=80",
                    "stock": 18
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001146",
                    "name": "HerbalEssence Oil Diffuser",
                    "description": "Aroma mist generator, elegant wood grain style, ultrasonic silent technology.",
                    "price": 1290,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&auto=format&fit=crop&q=80",
                    "stock": 20
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001147",
                    "name": "PureShield HEPA Air Purifier",
                    "description": "Three-stage filtration removes 99.97% of smoke, dust, and pet dander.",
                    "price": 8999,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80",
                    "stock": 8
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001148",
                    "name": "SmartGlow App-controlled LED Bulb",
                    "description": "16 million colors, voice control compatibility, timing schedule features.",
                    "price": 750,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1550985543-f47f38aee646?w=600&auto=format&fit=crop&q=80",
                    "stock": 45
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001149",
                    "name": "Bamboo Fiber Bathroom Bath Mat",
                    "description": "Ultra absorbent, fast-drying technology, non-slip latex rubber backing.",
                    "price": 590,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001150",
                    "name": "Thermalinsulated Curtains",
                    "description": "Energy-saving blackout curtain panels blocks out 95% light and reduces noise.",
                    "price": 1990,
                    "category": "Home & Living",
                    "image": "https://images.unsplash.com/photo-1514894780887-121968d00567?w=600&auto=format&fit=crop&q=80",
                    "stock": 12
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001151",
                    "name": "Leathercraft Minimalist Card Wallet",
                    "description": "Genuine top grain leather, RFID blocking technology, holds 6 cards plus cash.",
                    "price": 1290,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001152",
                    "name": "Horizon Stainless Water Bottle",
                    "description": "Double-walled vacuum insulated, cold for 24h, hot for 12h, leakproof cap.",
                    "price": 890,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
                    "stock": 35
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001153",
                    "name": "Multi-Device Wood Desk Organizer",
                    "description": "Premium walnut wood, tablet and phone docks, utility trays for paperclips.",
                    "price": 2490,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1594789096277-2b509ef488f2?w=600&auto=format&fit=crop&q=80",
                    "stock": 15
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001154",
                    "name": "SafeKey Carbon Fiber Key Organizer",
                    "description": "Sleek compact keyholder, stops noise, protects phone screen from scratches.",
                    "price": 690,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80",
                    "stock": 40
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001155",
                    "name": "TechTravel Felt Cable Organizer Bag",
                    "description": "Water resistant padded canvas casing, elastic loops for chargers and SD cards.",
                    "price": 990,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001156",
                    "name": "Titan Ring Loop Phone Grip",
                    "description": "360-degree rotating metal loop stand, ultra thin profile, strong magnetic hold.",
                    "price": 290,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
                    "stock": 50
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001157",
                    "name": "PowerGrip Braided USB-C Cable",
                    "description": "Heavy duty reinforced aramid fiber core, fast charging support up to 60W.",
                    "price": 490,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop&q=80",
                    "stock": 45
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001158",
                    "name": "SafeGuard RFID Passport Holder",
                    "description": "Shields passport, cards, and transit passes from identity theft frequencies.",
                    "price": 790,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
                    "stock": 20
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001159",
                    "name": "ComfortSoft Gel Wrist Rest Pad",
                    "description": "Contoured memory foam support pad reduces friction and strain on wrist joint.",
                    "price": 590,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
                    "stock": 25
          },
          {
                    "_id": "60c72b2f9b1d8a23c4001160",
                    "name": "GoPack Compact Travel Umbrella",
                    "description": "Auto open-close functionality, fortified 9-rib windproof canopy fabric.",
                    "price": 990,
                    "category": "Accessories",
                    "image": "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=600&auto=format&fit=crop&q=80",
                    "stock": 30
          }
];

            await Product.insertMany(defaultProducts);
            console.log("🌱 Database Seeding: Seeded Default Grocery and Premium Products list.");
        }
    } catch (err) {
        console.error("❌ Seeding Database failed:", err.message);
    }
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected Successfully");
        await seedDatabase();
    } catch (error) {
        console.error("⚠️ MongoDB Connection Failed:", error.message);
        console.log("⚠️ Running server in local sandbox demo mode.");
    }
};

module.exports = connectDB;
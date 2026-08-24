/* ==========================================
   AuraMart - Single Page Application Router & State Engine
   ========================================== */

const API_BASE = window.location.origin;

// Mock Products for fallback if Backend is unavailable
const MOCK_PRODUCTS = [
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

// Global State
const state = {
    user: null,
    token: null,
    cart: [],
    products: [],
    orders: [],
    activeOrder: null,
    customerGeoLocation: null,
    categories: ["Groceries", "Electronics", "Fashion", "Home & Living", "Accessories"],
    activeRoute: "#/",
    isOffline: false,
    filters: {
        category: "",
        search: "",
        sort: "default"
    }
};

// ==========================================
// Initialization & Core Event Listeners
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load data from local storage
    state.token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
        try {
            state.user = JSON.parse(savedUser);
            // Enforce role check: User must be customer for main app
            if (state.user && state.user.role !== "customer") {
                state.user = null;
                state.token = null;
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }
        } catch (e) {
            state.user = null;
        }
    }
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        try { state.cart = JSON.parse(savedCart); } catch (e) { state.cart = []; }
    }
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
        try { state.orders = JSON.parse(savedOrders); } catch (e) { state.orders = []; }
    }

    // 2. Setup theme handling
    initTheme();

    // 3. Render initial navbar state
    updateNavbarState();
    updateCartCount();

    // 4. Setup Global Event Listeners
    setupGlobalListeners();

    // 5. Initialize Routing
    window.addEventListener("hashchange", handleRouting);
    handleRouting();

    // 6. Query real customer location coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            state.customerGeoLocation = { lat, lng };
            if (checkoutGoogleMap && checkoutGoogleMarker) {
                const newPos = new google.maps.LatLng(lat, lng);
                checkoutGoogleMarker.setPosition(newPos);
                checkoutGoogleMap.setCenter(newPos);
                checkoutGoogleMap.setZoom(16);
                geocodeLatLng(lat, lng);
            }
        }, err => {
            console.warn("Geolocation permission query declined:", err);
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
    }
});

// Theme Management (Dark / Light Mode)
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    document.getElementById("theme-toggle").addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
        showToast(`Switched to ${newTheme} mode`, "info");
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-toggle").querySelector("i");
    if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

// Global UI Event Bindings
function setupGlobalListeners() {
    // Cart Drawer Toggle
    document.getElementById("cart-toggle-btn").addEventListener("click", toggleCartDrawer);
    document.getElementById("close-cart-btn").addEventListener("click", toggleCartDrawer);
    document.getElementById("cart-drawer-backdrop").addEventListener("click", toggleCartDrawer);
    document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
    document.getElementById("checkout-btn").addEventListener("click", () => {
        toggleCartDrawer();
        window.location.hash = "#/checkout";
    });

    // User Dropdown Menu
    const userMenuBtn = document.getElementById("user-menu-btn");
    const userDropdown = document.getElementById("user-dropdown");
    userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle("hidden");
    });
    document.addEventListener("click", () => {
        userDropdown.classList.add("hidden");
    });

    // Global Search Event
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("global-search");
    searchBtn.addEventListener("click", () => {
        state.filters.search = searchInput.value;
        window.location.hash = "#/shop";
        handleRouting();
    });
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            state.filters.search = searchInput.value;
            window.location.hash = "#/shop";
            handleRouting();
        }
    });

    // Close Modals
    document.getElementById("close-product-modal").addEventListener("click", () => toggleModal("product-modal", false));
    document.getElementById("product-modal-backdrop").addEventListener("click", () => toggleModal("product-modal", false));
}

// ==========================================
// API Handling with Fallbacks
// ==========================================
async function apiCall(endpoint, method = "GET", body = null, useAuth = false) {
    const headers = {
        "Content-Type": "application/json"
    };

    if (useAuth && state.token) {
        headers["Authorization"] = `Bearer ${state.token}`;
    }

    const config = {
        method,
        headers
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        console.warn(`API call failed for ${endpoint}:`, error);
        return { ok: false, status: 503, error: error.message };
    }
}

// Check Backend Connectivity and Load Products
async function loadProducts(forceRefresh = false) {
    if (state.products.length > 0 && !forceRefresh) return;

    const res = await apiCall("/api/products");
    if (res.ok && res.data && res.data.products) {
        state.products = res.data.products;
        state.isOffline = false;
    } else {
        // Fallback to local cache data from localStorage
        console.log("Loading products from local repository cache.");
        const cachedProducts = localStorage.getItem("products");
        if (cachedProducts) {
            try {
                state.products = JSON.parse(cachedProducts);
            } catch (e) {
                state.products = [...MOCK_PRODUCTS];
            }
        } else {
            state.products = [...MOCK_PRODUCTS];
            localStorage.setItem("products", JSON.stringify(state.products));
        }
        state.isOffline = true;
        showToast("Connected to Local Product Repository.", "info");
    }
}

// ==========================================
// Navigation & Routing
// ==========================================
async function handleRouting() {
    const hash = window.location.hash || "#/";
    state.activeRoute = hash;

    // Manage Navbar active link styling
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    // Clear any active tracker intervals when leaving pages
    if (hash !== "#/tracker") {
        if (activeTimerInterval) {
            clearInterval(activeTimerInterval);
            activeTimerInterval = null;
        }
        if (activeTrackerPollInterval) {
            clearInterval(activeTrackerPollInterval);
            activeTrackerPollInterval = null;
        }
    }

    // Parse routes
    let matchedView = "";

    if (hash === "#/" || hash === "") {
        document.getElementById("nav-home").classList.add("active");
        matchedView = await renderHome();
    } else if (hash.startsWith("#/shop")) {
        document.getElementById("nav-shop").classList.add("active");
        matchedView = await renderShop();
    } else if (hash === "#/auth") {
        window.location.href = "/login.html";
        return;
    } else if (hash === "#/checkout") {
        if (!state.user || state.user.role !== "customer" || !state.token) {
            window.location.href = "/login.html";
            return;
        }
        matchedView = renderCheckout();
    } else if (hash === "#/owner" || hash === "#/admin") {
        window.open("/admin.html", "_blank");
        window.location.hash = "#/";
        return;
    } else if (hash === "#/rider") {
        window.open("/delivery.html", "_blank");
        window.location.hash = "#/";
        return;
    } else if (hash === "#/tracker") {
        if (!state.user || state.user.role !== "customer" || !state.token) {
            window.location.href = "/login.html";
            return;
        }
        const trackerNav = document.getElementById("nav-tracker");
        if (trackerNav) trackerNav.classList.add("active");
        matchedView = await renderTracker();
    } else {
        matchedView = renderNotFound();
    }

    const appContent = document.getElementById("app-content");
    appContent.innerHTML = matchedView;

    if (hash === "#/checkout") {
        setTimeout(() => {
            if (window.initCheckoutMap) window.initCheckoutMap();
            // Always show address form so user can fill it regardless of map state
            const addrForm = document.getElementById("delivery-address-form-wrapper");
            if (addrForm) addrForm.style.display = "block";
        }, 120);
    }

    // Attach listeners unique to individual pages
    attachViewSpecificListeners();
}

function renderNotFound() {
    return `
        <div class="container text-center" style="padding: 100px 0;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 5rem; color: var(--warning); margin-bottom: 24px;"></i>
            <h1 style="font-size: 2.5rem; margin-bottom: 16px;">404 - Page Not Found</h1>
            <p style="color: var(--text-secondary); margin-bottom: 32px;">The page you are looking for does not exist or has been relocated.</p>
            <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
    `;
}

// ==========================================
// View Renders
// ==========================================

// --- View: HOME ---
async function renderHome() {
    await loadProducts(true);
    const featured = state.products.slice(0, 3);

    const productGridHTML = renderProductCardsGrid(featured);

    return `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container hero-grid">
                <div class="hero-text">
                    <h1>Sleek Aesthetics.<br><span>Premium Design.</span></h1>
                    <p>Discover an exquisite collection of refined gear, minimalist styling, and futuristic accessories crafted to elevate your daily routine.</p>
                    <div class="hero-actions-container">
                        <a href="#/shop" class="btn btn-primary">Shop Collection <i class="fa-solid fa-arrow-right"></i></a>
                        <a href="#/shop?category=Electronics" class="btn btn-secondary">Tech Gear</a>
                    </div>
                </div>
                <div class="hero-card">
                    <div class="hero-card-header">
                        <span class="hero-card-tag">Featured Release</span>
                        <div style="color: var(--warning)"><i class="fa-solid fa-star"></i> 4.9</div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80" alt="Special Product" class="hero-card-img">
                    <div class="hero-card-info">
                        <h3>AuraSound Studio Pro Max</h3>
                        <div class="flex justify-between align-center">
                            <span class="hero-card-price">$399.99</span>
                            <button onclick="quickAddToCart('mock-1')" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories & Featured Products -->
        <section class="categories-section">
            <div class="container">
                <h2 class="section-title">Elevate Your Lifestyle</h2>
                <p class="section-subtitle">Exquisite design meets everyday utility. Browse our top featured products and curated selections.</p>
                
                <div class="category-tags">
                    <button class="category-tag active" onclick="setHomeCategory('')">All</button>
                    ${state.categories.map(cat => `
                        <button class="category-tag" onclick="setHomeCategory('${cat}')">${cat}</button>
                    `).join("")}
                </div>

                <div class="products-grid" id="home-products-grid">
                    ${productGridHTML}
                </div>
                
                <div class="text-center" style="margin-top: 50px;">
                    <a href="#/shop" class="btn btn-secondary btn-lg">Browse Entire Shop</a>
                </div>
            </div>
        </section>
    `;
}

// --- View: SHOP CATALOG ---
async function renderShop() {
    await loadProducts(true);

    // Process filtering
    let filtered = [...state.products];

    if (state.filters.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === state.filters.category.toLowerCase());
    }

    if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    // Sorting
    if (state.filters.sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.filters.sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.filters.sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    const activeCat = state.filters.category;

    return `
        <section class="shop-section">
            <div class="container">
                <h1 style="font-size: 2.5rem; margin-bottom: 8px;">Explore Products</h1>
                <p style="color: var(--text-secondary); margin-bottom: 40px;">Home / Shop ${activeCat ? `/ ${activeCat}` : ""}</p>
                
                <div class="shop-layout">
                    <!-- Sidebar filters -->
                    <aside class="shop-sidebar">
                        <div class="filter-section">
                            <h4>Categories</h4>
                            <div class="category-filter-list">
                                <label class="category-filter-item">
                                    <input type="radio" name="shop-cat" value="" ${!activeCat ? "checked" : ""} onchange="filterShopCat(this.value)">
                                    <span>All Collections</span>
                                </label>
                                ${state.categories.map(cat => `
                                    <label class="category-filter-item">
                                        <input type="radio" name="shop-cat" value="${cat}" ${activeCat === cat ? "checked" : ""} onchange="filterShopCat(this.value)">
                                        <span>${cat}</span>
                                    </label>
                                `).join("")}
                            </div>
                        </div>

                        <div class="filter-section">
                            <h4>Status Display</h4>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">
                                ${state.isOffline ?
            `<span style="color: var(--warning);"><i class="fa-solid fa-triangle-exclamation"></i> Offline Sandbox Sandbox Mode</span>` :
            `<span style="color: var(--success);"><i class="fa-solid fa-circle-check"></i> Connected Live to MongoDB</span>`
        }
                            </div>
                        </div>
                    </aside>

                    <!-- Catalog listings -->
                    <div class="shop-content-area">
                        <div class="shop-toolbar">
                            <div class="toolbar-info">
                                Showing <strong>${filtered.length}</strong> products
                            </div>
                            <div class="toolbar-controls">
                                <label for="sort-select" style="font-weight: 500; font-size: 0.9rem;">Sort By</label>
                                <select id="sort-select" class="sort-select" onchange="sortShopProducts(this.value)">
                                    <option value="default" ${state.filters.sort === "default" ? "selected" : ""}>Default Featured</option>
                                    <option value="price-low" ${state.filters.sort === "price-low" ? "selected" : ""}>Price: Low to High</option>
                                    <option value="price-high" ${state.filters.sort === "price-high" ? "selected" : ""}>Price: High to Low</option>
                                    <option value="name" ${state.filters.sort === "name" ? "selected" : ""}>Name (A-Z)</option>
                                </select>
                            </div>
                        </div>

                        ${filtered.length === 0 ? `
                            <div class="text-center" style="padding: 60px 0;">
                                <i class="fa-regular fa-folder-open" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 16px;"></i>
                                <h3>No Products Found</h3>
                                <p style="color: var(--text-secondary); margin-top: 8px;">Try clearing filters or adjusting your search term.</p>
                                <button onclick="resetShopFilters()" class="btn btn-primary btn-sm" style="margin-top: 16px;">Reset Search & Filters</button>
                            </div>
                        ` : `
                            <div class="products-grid">
                                ${renderProductCardsGrid(filtered)}
                            </div>
                        `}
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- View: AUTHENTICATION (Login / Register) ---
function renderAuth() {
    return `
        <section class="auth-section">
            <div class="container flex justify-between align-center" style="justify-content: center;">
                <div class="auth-container" id="login-form-wrapper">
                    <div class="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Access your premium profile and order tracking</p>
                    </div>
                    <form id="login-form" class="premium-form" onsubmit="handleLoginSubmit(event)">
                        <div class="form-group">
                            <label for="login-email">Email Address</label>
                            <input type="email" id="login-email" required placeholder="name@domain.com">
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" required placeholder="••••••••">
                        </div>
                        <button type="submit" class="btn btn-primary w-full">Sign In <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
                    </form>
                    
                    <!-- Quick Demo Logins -->
                    <div class="demo-quick-login">
                        <div class="demo-login-divider">
                            <span>Or Quick Demo Login</span>
                        </div>
                        <div class="demo-login-buttons" style="display:flex; flex-direction:column; gap:8px;">
                            <div style="display:flex; gap:10px; justify-content:center;">
                                <button type="button" onclick="triggerDemoLogin('customer')" class="btn btn-secondary btn-sm" style="flex:1;"><i class="fa-solid fa-user"></i> Customer</button>
                                <button type="button" onclick="triggerDemoLogin('owner')" class="btn btn-secondary btn-sm" style="flex:1;"><i class="fa-solid fa-store"></i> Store Owner</button>
                            </div>
                            <button type="button" onclick="triggerDemoLogin('delivery')" class="btn btn-secondary btn-sm" style="width:100%;"><i class="fa-solid fa-motorcycle"></i> Delivery Rider</button>
                        </div>
                    </div>

                    <div class="auth-switcher">
                        Don't have an account? <span class="auth-switch-link" onclick="switchAuthView('register')">Create Account</span>
                    </div>
                </div>

                <div class="auth-container hidden" id="register-form-wrapper">
                    <div class="auth-header">
                        <h2>Create Account</h2>
                        <p>Join AuraMart to experience modern commerce</p>
                    </div>
                    <form id="register-form" class="premium-form" onsubmit="handleRegisterSubmit(event)">
                        <div class="form-group">
                            <label for="register-name">Full Name</label>
                            <input type="text" id="register-name" required placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email Address</label>
                            <input type="email" id="register-email" required placeholder="name@domain.com">
                        </div>
                        <div class="form-group">
                            <label for="register-password">Password</label>
                            <input type="password" id="register-password" minlength="6" required placeholder="Minimum 6 characters">
                        </div>
                        <button type="submit" class="btn btn-primary w-full">Register Account <i class="fa-solid fa-user-plus"></i></button>
                    </form>
                    <div class="auth-switcher">
                        Already have an account? <span class="auth-switch-link" onclick="switchAuthView('login')">Sign In</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- View: CHECKOUT ---
function renderCheckout() {
    if (state.cart.length === 0) {
        return `
            <div class="container text-center" style="padding: 100px 0;">
                <i class="fa-solid fa-basket-shopping" style="font-size: 5rem; color: var(--text-muted); margin-bottom: 24px;"></i>
                <h1 style="font-size: 2.5rem; margin-bottom: 16px;">Your Bag is Empty</h1>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">Please add products to your cart before proceeding to checkout.</p>
                <a href="#/shop" class="btn btn-primary">Browse Shop</a>
            </div>
        `;
    }

    const subtotal = calculateSubtotal();
    const deliveryFee = subtotal > 500 ? 0.00 : 40.00;
    const tax = subtotal * 0.05;
    const discount = subtotal > 1000 ? 100.00 : 0.00;
    const total = subtotal + deliveryFee + tax - discount;

    return `
        <section class="checkout-section">
            <div class="container">
                <h1 style="font-size: 2.5rem; margin-bottom: 32px;">Checkout</h1>
                <div class="checkout-grid">
                    
                    <!-- Billing & Shipping Form -->
                    <div class="checkout-card">
                        <h3>Shipping & Delivery</h3>
                        <form id="checkout-form" class="premium-form" onsubmit="handlePlaceOrder(event)">
                            <!-- Interactive Geolocation Map Pick -->
                            <div class="form-group" style="margin-bottom: 24px;">
                                <label style="font-weight: 700; font-size: 1rem;"><i class="fa-solid fa-map-location-dot" style="color:var(--primary);"></i> Find Your Delivery Address</label>
                                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                                    <input type="text" id="map-search-input" placeholder="Search building, street, area, pincode..." style="flex-grow: 1;">
                                    <button type="button" class="btn btn-secondary btn-sm" onclick="window.searchMapLocation(event)"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
                                </div>
                                <div id="map-search-results" style="display: none; background: var(--bg-surface-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); margin-bottom: 12px; max-height: 150px; overflow-y: auto; padding: 8px; font-size: 0.85rem;">
                                    <!-- Search items dynamically populated -->
                                </div>
                                <div id="checkout-map" style="height: 280px; width: 100%; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); background: var(--bg-surface-secondary); margin-bottom: 12px; z-index: 5;"></div>
                                
                                <div style="display:flex; justify-content:space-between; align-items:center; gap: 8px;">
                                    <button type="button" class="btn btn-secondary btn-sm" onclick="window.useCurrentLocation(event)" style="background: linear-gradient(135deg, var(--primary), var(--accent)); border:none;"><i class="fa-solid fa-location-crosshairs"></i> Use My Current Location</button>
                                    <button type="button" class="btn btn-sm btn-success" onclick="window.confirmSelectedLocation(event)"><i class="fa-solid fa-circle-check"></i> Confirm Location</button>
                                </div>

                                <div id="geocoded-address-display" style="margin-top: 12px; font-size: 0.85rem; color: var(--text-secondary); background: var(--bg-surface-secondary); padding: 12px; border-radius: var(--border-radius-sm); border-left: 3px solid var(--primary); display:none; line-height:1.4;">
                                    <strong style="color:var(--text-primary);">Detected Location:</strong> <span id="detected-address-text">Not selected yet.</span>
                                </div>
                            </div>

                            <!-- Detailed Address Form Fields (Unhide on Confirm Location or manual access) -->
                            <div id="delivery-address-form-wrapper" style="display: none; border-top: 1.5px dashed var(--border-color); padding-top: 20px; transition: all 0.3s ease;">
                                <h4 style="margin-bottom: 16px; font-size: 1.05rem; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-address-card" style="color:var(--primary);"></i> Edit Address Details</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="ship-fname">Full Name</label>
                                        <input type="text" id="ship-fname" placeholder="John Doe">
                                    </div>
                                    <div class="form-group">
                                        <label for="ship-phone">Mobile Number</label>
                                        <input type="tel" id="ship-phone" placeholder="e.g. 9876543210">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="ship-house">House / Flat / Building</label>
                                        <input type="text" id="ship-house" placeholder="e.g. Flat 4B, Silver Heights">
                                    </div>
                                    <div class="form-group">
                                        <label for="ship-area">Area / Street</label>
                                        <input type="text" id="ship-area" placeholder="e.g. Luxury Avenue, Sector 5">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="ship-landmark">Landmark (optional)</label>
                                        <input type="text" id="ship-landmark" placeholder="e.g. Opposite Central Park">
                                    </div>
                                    <div class="form-group">
                                        <label for="ship-city">City</label>
                                        <input type="text" id="ship-city" placeholder="e.g. Mumbai">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="ship-state">State</label>
                                        <input type="text" id="ship-state" placeholder="e.g. Maharashtra">
                                    </div>
                                    <div class="form-group">
                                        <label for="ship-zip">Pincode</label>
                                        <input type="text" id="ship-zip" placeholder="e.g. 400104">
                                    </div>
                                </div>
                                <div class="form-row" style="opacity: 0.8;">
                                    <div class="form-group">
                                        <label for="ship-lat">Latitude</label>
                                        <input type="number" id="ship-lat" step="any" readonly style="background: var(--bg-surface-secondary); cursor: not-allowed;">
                                    </div>
                                    <div class="form-group">
                                        <label for="ship-lng">Longitude</label>
                                        <input type="number" id="ship-lng" step="any" readonly style="background: var(--bg-surface-secondary); cursor: not-allowed;">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="ship-email">Email Address</label>
                                    <input type="email" id="ship-email" placeholder="johndoe@domain.com" value="${state.user ? state.user.email : ""}">
                                </div>
                                <div class="form-group">
                                    <label for="ship-instructions">Delivery Instructions (optional)</label>
                                    <input type="text" id="ship-instructions" placeholder="e.g. Leave at the door, call before delivery">
                                </div>
                            </div>
                            
                            <h3 style="margin-top: 32px;">Payment Details</h3>
                            
                            <div class="form-group">
                                <label>Select Payment Gateway</label>
                                <div class="payment-method-selector" style="display: flex; gap: 12px; margin-bottom: 8px;">
                                    <label class="payment-method-option" style="flex: 1; border: 1px solid var(--border-color); padding: 12px; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; background: var(--bg-surface-secondary);">
                                        <input type="radio" name="pay-method" value="Credit Card" checked style="margin: 0;" onchange="togglePaymentInputs('card')">
                                        <span><i class="fa-solid fa-credit-card"></i> Card</span>
                                    </label>
                                    <label class="payment-method-option" style="flex: 1; border: 1px solid var(--border-color); padding: 12px; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; background: var(--bg-surface-secondary);">
                                        <input type="radio" name="pay-method" value="Cash on Delivery" style="margin: 0;" onchange="togglePaymentInputs('cod')">
                                        <span><i class="fa-solid fa-hand-holding-dollar"></i> COD</span>
                                    </label>
                                    <label class="payment-method-option" style="flex: 1; border: 1px solid var(--border-color); padding: 12px; border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; background: var(--bg-surface-secondary);">
                                        <input type="radio" name="pay-method" value="Google Pay" style="margin: 0;" onchange="togglePaymentInputs('gpay')">
                                        <span><i class="fa-brands fa-google"></i> Pay</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Credit Card fields -->
                            <div id="credit-card-fields" class="premium-form" style="gap: 20px;">
                                <div class="form-group">
                                    <label for="pay-card">Card Number</label>
                                    <div style="position: relative;">
                                        <input type="text" id="pay-card" required placeholder="4000 1234 5678 9010" maxlength="19">
                                        <i class="fa-solid fa-credit-card" style="position: absolute; right: 18px; top: 16px; color: var(--text-muted);"></i>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="pay-exp">Expiry Date</label>
                                        <input type="text" id="pay-exp" required placeholder="MM/YY" maxlength="5">
                                    </div>
                                    <div class="form-group">
                                        <label for="pay-cvc">CVC Code</label>
                                        <input type="password" id="pay-cvc" required placeholder="•••" maxlength="4">
                                    </div>
                                </div>
                            </div>

                            <!-- Cash on Delivery fields -->
                            <div id="cod-fields" class="hidden text-center" style="padding: 24px; background: var(--bg-surface-secondary); border-radius: var(--border-radius-md); border: 1px dashed var(--warning); display: flex; flex-direction: column; align-items: center; gap: 12px;">
                                <i class="fa-solid fa-hand-holding-dollar" style="font-size: 2.5rem; color: var(--warning);"></i>
                                <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">Cash on Delivery (COD)</div>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px; line-height: 1.4;">Pay with cash or scan the rider's QR code when the package arrives at your doorstep.</p>
                            </div>

                            <!-- Google Pay field (Real UPI QR Code) -->
                            <div id="gpay-fields" class="hidden text-center" style="padding: 24px; background: var(--bg-surface-secondary); border-radius: var(--border-radius-md); border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; gap: 12px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style="height: 20px;">
                                    <span style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">Real UPI Scan & Pay</span>
                                </div>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px; line-height: 1.4;">Scan this dynamic QR Code with your Google Pay or PhonePe mobile app to pay instantly.</p>
                                <div style="background: white; padding: 12px; border-radius: 12px; box-shadow: var(--shadow-sm); display: inline-block;">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=0f172a&data=upi://pay?pa=auramart@okaxis%26pn=AuraMart%26am=${total.toFixed(2)}%26cu=INR%26tn=AuraMart%2520Order" style="display: block; width: 180px; height: 180px;">
                                </div>
                                <div style="font-family: monospace; font-size: 0.8rem; background: var(--bg-surface-tertiary); padding: 6px 12px; border-radius: 4px; border: 1px solid var(--border-color); color: var(--text-secondary);">
                                    VPA: auramart@okaxis | Amount: ₹${total.toFixed(2)}
                                </div>
                                <p style="font-size: 0.8rem; color: var(--warning); font-weight: 600; display: flex; align-items: center; gap: 6px; margin: 0;">
                                    <i class="fa-solid fa-circle-info"></i> After paying on your phone, click "Confirm Payment" to place the order!
                                </p>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-full" id="confirm-payment-btn" style="margin-top: 24px;">
                                Confirm & Place Order (₹${total.toFixed(2)})
                            </button>
                        </form>
                    </div>

                    <!-- Side Order Summary -->
                    <div class="order-summary-card">
                        <h3 class="order-summary-title">Order Details</h3>
                        <div class="order-summary-list">
                            ${state.cart.map(item => `
                                <div class="summary-item">
                                    <span class="summary-item-name">${item.name} <strong style="color: var(--primary);">x${item.quantity}</strong></span>
                                    <span class="summary-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            `).join("")}
                        </div>

                        <div class="order-total-section">
                            <div class="summary-item" style="margin-bottom: 12px;">
                                <span>Cart Subtotal</span>
                                <span>₹${subtotal.toFixed(2)}</span>
                            </div>
                            <div class="summary-item" style="margin-bottom: 12px;">
                                <span>Delivery Fee</span>
                                <span>₹${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div class="summary-item" style="margin-bottom: 12px;">
                                <span>Tax (5% GST)</span>
                                <span>₹${tax.toFixed(2)}</span>
                            </div>
                            <div class="summary-item" style="margin-bottom: 12px;">
                                <span>Discount</span>
                                <span style="color: var(--success); font-weight: 600;">-₹${discount.toFixed(2)}</span>
                            </div>
                            <hr class="dropdown-divider" style="margin: 16px 0;">
                            <div class="summary-item" style="font-size: 1.25rem; font-weight: 800;">
                                <span>Grand Total</span>
                                <span style="color: var(--primary);">₹${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `;
}

// --- View: CUSTOMER LIVE ORDER TRACKER ---
window.selectTrackingOrder = async function (orderId) {
    state.trackingOrderId = orderId;
    if (state.activeRoute === "#/tracker") {
        const matchedView = await renderTracker();
        const appContent = document.getElementById("app-content");
        if (appContent) {
            appContent.innerHTML = matchedView;
        }
    }
};

async function renderTracker() {
    if (!state.user) {
        return `
            <div class="container text-center" style="padding: 100px 0;">
                <i class="fa-solid fa-user-lock" style="font-size: 5rem; color: var(--warning); margin-bottom: 24px;"></i>
                <h1 style="font-size: 2.25rem; margin-bottom: 16px;">Authentication Required</h1>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">Please log in to track your active orders and deliveries.</p>
                <a href="#/auth" class="btn btn-primary">Sign In</a>
            </div>
        `;
    }

    // --- Load orders ---
    let customerOrders = [];

    // LocalStorage baseline
    const savedOrdersRaw = localStorage.getItem("orders");
    if (savedOrdersRaw) {
        try {
            customerOrders = JSON.parse(savedOrdersRaw);
        } catch (e) {
            customerOrders = [];
        }
    }

    // Try API
    if (!state.isOffline && state.token) {
        try {
            const res = await apiCall("/api/orders", "GET", null, true);
            if (res.ok && res.data && res.data.orders) {
                customerOrders = res.data.orders;
                state.orders = customerOrders;
                localStorage.setItem("orders", JSON.stringify(customerOrders));
            }
        } catch (e) {
            console.warn("Orders API failed, using localStorage fallback.");
        }
    }

    // User-specific filtering
    customerOrders = customerOrders.filter(o => {
        if (!state.user) return false;
        const custId = o.customer?._id || o.customer;
        return custId && custId.toString() === state.user._id.toString();
    });

    const activeOrder = (state.trackingOrderId ? customerOrders.find(o => o._id === state.trackingOrderId) : null)
        || customerOrders.find(o => o.status !== "delivered")
        || customerOrders[0];

    state.activeOrder = activeOrder;

    let columnsHTML = "";

    const getProductImage = (productId) => {
        const prod = state.products.find(p => p._id === productId);
        return prod ? prod.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200';
    };

    if (!activeOrder) {
        columnsHTML = `
            <div class="container text-center" style="padding: 100px 0;">
                <i class="fa-solid fa-map-location-dot" style="font-size: 5.5rem; color: var(--text-muted); margin-bottom: 24px;"></i>
                <h1 style="font-size: 2.25rem; margin-bottom: 16px;">No Active Deliveries</h1>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">Shop fresh groceries at Instamart now to track your 10-minute delivery run.</p>
                <a href="#/shop" class="btn btn-primary">Go to Shop</a>
            </div>
        `;
    } else {
        setTimeout(startActiveOrderTimer, 600);

        const states = ["placed", "accepted", "prepared", "dispatched", "delivered"];
        const activeIndex = states.indexOf(activeOrder.status);

        const steps = [
            { key: "placed", title: "Placed", desc: "Received", icon: "fa-solid fa-receipt" },
            { key: "accepted", title: "Accepted", desc: "Preparing", icon: "fa-solid fa-circle-check" },
            { key: "prepared", title: "Packed", desc: "Rider ready", icon: "fa-solid fa-box-open" },
            { key: "dispatched", title: "On Way", desc: "Out", icon: "fa-solid fa-motorcycle" },
            { key: "delivered", title: "Arrived", desc: "Delivered", icon: "fa-solid fa-house-chimney-user" }
        ];

        columnsHTML = `
            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: start;">
                <!-- Left Column: Live Progress & Map -->
                <div>
                    <!-- Active Order Header -->
                    <div class="admin-card" style="padding: 24px; margin-bottom: 24px; border-color: var(--primary); background: linear-gradient(135deg, rgba(99,102,241,0.02) 0%, rgba(6,182,212,0.02) 100%);">
                        <div class="flex justify-between align-center" style="margin-bottom: 12px; gap: 8px;">
                            <span class="stock-tag" style="background: var(--primary-glow); color: var(--primary); font-weight: 700; font-family: monospace;">TRACKING #${activeOrder._id.slice(-6).toUpperCase()}</span>
                            <span class="stock-tag" style="background: var(--success-glow); color: var(--success); text-transform: uppercase;">${activeOrder.status}</span>
                        </div>
                        
                        <div id="countdown-clock" style="font-size: 3.5rem; font-family: var(--font-heading); font-weight: 900; line-height: 1.1; color: var(--text-primary); margin-bottom: 8px;">
                            10:00
                        </div>
                        <p id="countdown-subtext" style="color: var(--text-secondary); font-size: 0.95rem; margin: 0;">Connecting...</p>
                    </div>

                    <!-- Map -->
                    <div class="admin-card" style="padding: 20px; margin-bottom: 24px; overflow: hidden; position: relative;">
                        <h3 style="margin-bottom: 12px; font-size: 1.1rem;"><i class="fa-solid fa-map-location-dot" style="color: var(--primary);"></i> Live Delivery Tracking Map</h3>
                        <div id="delivery-map" style="height: 280px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); background: var(--bg-surface-secondary); z-index: 5;"></div>
                    </div>

                    <!-- Steps Timeline -->
                    <div class="admin-card" style="padding: 24px; margin-bottom: 24px;">
                        <h3 style="margin-bottom: 24px; font-size: 1.1rem;"><i class="fa-solid fa-route" style="color: var(--primary);"></i> Progress Track</h3>
                        <div class="delivery-progress-track" style="display: flex; justify-content: space-between; position: relative; padding: 10px 0;">
                            <!-- Connection lines behind -->
                            <div style="position: absolute; top: 32px; left: 4%; width: 92%; height: 4px; background: var(--border-color); z-index: 1;"></div>
                            <div id="progress-line-fill" style="position: absolute; top: 32px; left: 4%; width: ${activeIndex * 23}%; height: 4px; background: linear-gradient(90deg, var(--primary), var(--success)); z-index: 2; transition: width 0.5s ease;"></div>

                            ${steps.map((s, idx) => {
            const passed = idx <= activeIndex;
            const isCurrent = idx === activeIndex;
            return `
                                    <div style="display: flex; flex-direction: column; align-items: center; width: 18%; position: relative; z-index: 3; text-align: center;">
                                        <div class="progress-node" style="width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${passed ? 'var(--primary)' : 'var(--bg-surface-secondary)'}; border: 2px solid white; color: ${passed ? 'var(--text-on-primary)' : 'var(--text-muted)'}; margin-bottom: 8px; font-size: 0.95rem; transition: all 0.3s ease; ${isCurrent ? 'animation: pulseGlow 1.5s infinite;' : ''}">
                                            <i class="${s.icon}"></i>
                                        </div>
                                        <h4 style="font-size: 0.8rem; margin-bottom: 2px; color: ${passed ? 'var(--text-primary)' : 'var(--text-muted)'};">${s.title}</h4>
                                    </div>
                                `;
        }).join("")}
                        </div>
                    </div>

                    <!-- Delivery Handling -->
                    <div class="admin-card" style="padding: 24px;">
                        <h3 style="margin-bottom:16px; font-size: 1.1rem;"><i class="fa-solid fa-store"></i> Store Delivery Partner</h3>
                        <div class="flex align-center" style="gap:16px;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 700;">
                                A
                            </div>
                            <div style="flex-grow:1;">
                                <h4 style="font-size:1.05rem; margin-bottom: 4px;">Store Administrator</h4>
                                <div style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-solid fa-circle-check" style="color:var(--success);"></i> Delivering directly to you</div>
                                <a href="tel:+919876543210" style="color: var(--primary); font-size:0.9rem; font-weight:600; display:inline-block; margin-top:4px;"><i class="fa-solid fa-phone"></i> Call Store Owner</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Selected Order Details & Full History -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <!-- Selected Order Summary -->
                    <div class="admin-card" style="padding: 24px;">
                        <h3 style="margin-bottom: 16px; font-size: 1.1rem;"><i class="fa-solid fa-bag-shopping"></i> Selected Order Summary</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                            ${activeOrder.items.map(item => {
            const imgUrl = getProductImage(item.product);
            return `
                                    <div class="flex justify-between align-center" style="font-size: 0.95rem; border-bottom: 1px solid var(--border-color-light); padding-bottom: 8px; gap: 8px;">
                                        <div class="flex align-center" style="gap: 12px;">
                                            <img src="${imgUrl}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: var(--border-radius-sm); object-fit: cover; border: 1px solid var(--border-color);">
                                            <div>
                                                <div style="font-weight: 600;">${item.name}</div>
                                                <div style="font-size: 0.8rem; color: var(--text-secondary);">₹${(item.price || 0).toFixed(2)} x ${item.quantity}</div>
                                            </div>
                                        </div>
                                        <span style="font-weight: 700;">₹${(item.itemTotal || 0).toFixed(2)}</span>
                                    </div>
                                `;
        }).join("")}
                        </div>

                        <!-- Financials -->
                        <div style="font-size: 0.9rem; display: flex; flex-direction: column; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
                            <div class="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹${(activeOrder.subtotal || 0).toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Delivery Fee:</span>
                                <span>₹${(activeOrder.deliveryFee || 0).toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>GST (5%):</span>
                                <span>₹${(activeOrder.tax || 0).toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Discount:</span>
                                <span style="color: var(--success); font-weight: 600;">-₹${(activeOrder.discount || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="flex justify-between font-bold" style="font-size: 1.15rem; margin-bottom: 16px;">
                            <span>Grand Total Paid:</span>
                            <span style="color: var(--primary);">₹${activeOrder.totalAmount.toFixed(2)}</span>
                        </div>

                        <!-- Extra Delivery Specs -->
                        <div style="background: var(--bg-surface-secondary); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.85rem; display: flex; flex-direction: column; gap: 6px;">
                            <div><strong>Payment Mode:</strong> ${activeOrder.paymentMethod || 'Credit Card'}</div>
                            <div><strong>Delivery Address:</strong> ${activeOrder.shippingAddress}</div>
                            ${activeOrder.customerPhone ? `<div><strong>Phone:</strong> ${activeOrder.customerPhone}</div>` : ''}
                            ${activeOrder.deliveryInstructions ? `<div style="color: var(--warning);"><i class="fa-solid fa-circle-info"></i> <strong>Instructions:</strong> ${activeOrder.deliveryInstructions}</div>` : ''}
                        </div>

                        ${activeOrder.status === 'delivered' && activeOrder.deliveryProof ? `
                            <div style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px; text-align: center;">
                                <div style="font-weight: 600; color: var(--success); margin-bottom: 8px;"><i class="fa-solid fa-camera"></i> Delivery Proof Snapshot:</div>
                                <img src="${activeOrder.deliveryProof}" style="width: 100%; max-height: 180px; object-fit: contain; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                            </div>
                        ` : ''}
                    </div>

                    <!-- Order History List -->
                    <div class="admin-card" style="padding: 24px; max-height: 380px; overflow-y: auto;">
                        <h3 style="margin-bottom: 16px; font-size: 1.1rem; position: sticky; top: 0; background: var(--bg-surface); padding-bottom: 8px; border-bottom: 1px solid var(--border-color);"><i class="fa-solid fa-history"></i> Your Order History</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${customerOrders.map(o => {
            const isCurrentTracked = o._id === activeOrder._id;
            const oTotalQty = o.items.reduce((acc, it) => acc + it.quantity, 0);
            return `
                                    <div class="order-history-row" onclick="window.selectTrackingOrder('${o._id}')" style="cursor: pointer; padding: 12px 16px; border-radius: var(--border-radius-sm); border: 1px solid ${isCurrentTracked ? 'var(--primary)' : 'var(--border-color)'}; background: ${isCurrentTracked ? 'var(--primary-glow-light)' : 'var(--bg-surface-secondary)'}; transition: all 0.2s ease;">
                                        <div class="flex justify-between" style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
                                            <span>#${o._id.slice(-6).toUpperCase()}</span>
                                            <span>₹${o.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between" style="font-size: 0.75rem; color: var(--text-secondary);">
                                            <span>${new Date(o.createdAt).toLocaleDateString()} ${new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <span style="font-weight: 600; color: ${o.status === 'delivered' ? 'var(--success)' : o.status === 'dispatched' ? 'var(--primary)' : 'var(--warning)'};">${o.status.toUpperCase()}</span>
                                        </div>
                                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                                            ${o.items.length} unique item(s) • ${oTotalQty} unit(s)
                                        </div>
                                    </div>
                                `;
        }).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <section class="checkout-section">
            <div class="container" style="max-width: 1200px;">
                <h1 class="text-center" style="font-size: 2.25rem; margin-bottom: 4px;"><i class="fa-solid fa-bolt" style="color: var(--warning);"></i> AuraMart Live Customer Dashboard</h1>
                <p class="text-center" style="color: var(--text-secondary); margin-bottom: 32px;">Lightning-Speed: track and manage your 10-minute grocery runs.</p>
                ${columnsHTML}
            </div>
        </section>
    `;
}

// ==========================================
// Helper Renders
// ==========================================
function renderProductCardsGrid(productsList) {
    return productsList.map(p => {
        const isOutOfStock = p.stock <= 0;

        // Check if item is already in cart
        const cartItem = state.cart.find(item => item._id === p._id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;

        let cartActionHTML = "";

        if (isOutOfStock) {
            cartActionHTML = `
                <button class="add-to-cart-btn out-of-stock" disabled title="Sold Out">
                    <i class="fa-solid fa-ban"></i>
                </button>
            `;
        } else if (quantityInCart > 0) {
            // Zepto style: show - quantity + pill control
            cartActionHTML = `
                <div class="card-qty-selector">
                    <button class="card-qty-btn decrease" onclick="event.stopPropagation(); adjustCartItemQty('${p._id}', -1)" title="Decrease">-</button>
                    <span class="card-qty-value">${quantityInCart}</span>
                    <button class="card-qty-btn increase" onclick="event.stopPropagation(); adjustCartItemQty('${p._id}', 1)" title="Increase">+</button>
                </div>
            `;
        } else {
            // Normal plus button
            cartActionHTML = `
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); quickAddToCart('${p._id}')" title="Add to Bag">
                    <i class="fa-solid fa-plus"></i>
                </button>
            `;
        }

        return `
            <div class="product-card" onclick="viewProductDetails('${p._id}')">
                ${isOutOfStock ? `<span class="product-card-badge out-of-stock">Sold Out</span>` : ""}
                <div class="product-card-image">
                    <img src="${p.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"}" alt="${p.name}">
                </div>
                <div class="product-card-content">
                    <span class="product-card-category">${p.category}</span>
                    <h3 class="product-card-title">${p.name}</h3>
                    <div class="product-card-footer">
                        <span class="product-card-price">₹${p.price.toFixed(2)}</span>
                        <div class="product-card-action-wrapper" style="height:44px; display:flex; align-items:center;">
                            ${cartActionHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// ==========================================
// Event Handler Methods
// ==========================================

// Category Filter on Home Page
function setHomeCategory(cat) {
    // Re-active styling of tags
    document.querySelectorAll(".category-tag").forEach(btn => {
        btn.classList.remove("active");
        if ((!cat && btn.textContent === "All") || btn.textContent === cat) {
            btn.classList.add("active");
        }
    });

    // Filter
    let filtered = [...state.products];
    if (cat) {
        filtered = filtered.filter(p => p.category.toLowerCase() === cat.toLowerCase());
    }

    document.getElementById("home-products-grid").innerHTML = renderProductCardsGrid(filtered.slice(0, 6));
}

// Shop page filter
window.filterShopCat = function (category) {
    state.filters.category = category;
    handleRouting();
};

window.sortShopProducts = function (sortVal) {
    state.filters.sort = sortVal;
    handleRouting();
};

window.resetShopFilters = function () {
    state.filters.category = "";
    state.filters.search = "";
    state.filters.sort = "default";
    document.getElementById("global-search").value = "";
    handleRouting();
};

function attachViewSpecificListeners() {
    // If routing loads page-specific logic, we call it here.
}

// Auth Swapping Views
window.switchAuthView = function (view) {
    const loginWrap = document.getElementById("login-form-wrapper");
    const regWrap = document.getElementById("register-form-wrapper");

    if (view === "login") {
        loginWrap.classList.remove("hidden");
        regWrap.classList.add("hidden");
    } else {
        loginWrap.classList.add("hidden");
        regWrap.classList.remove("hidden");
    }
};

// ==========================================
// Authentication submission logic
// ==========================================
window.handleLoginSubmit = async function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    showGlobalLoader(true);

    const res = await apiCall("/api/auth/login", "POST", { email, password });

    showGlobalLoader(false);

    if (res.ok && res.data && res.data.success) {
        state.token = res.data.token;
        state.user = res.data.user;

        localStorage.setItem("auth_token", state.token);
        localStorage.setItem("auth_user", JSON.stringify(state.user));

        updateNavbarState();
        showToast(`Welcome back, ${state.user.name}!`, "success");

        // Redirect depending on user role
        if (state.user.role === "owner") {
            window.location.hash = "#/owner";
        } else if (state.user.role === "delivery") {
            window.location.hash = "#/rider";
        } else {
            window.location.hash = "#/";
        }
    } else {
        const errorMsg = res.data ? res.data.message : "Connection offline. Attempting local session login.";

        // If server failed (503/offline) check for cached local accounts
        const validEmails = ["admin@auramart.com", "user@auramart.com", "delivery@auramart.com"];
        if (!res.ok && validEmails.includes(email) && password === "password") {
            let role = "customer";
            let name = "Customer User";
            let roleSuffix = "3";

            if (email === "admin@auramart.com") {
                role = "owner";
                name = "Store Owner";
                roleSuffix = "1";
            } else if (email === "delivery@auramart.com") {
                role = "delivery";
                name = "Delivery Rider";
                roleSuffix = "2";
            }

            const mockUser = {
                _id: "60c72b2f9b1d8a23c400123" + roleSuffix,
                name: name,
                email: email,
                role: role
            };
            // Use role-specific sandbox tokens that backend recognizes
            let sandboxToken = "dev-sandbox-token-customer";
            if (role === "owner") sandboxToken = "dev-sandbox-token-owner";
            else if (role === "delivery") sandboxToken = "dev-sandbox-token-rider";

            state.token = sandboxToken;
            state.user = mockUser;
            localStorage.setItem("auth_token", state.token);
            localStorage.setItem("auth_user", JSON.stringify(state.user));
            updateNavbarState();
            showToast(`Welcome back, ${state.user.name}!`, "success");

            if (state.user.role === "owner") {
                window.location.hash = "#/owner";
            } else if (state.user.role === "delivery") {
                window.location.hash = "#/rider";
            } else {
                window.location.hash = "#/";
            }
        } else {
            showToast(errorMsg || "Invalid credentials", "error");
        }
    }
};

window.triggerDemoLogin = function (role) {
    let email = "user@auramart.com";
    if (role === "owner") {
        email = "admin@auramart.com";
    } else if (role === "delivery") {
        email = "delivery@auramart.com";
    }
    const password = "password";

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    if (emailInput && passwordInput) {
        emailInput.value = email;
        passwordInput.value = password;

        const form = document.getElementById("login-form");
        if (form) {
            const event = new Event("submit", { cancelable: true });
            form.dispatchEvent(event);
        }
    }
};

window.handleRegisterSubmit = async function (e) {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    showGlobalLoader(true);

    const res = await apiCall("/api/auth/register", "POST", { name, email, password });

    showGlobalLoader(false);

    if (res.ok && res.data && res.data.success) {
        showToast("Registration Successful! Please Sign In.", "success");
        switchAuthView("login");
    } else {
        const errorMsg = res.data ? res.data.message : "Backend unavailable. Registration works in live MongoDB database mode.";
        showToast(errorMsg || "Registration failed", "error");
    }
};

window.logoutUser = function () {
    state.token = null;
    state.user = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    updateNavbarState();
    showToast("Successfully signed out.", "info");
    window.location.hash = "#/";
};

function updateNavbarState() {
    const userLabel = document.getElementById("user-label");
    const dropdownActions = document.getElementById("dropdown-actions");
    const dropdownName = document.getElementById("dropdown-user-name");
    const dropdownEmail = document.getElementById("dropdown-user-email");

    const ownerLink = document.getElementById("nav-owner");
    const riderLink = document.getElementById("nav-rider");
    const trackerLink = document.getElementById("nav-tracker");

    // Check if customer has active order (for live tracking tab toggle)
    let hasActiveOrder = false;
    if (state.user && state.user.role === "customer") {
        const customerOrders = state.orders.filter(o =>
            o.status !== "delivered" &&
            (o.customer === state.user._id || (o.customer && o.customer._id && o.customer._id.toString() === state.user._id.toString()))
        );
        hasActiveOrder = customerOrders.length > 0;
    }

    if (state.user) {
        userLabel.textContent = state.user.name.split(" ")[0];
        dropdownName.textContent = state.user.name;
        dropdownEmail.textContent = state.user.email;

        let dashboardLinkHTML = "";
        if (state.user.role === "owner") {
            dashboardLinkHTML = `<a href="#/owner" class="dropdown-item"><i class="fa-solid fa-screwdriver-wrench"></i> Owner Portal</a>`;
        } else if (state.user.role === "delivery") {
            dashboardLinkHTML = `<a href="#/rider" class="dropdown-item"><i class="fa-solid fa-motorcycle"></i> Rider Portal</a>`;
        } else if (state.user.role === "customer" && hasActiveOrder) {
            dashboardLinkHTML = `<a href="#/tracker" class="dropdown-item"><i class="fa-solid fa-bolt"></i> Live Tracking</a>`;
        }

        dropdownActions.innerHTML = `
            <a href="#/shop" class="dropdown-item"><i class="fa-solid fa-store"></i> Shop Catalog</a>
            ${dashboardLinkHTML}
            <hr class="dropdown-divider">
            <button onclick="logoutUser()" class="dropdown-item dropdown-item-danger w-full text-left" style="text-align:left; cursor:pointer;">
                <i class="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
        `;

        // Toggle header nav tabs visibility
        if (ownerLink) {
            if (state.user.role === "owner") ownerLink.classList.remove("hidden");
            else ownerLink.classList.add("hidden");
        }
        if (riderLink) {
            if (state.user.role === "delivery") riderLink.classList.remove("hidden");
            else riderLink.classList.add("hidden");
        }
        if (trackerLink) {
            if (state.user.role === "customer" && hasActiveOrder) trackerLink.classList.remove("hidden");
            else trackerLink.classList.add("hidden");
        }
    } else {
        userLabel.textContent = "Login";
        dropdownName.textContent = "Welcome!";
        dropdownEmail.textContent = "Please sign in to your account";

        if (ownerLink) ownerLink.classList.add("hidden");
        if (riderLink) riderLink.classList.add("hidden");
        if (trackerLink) trackerLink.classList.add("hidden");

        dropdownActions.innerHTML = `
            <a href="#/auth" class="dropdown-item"><i class="fa-solid fa-sign-in-alt"></i> Login / Register</a>
        `;
    }
}

// ==========================================
// Product Details Display Modal
// ==========================================
window.viewProductDetails = function (productId) {
    const product = state.products.find(p => p._id === productId);
    if (!product) return;

    state.selectedProduct = product;
    const body = document.getElementById("product-modal-body");
    const isOutOfStock = product.stock <= 0;

    body.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-media">
                <img src="${product.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <span class="product-detail-cat">${product.category}</span>
                <h2 class="product-detail-title">${product.name}</h2>
                <div class="product-detail-price">₹${product.price.toFixed(2)}</div>
                <p class="product-detail-desc">${product.description}</p>
                
                <div class="product-detail-meta">
                    <div class="meta-row">
                        <span class="meta-label">Stock Status</span>
                        <span class="meta-value">
                            <span class="stock-tag ${!isOutOfStock ? "stock-in" : "stock-out"}">
                                ${!isOutOfStock ? `In Stock (${product.stock} units)` : "Sold Out"}
                            </span>
                        </span>
                    </div>
                </div>

                <div class="flex align-center" style="gap: 20px; margin-top: 10px;">
                    ${!isOutOfStock ? `
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="adjustModalQty(-1)">-</button>
                            <input type="text" class="qty-input" id="modal-qty-val" value="1" readonly>
                            <button class="qty-btn" onclick="adjustModalQty(1)">+</button>
                        </div>
                        <button class="btn btn-primary" onclick="addModalProductToCart()" style="flex-grow:1;">
                            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                        </button>
                    ` : `
                        <button class="btn btn-secondary w-full" disabled>Out of Stock</button>
                    `}
                </div>
            </div>
        </div>
    `;

    toggleModal("product-modal", true);
};

window.adjustModalQty = function (diff) {
    const input = document.getElementById("modal-qty-val");
    let val = parseInt(input.value) + diff;
    if (val < 1) val = 1;
    if (state.selectedProduct && val > state.selectedProduct.stock) {
        val = state.selectedProduct.stock;
        showToast(`Only ${state.selectedProduct.stock} items currently in stock.`, "warning");
    }
    input.value = val;
};

window.addModalProductToCart = async function () {
    const qty = parseInt(document.getElementById("modal-qty-val").value);
    if (state.selectedProduct) {
        await addToCart(state.selectedProduct._id, qty);
        toggleModal("product-modal", false);
    }
};

// ==========================================
// Shopping Cart Logic
// ==========================================
window.quickAddToCart = async function (productId) {
    await addToCart(productId, 1);
};

async function addToCart(productId, quantity = 1) {
    await loadProducts(true);
    const product = state.products.find(p => p._id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        showToast("Item is out of stock", "error");
        return;
    }

    const existing = state.cart.find(item => item._id === productId);

    if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
            existing.quantity = product.stock;
            showToast(`Cart adjusted to maximum stock limits (${product.stock} units)`, "warning");
        } else {
            existing.quantity = newQty;
            showToast(`Updated ${product.name} quantity in bag`, "success");
        }
    } else {
        state.cart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
        showToast(`Added ${product.name} to bag`, "success");
    }

    localStorage.setItem("cart", JSON.stringify(state.cart));
    updateCartCount();
    renderCartItems();
    refreshActiveCatalogViews();
}

window.adjustCartItemQty = async function (productId, diff) {
    await loadProducts(true);
    const item = state.cart.find(i => i._id === productId);
    if (!item) return;

    const product = state.products.find(p => p._id === productId);
    const maxStock = product ? product.stock : 99;

    const newQty = item.quantity + diff;
    if (newQty <= 0) {
        removeCartItem(productId);
    } else if (newQty > maxStock) {
        showToast(`Stock limit reached (${maxStock} units)`, "warning");
    } else {
        item.quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(state.cart));
        updateCartCount();
        renderCartItems();
        refreshActiveCatalogViews();
    }
};

window.removeCartItem = function (productId) {
    state.cart = state.cart.filter(item => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
    updateCartCount();
    renderCartItems();
    showToast("Item removed from bag", "info");
    refreshActiveCatalogViews();
};

function clearCart() {
    state.cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    renderCartItems();
    showToast("Cart cleared", "info");
    refreshActiveCatalogViews();
}

function refreshActiveCatalogViews() {
    // 1. Refresh Home Page Grid if visible
    const homeGrid = document.getElementById("home-products-grid");
    if (homeGrid) {
        const activeTag = document.querySelector(".category-tag.active");
        const cat = activeTag && activeTag.textContent !== "All" ? activeTag.textContent : "";
        let filtered = [...state.products];
        if (cat) {
            filtered = filtered.filter(p => p.category.toLowerCase() === cat.toLowerCase());
        }
        homeGrid.innerHTML = renderProductCardsGrid(filtered.slice(0, 6));
    }

    // 2. Refresh Shop Page Grid if visible
    const shopGrid = document.getElementById("shop-products-grid");
    if (shopGrid) {
        let filtered = [...state.products];
        if (state.filters.category) {
            filtered = filtered.filter(p => p.category.toLowerCase() === state.filters.category.toLowerCase());
        }
        if (state.filters.search) {
            const query = state.filters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }
        // Sort
        if (state.filters.sort === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (state.filters.sort === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (state.filters.sort === "name-asc") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (state.filters.sort === "name-desc") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
        shopGrid.innerHTML = renderProductCardsGrid(filtered);
    }
    updateNavbarState();
}

function updateCartCount() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
    document.getElementById("cart-drawer-count").textContent = `(${totalCount})`;
}

function calculateSubtotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCartItems() {
    const container = document.getElementById("cart-items-container");
    const subtotalLabel = document.getElementById("cart-subtotal");

    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-view">
                <i class="fa-solid fa-bag-shopping empty-cart-icon"></i>
                <p>Your shopping bag is currently empty.</p>
                <a href="#/shop" class="btn btn-primary btn-sm close-cart-cta-btn" onclick="toggleCartDrawer()">Start Shopping</a>
            </div>
        `;
        subtotalLabel.textContent = "₹0.00";
        return;
    }

    container.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="qty-selector">
                        <button class="qty-btn" onclick="adjustCartItemQty('${item._id}', -1)">-</button>
                        <span class="qty-input">${item.quantity}</span>
                        <button class="qty-btn" onclick="adjustCartItemQty('${item._id}', 1)">+</button>
                    </div>
                </div>
            </div>
            <span class="remove-cart-item-btn" onclick="removeCartItem('${item._id}')"><i class="fa-regular fa-trash-can"></i></span>
        </div>
    `).join("");

    subtotalLabel.textContent = `₹${calculateSubtotal().toFixed(2)}`;
}

function toggleCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    drawer.classList.toggle("active");
    if (drawer.classList.contains("active")) {
        renderCartItems();
    }
}

// ==========================================
// Checkout confirmation & Gateway Simulation
// ==========================================
window.togglePaymentInputs = function (method) {
    const cardFields = document.getElementById("credit-card-fields");
    const codFields = document.getElementById("cod-fields");
    const gpayFields = document.getElementById("gpay-fields");

    if (method === "card") {
        if (cardFields) cardFields.classList.remove("hidden");
        if (codFields) codFields.classList.add("hidden");
        if (gpayFields) gpayFields.classList.add("hidden");

        document.getElementById("pay-card").required = true;
        document.getElementById("pay-exp").required = true;
        document.getElementById("pay-cvc").required = true;
    } else if (method === "cod") {
        if (cardFields) cardFields.classList.add("hidden");
        if (codFields) codFields.classList.remove("hidden");
        if (gpayFields) gpayFields.classList.add("hidden");

        document.getElementById("pay-card").required = false;
        document.getElementById("pay-exp").required = false;
        document.getElementById("pay-cvc").required = false;
    } else {
        if (cardFields) cardFields.classList.add("hidden");
        if (codFields) codFields.classList.add("hidden");
        if (gpayFields) gpayFields.classList.remove("hidden");

        document.getElementById("pay-card").required = false;
        document.getElementById("pay-exp").required = false;
        document.getElementById("pay-cvc").required = false;
    }
};

window.handlePlaceOrder = function (e) {
    e.preventDefault();

    // --- PRE-FLIGHT: Validate that address form is visible and key fields are filled ---
    const addrWrapper = document.getElementById("delivery-address-form-wrapper");
    const fname = document.getElementById("ship-fname")?.value?.trim() || "";
    const phone = document.getElementById("ship-phone")?.value?.trim() || "";
    const city = document.getElementById("ship-city")?.value?.trim() || "";
    const zip = document.getElementById("ship-zip")?.value?.trim() || "";

    // Auto-show address form if it's still hidden
    if (addrWrapper && addrWrapper.style.display === "none") {
        addrWrapper.style.display = "block";
    }

    if (!fname || !phone || !city || !zip) {
        // Highlight the address form and shake it
        if (addrWrapper) {
            addrWrapper.style.border = "2px solid var(--danger)";
            addrWrapper.style.borderRadius = "var(--border-radius-md)";
            addrWrapper.style.padding = "16px";
            setTimeout(() => {
                addrWrapper.style.border = "";
                addrWrapper.style.padding = "";
            }, 3000);
            addrWrapper.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        showToast("Please fill in your delivery details (Name, Phone, City & Pincode) before placing your order.", "error");
        return; // ← STOP — don't show payment spinner
    }

    const paymentMethod = document.querySelector('input[name="pay-method"]:checked')?.value || "Credit Card";
    const paymentStatus = paymentMethod === "Cash on Delivery" ? "Pending" : "Paid";

    // Trigger animated payment gateway spinner overlay
    const gatewayModal = document.getElementById("gateway-processing-overlay");
    if (gatewayModal) {
        gatewayModal.classList.remove("hidden");
    } else {
        showGlobalLoader(true);
    }

    const steps = paymentMethod === "Cash on Delivery" ? [
        "Verifying delivery contact details...",
        "Validating customer delivery address...",
        "Registering order under Cash on Delivery protocol...",
        "Finalizing transaction details with AuraMart Gateway..."
    ] : [
        "Connecting with secure 3D-Secure payment server...",
        "Validating transaction credentials and verifying funds...",
        "Exchanging encrypted SSL handshake token...",
        "Finalizing transaction details with AuraMart Gateway..."
    ];

    let currentStep = 0;
    const progressLabel = document.getElementById("gateway-progress-label");
    if (progressLabel) progressLabel.textContent = steps[0];

    const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
            if (progressLabel) progressLabel.textContent = steps[currentStep];
        } else {
            clearInterval(interval);

            // Hide Gateway processing overlay
            if (gatewayModal) gatewayModal.classList.add("hidden");
            showGlobalLoader(false);

            // Invoice calculation
            const subtotal = calculateSubtotal();
            const deliveryFee = subtotal > 500 ? 0.00 : 40.00;
            const tax = subtotal * 0.05;
            const discount = subtotal > 1000 ? 100.00 : 0.00;
            const total = subtotal + deliveryFee + tax - discount;
            const orderNum = "AM-" + Math.floor(100000 + Math.random() * 900000);
            const txHash = paymentMethod === "Cash on Delivery" ? "COD-PENDING-SETTLEMENT" : "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

            const invoiceHTML = `
                <div class="container invoice-container" style="max-width: 600px; padding: 40px 0; display: flex; justify-content: center;">
                    <div class="invoice-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 40px; box-shadow: var(--shadow-lg); text-align: left; position: relative; overflow: hidden; width: 100%;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(135deg, var(--success), var(--accent));"></div>
                        
                        <div class="text-center" style="margin-bottom: 30px; text-align: center;">
                            <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--success); margin-bottom: 16px;"></i>
                            <h2 style="font-size: 1.75rem; margin-bottom: 4px;">${paymentMethod === 'Cash on Delivery' ? 'Order Placed Successfully!' : 'Payment Authorized!'}</h2>
                            <p style="color: var(--text-secondary);">${paymentMethod === 'Cash on Delivery' ? 'Your delivery package is on the way.' : 'Thank you for shopping at AuraMart.'}</p>
                        </div>
                        
                        <div class="invoice-meta-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 0.9rem; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                            <div>
                                <strong style="color: var(--text-muted);">Order Number:</strong><br>
                                <span style="font-family: monospace; font-weight: 700; color: var(--primary);">${orderNum}</span>
                            </div>
                            <div>
                                <strong style="color: var(--text-muted);">Gateway:</strong><br>
                                <span>${paymentMethod}</span>
                            </div>
                            <div>
                                <strong style="color: var(--text-muted);">Date & Time:</strong><br>
                                <span>${new Date().toLocaleString()}</span>
                            </div>
                            <div>
                                <strong style="color: var(--text-muted);">Status:</strong><br>
                                <span class="stock-tag ${paymentMethod === 'Cash on Delivery' ? 'stock-out' : 'stock-in'}" style="font-weight: 600; ${paymentMethod === 'Cash on Delivery' ? 'background: rgba(245,158,11,0.1); color: var(--warning);' : ''}">
                                    ${paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid (Success)'}
                                </span>
                            </div>
                        </div>

                        <h4 style="margin-bottom: 12px; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; color: var(--text-muted);">Order Invoice Items</h4>
                        <div class="invoice-items" style="margin-bottom: 24px;">
                            ${state.cart.map(item => `
                                <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 8px;">
                                    <span>${item.name} <strong style="color: var(--primary);">x${item.quantity}</strong></span>
                                    <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            `).join("")}
                        </div>
                        
                        <div style="border-top: 1px solid var(--border-color); padding-top: 16px; font-size: 0.95rem; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Subtotal:</span>
                                <span>₹${subtotal.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Delivery Fee:</span>
                                <span>₹${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Sales Tax (5% GST):</span>
                                <span>₹${tax.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Discount:</span>
                                <span style="color: var(--success); font-weight: 600;">-₹${discount.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">
                                <span>Total:</span>
                                <span style="color: var(--primary);">₹${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style="font-size: 0.75rem; color: var(--text-muted); word-break: break-all; margin-bottom: 30px; background: var(--bg-surface-secondary); padding: 12px; border-radius: var(--border-radius-sm); border: 1px dashed var(--border-color);">
                            <strong>Gateway Receipt Hash:</strong><br>
                            <span style="font-family: monospace;">${txHash}</span>
                        </div>
                        
                        <div class="text-center" style="text-align: center;">
                            <button onclick="window.location.hash = '#/tracker';" class="btn btn-primary w-full" style="background: linear-gradient(135deg, var(--warning), var(--primary)); border:none;">⚡ Track 10-Min Delivery</button>
                        </div>
                    </div>
                </div>
            `;

            // Create database order in background
            const formattedItems = state.cart.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                itemTotal: item.price * item.quantity
            }));
            const fname = document.getElementById("ship-fname")?.value || "";
            const phone = document.getElementById("ship-phone")?.value || "";
            const house = document.getElementById("ship-house")?.value || "";
            const area = document.getElementById("ship-area")?.value || "";
            const landmark = document.getElementById("ship-landmark")?.value || "";
            const city = document.getElementById("ship-city")?.value || "";
            const stateField = document.getElementById("ship-state")?.value || "";
            const zip = document.getElementById("ship-zip")?.value || "";
            const lat = parseFloat(document.getElementById("ship-lat")?.value) || 12.9700;
            const lng = parseFloat(document.getElementById("ship-lng")?.value) || 77.6100;

            const shippingAddress = `${house}, ${area}, ${city}, ${stateField} - ${zip}`;
            const customerPhone = phone;
            const deliveryInstructions = document.getElementById("ship-instructions")?.value || "";

            const customerLatLng = [lat, lng];
            const storeLatLng = [lat + 0.008, lng - 0.008];

            const deliveryAddress = {
                fullName: fname,
                mobile: phone,
                house: house,
                area: area,
                landmark: landmark,
                city: city,
                state: stateField,
                pincode: zip,
                address: shippingAddress,
                latitude: lat,
                longitude: lng
            };

            if (!state.isOffline) {
                apiCall("/api/orders/create", "POST", {
                    items: formattedItems,
                    subtotal: subtotal,
                    deliveryFee: deliveryFee,
                    tax: tax,
                    discount: discount,
                    totalAmount: total,
                    shippingAddress: shippingAddress,
                    customerLatLng: customerLatLng,
                    storeLatLng: storeLatLng,
                    paymentMethod: paymentMethod,
                    paymentStatus: paymentStatus,
                    customerPhone: customerPhone,
                    deliveryInstructions: deliveryInstructions,
                    deliveryAddress: deliveryAddress
                }, true).then(res => {
                    if (res.ok && res.data && res.data.order) {
                        state.orders.push(res.data.order);
                        state.activeOrder = res.data.order;
                        // Save to localStorage so tracker works after page reload
                        localStorage.setItem("orders", JSON.stringify(state.orders));
                        updateNavbarState();
                    }
                });
            } else {
                const hexSuffix = Math.floor(100000 + Math.random() * 900000);
                const mockOrder = {
                    _id: "60c72b2f9b1d8a23c4004" + hexSuffix,
                    customer: state.user ? state.user._id : "60c72b2f9b1d8a23c4001101",
                    items: formattedItems,
                    totalAmount: total,
                    status: "placed",
                    deliveryBoy: null,
                    shippingAddress: shippingAddress,
                    estimatedTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
                    createdAt: new Date().toISOString(),
                    customerLatLng: customerLatLng,
                    storeLatLng: storeLatLng,
                    paymentMethod: paymentMethod,
                    paymentStatus: paymentStatus,
                    customerPhone: customerPhone,
                    deliveryInstructions: deliveryInstructions,
                    deliveryAddress: deliveryAddress
                };
                state.orders.push(mockOrder);
                localStorage.setItem("orders", JSON.stringify(state.orders));
                state.activeOrder = mockOrder;
                updateNavbarState();
            }

            document.getElementById("app-content").innerHTML = invoiceHTML;
            clearCart();
            showToast("Transaction finalized. Order dispatched!", "success");
        }
    }, 1000);
};

// ==========================================
// Admin Inventory Management Functions
// ==========================================
window.openAdminAddModal = function () {
    state.editProduct = null;
    document.getElementById("admin-modal-title").textContent = "Add Premium Product";
    document.getElementById("product-form").reset();
    document.getElementById("form-product-id").value = "";
    toggleModal("admin-product-modal", true);
};

window.openAdminEditModal = function (productId) {
    const product = state.products.find(p => p._id === productId);
    if (!product) return;

    state.editProduct = product;
    document.getElementById("admin-modal-title").textContent = "Edit Product Details";
    document.getElementById("form-product-id").value = product._id;
    document.getElementById("form-name").value = product.name;
    document.getElementById("form-price").value = product.price;
    document.getElementById("form-stock").value = product.stock;
    document.getElementById("form-category").value = product.category;
    document.getElementById("form-image").value = product.image;
    document.getElementById("form-description").value = product.description;

    toggleModal("admin-product-modal", true);
};

window.handleProductFormSubmit = async function (e) {
    e.preventDefault();

    const id = document.getElementById("form-product-id").value;
    const name = document.getElementById("form-name").value;
    const price = parseFloat(document.getElementById("form-price").value);
    const stock = parseInt(document.getElementById("form-stock").value);
    const category = document.getElementById("form-category").value;
    let image = document.getElementById("form-image").value;
    const description = document.getElementById("form-description").value;

    if (!image) {
        // Aesthetic image fallback based on category
        if (category === "Electronics") image = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80";
        else if (category === "Fashion") image = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80";
        else image = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80";
    }

    const payload = { name, price, stock, category, image, description };

    showGlobalLoader(true);

    if (id) {
        // Edit existing product
        if (state.isOffline) {
            // Sandboxed update
            const idx = state.products.findIndex(p => p._id === id);
            if (idx !== -1) {
                state.products[idx] = { ...state.products[idx], ...payload };
            }
            showToast("Product updated successfully", "success");
            toggleModal("admin-product-modal", false);
            handleRouting();
            showGlobalLoader(false);
        } else {
            const res = await apiCall(`/api/products/update/${id}`, "PUT", payload, true);
            showGlobalLoader(false);
            if (res.ok) {
                showToast("Product updated successfully", "success");
                toggleModal("admin-product-modal", false);
                handleRouting();
            } else {
                showToast(res.data.message || "Failed to update product", "error");
            }
        }
    } else {
        // Add new product
        if (state.isOffline) {
            // Sandboxed addition
            const hexSuffix = Math.floor(100000 + Math.random() * 900000);
            const newProduct = {
                _id: "60c72b2f9b1d8a23c4003" + hexSuffix,
                ...payload
            };
            state.products.push(newProduct);
            showToast("Product added successfully", "success");
            toggleModal("admin-product-modal", false);
            handleRouting();
            showGlobalLoader(false);
        } else {
            const res = await apiCall("/api/products/add", "POST", payload, true);
            showGlobalLoader(false);
            if (res.ok) {
                showToast("Product created successfully", "success");
                toggleModal("admin-product-modal", false);
                handleRouting();
            } else {
                showToast(res.data.message || "Failed to add product", "error");
            }
        }
    }
};

window.deleteProductHandler = async function (productId) {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;

    showGlobalLoader(true);

    if (state.isOffline) {
        state.products = state.products.filter(p => p._id !== productId);
        showToast("Product deleted successfully", "success");
        handleRouting();
        showGlobalLoader(false);
    } else {
        const res = await apiCall(`/api/products/delete/${productId}`, "DELETE", null, true);
        showGlobalLoader(false);
        if (res.ok) {
            showToast("Product deleted successfully", "success");
            handleRouting();
        } else {
            showToast(res.data.message || "Failed to delete product", "error");
        }
    }
};

// ==========================================
// Core UI Utilities
// ==========================================
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    } else {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }
}

function showGlobalLoader(show) {
    const loader = document.getElementById("main-loader");
    if (!loader) return;
    if (show) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}

// Custom Premium Toast Notifications
window.showToast = function (message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");

    // Icon selection
    let iconClass = "fa-solid fa-circle-check";
    if (type === "error") iconClass = "fa-solid fa-circle-xmark";
    else if (type === "warning") iconClass = "fa-solid fa-triangle-exclamation";
    else if (type === "info") iconClass = "fa-solid fa-circle-info";

    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="${iconClass} toast-icon"></i>
        <div class="toast-message">${message}</div>
        <span class="toast-close">&times;</span>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector(".toast-close");
    const removeToast = () => {
        toast.classList.add("removing");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    };

    closeBtn.addEventListener("click", removeToast);

    // Auto-remove toast after 4s
    setTimeout(removeToast, 4000);
};

// ==========================================
// Owner and Rider Dashboard Event Handlers
// ==========================================
window.setOwnerTab = function (tab) {
    localStorage.setItem("owner_active_tab", tab);
    handleRouting();
};

window.changeOrderStatusHandler = async function (orderId, status) {
    showGlobalLoader(true);

    if (state.isOffline) {
        const order = state.orders.find(o => o._id === orderId);
        if (order) {
            order.status = status;
            showToast(`Order status updated to ${status}`, "success");
        }
        showGlobalLoader(false);
        handleRouting();
    } else {
        const res = await apiCall(`/api/orders/${orderId}/status`, "PUT", { status }, true);
        showGlobalLoader(false);
        if (res.ok) {
            showToast(`Order status updated to ${status}`, "success");
            handleRouting();
        } else {
            showToast(res.data.message || "Failed to update order status", "error");
        }
    }
};

window.assignRiderHandler = async function (orderId) {
    showGlobalLoader(true);

    if (state.isOffline) {
        const order = state.orders.find(o => o._id === orderId);
        if (order) {
            order.deliveryBoy = {
                _id: state.user._id,
                name: state.user.name,
                email: state.user.email
            };
            order.status = "dispatched";
            showToast("Delivery run accepted! Out for delivery.", "success");
        }
        showGlobalLoader(false);
        handleRouting();
    } else {
        const res = await apiCall(`/api/orders/${orderId}/assign`, "PUT", null, true);
        showGlobalLoader(false);
        if (res.ok) {
            showToast("Delivery run accepted! Out for delivery.", "success");
            handleRouting();
        } else {
            showToast(res.data.message || "Failed to accept delivery", "error");
        }
    }
};

// ==========================================
// Zepto-Style 10-Minute Countdown Timer & Map Tracking
// ==========================================
let activeTimerInterval = null;
let activeTrackerPollInterval = null;
let trackingGoogleMap = null;
let trackingStoreMarker = null;
let trackingHomeMarker = null;
let trackingRiderMarker = null;
let trackingRoutePolyline = null;

function getCoordinateAlongPath(coords, progress) {
    if (coords.length === 0) return [0, 0];
    if (progress <= 0) return coords[0];
    if (progress >= 1) return coords[coords.length - 1];

    const totalSegments = coords.length - 1;
    const segmentIndex = Math.floor(progress * totalSegments);
    const segmentProgress = (progress * totalSegments) - segmentIndex;

    const start = coords[segmentIndex];
    const end = coords[segmentIndex + 1];

    const lat = start[0] + (end[0] - start[0]) * segmentProgress;
    const lng = start[1] + (end[1] - start[1]) * segmentProgress;

    return [lat, lng];
}

window.initTrackingMap = async function () {
    const mapEl = document.getElementById("delivery-map");
    if (!mapEl) return;

    if (trackingGoogleMap) {
        try {
            trackingGoogleMap = null;
            trackingRiderMarker = null;
        } catch (e) { }
    }

    const storeLatLng = (state.activeOrder && state.activeOrder.storeLatLng && state.activeOrder.storeLatLng.length === 2)
        ? state.activeOrder.storeLatLng
        : [12.9800, 77.5900];
    const homeLatLng = (state.activeOrder && state.activeOrder.customerLatLng && state.activeOrder.customerLatLng.length === 2)
        ? state.activeOrder.customerLatLng
        : [12.9700, 77.6100];

    try {
        await ensureGoogleMapsLoaded();

        const centerLat = (storeLatLng[0] + homeLatLng[0]) / 2;
        const centerLng = (storeLatLng[1] + homeLatLng[1]) / 2;

        const mapOptions = {
            center: { lat: centerLat, lng: centerLng },
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };

        trackingGoogleMap = new google.maps.Map(mapEl, mapOptions);

        trackingStoreMarker = new google.maps.Marker({
            position: { lat: storeLatLng[0], lng: storeLatLng[1] },
            map: trackingGoogleMap,
            title: "AuraMart Hub",
            icon: {
                url: 'data:image/svg+xml;utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="18" fill="%236366F1" stroke="white" stroke-width="2.5"/><path d="M10 24h16V14H10v10zm2-8h12v6H12v-6z" fill="white"/></svg>`),
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 18)
            }
        });

        trackingHomeMarker = new google.maps.Marker({
            position: { lat: homeLatLng[0], lng: homeLatLng[1] },
            map: trackingGoogleMap,
            title: "Delivery Destination",
            icon: {
                url: 'data:image/svg+xml;utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="18" fill="%2310B981" stroke="white" stroke-width="2.5"/><path d="M18 10l-8 7h3v7h10v-7h3l-8-7z" fill="white"/></svg>`),
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 18)
            }
        });

        // Coordinates curve matching
        const routeCoordinates = [];
        const segmentsCount = 5;
        for (let i = 0; i <= segmentsCount; i++) {
            const ratio = i / segmentsCount;
            const lat = storeLatLng[0] + (homeLatLng[0] - storeLatLng[0]) * ratio;
            const lng = storeLatLng[1] + (homeLatLng[1] - storeLatLng[1]) * ratio;

            if (i > 0 && i < segmentsCount) {
                const offsetLat = lat + (Math.sin(ratio * Math.PI) * 0.001);
                const offsetLng = lng + (Math.cos(ratio * Math.PI) * 0.001);
                routeCoordinates.push({ lat: offsetLat, lng: offsetLng });
            } else {
                routeCoordinates.push({ lat: lat, lng: lng });
            }
        }

        trackingRoutePolyline = new google.maps.Polyline({
            path: routeCoordinates,
            geodesic: true,
            strokeColor: '#6366F1',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            map: trackingGoogleMap
        });

        let initialPos = { lat: storeLatLng[0], lng: storeLatLng[1] };
        const status = state.activeOrder ? state.activeOrder.status : 'placed';

        if (status === 'delivered') {
            initialPos = { lat: homeLatLng[0], lng: homeLatLng[1] };
        } else if (status === 'dispatched') {
            const totalDuration = 600000;
            const estimatedTime = new Date(state.activeOrder.estimatedTime).getTime();
            const now = Date.now();
            const diff = estimatedTime - now;
            let progress = 1 - (diff / totalDuration);
            progress = Math.min(Math.max(progress, 0), 1);
            const flatRoute = routeCoordinates.map(c => [c.lat, c.lng]);
            const coords = getCoordinateAlongPath(flatRoute, progress);
            initialPos = { lat: coords[0], lng: coords[1] };
        }

        trackingRiderMarker = new google.maps.Marker({
            position: initialPos,
            map: trackingGoogleMap,
            title: status === 'dispatched' ? "Store Owner Out for Delivery!" : (status === 'delivered' ? "Delivery Arrived!" : "Store Preparing Order"),
            icon: {
                url: 'data:image/svg+xml;utf-8,' + encodeURIComponent(`<svg class="rider-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23F59E0B" stroke="white" stroke-width="2.5"/><path d="M12 28h16v-8H12v8z" fill="black"/></svg>`),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });

    } catch (err) {
        console.error("Google Maps tracking initialization failed:", err);
        // Fallback: show OSM iframe centred between store and home
        if (mapEl) {
            const storeLatLng = (state.activeOrder && state.activeOrder.storeLatLng && state.activeOrder.storeLatLng.length === 2)
                ? state.activeOrder.storeLatLng : [12.9800, 77.5900];
            const homeLatLng = (state.activeOrder && state.activeOrder.customerLatLng && state.activeOrder.customerLatLng.length === 2)
                ? state.activeOrder.customerLatLng : [12.9700, 77.6100];
            const cLat = ((storeLatLng[0] + homeLatLng[0]) / 2).toFixed(5);
            const cLng = ((storeLatLng[1] + homeLatLng[1]) / 2).toFixed(5);
            const latSpan = 0.012, lngSpan = 0.018;
            mapEl.innerHTML = `
                <div style="position:relative;height:100%;width:100%;">
                    <iframe
                        width="100%" height="100%" frameborder="0" scrolling="no"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${(parseFloat(cLng) - lngSpan)},${(parseFloat(cLat) - latSpan)},${(parseFloat(cLng) + lngSpan)},${(parseFloat(cLat) + latSpan)}&layer=mapnik&marker=${homeLatLng[0]},${homeLatLng[1]}"
                        style="border-radius:var(--border-radius-md);border:none;display:block;">
                    </iframe>
                    <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.65);color:#fff;font-size:0.72rem;padding:4px 10px;border-radius:20px;pointer-events:none;">
                        📍 Map preview — add Google Maps API Key for live tracking
                    </div>
                </div>`;
            mapEl.style.padding = '0';
        }
    }
};

window.startActiveOrderTimer = function () {
    if (activeTimerInterval) {
        clearInterval(activeTimerInterval);
    }
    if (activeTrackerPollInterval) {
        clearInterval(activeTrackerPollInterval);
    }

    const clockEl = document.getElementById("countdown-clock");
    const subtextEl = document.getElementById("countdown-subtext");

    if (!clockEl || !state.activeOrder) return;

    // Initialize Map on start
    setTimeout(() => {
        window.initTrackingMap();
    }, 100);

    const estimatedTime = new Date(state.activeOrder.estimatedTime).getTime();

    const updateTimer = () => {
        const now = Date.now();
        const diff = estimatedTime - now;

        // Custom subtext depending on status (Zepto style)
        if (subtextEl) {
            switch (state.activeOrder.status) {
                case "placed":
                    subtextEl.textContent = "Order Placed! Packing team is preparing fresh items.";
                    break;
                case "accepted":
                    subtextEl.textContent = "Owner accepted! Assembling items in container box.";
                    break;
                case "prepared":
                    subtextEl.textContent = "Packed and ready! Rider is receiving the bag.";
                    break;
                case "dispatched":
                    subtextEl.textContent = `${state.activeOrder.deliveryBoy ? typeof state.activeOrder.deliveryBoy === 'object' ? state.activeOrder.deliveryBoy.name : 'Rider' : 'Rider'} is driving at lightning speed to you!`;
                    break;
                case "delivered":
                    subtextEl.textContent = "Rider has arrived at your doorway. Enjoy your fresh groceries!";
                    break;
                default:
                    subtextEl.textContent = "Lightning Delivery Active.";
            }
        }

        // Live Rider Position and Map Centering Update
        if (state.activeOrder.status === "dispatched" && trackingRiderMarker && trackingGoogleMap) {
            const totalDuration = 600000;
            const progress = Math.min(Math.max(1 - (diff / totalDuration), 0), 1);
            const routeCoords = [
                [12.9800, 77.5900],
                [12.9785, 77.5925],
                [12.9760, 77.5960],
                [12.9735, 77.6010],
                [12.9715, 77.6060],
                [12.9700, 77.6100]
            ];
            const currentPos = getCoordinateAlongPath(routeCoords, progress);
            const newGpos = new google.maps.LatLng(currentPos[0], currentPos[1]);
            trackingRiderMarker.setPosition(newGpos);
            trackingGoogleMap.panTo(newGpos);
        }

        if (diff <= 0 || state.activeOrder.status === "delivered") {
            clearInterval(activeTimerInterval);
            clockEl.textContent = "Arrived!";
            clockEl.style.color = "var(--success)";
            if (subtextEl) subtextEl.textContent = "Delivered at your doorstep. Please collect your items!";

            if (trackingRiderMarker) {
                const homeGpos = new google.maps.LatLng(12.9700, 77.6100);
                trackingRiderMarker.setPosition(homeGpos);
                if (trackingGoogleMap) trackingGoogleMap.panTo(homeGpos);
            }

            // Auto update nav link
            const trackerNav = document.getElementById("nav-tracker");
            if (trackerNav && state.activeOrder.status === "delivered") {
                trackerNav.classList.add("hidden");
            }
            return;
        }

        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (n) => n < 10 ? "0" + n : n;
        clockEl.textContent = `${pad(minutes)}:${pad(seconds)}`;
        clockEl.style.color = diff < 2 * 60 * 1000 ? "var(--danger)" : "var(--text-primary)"; // Turn red under 2 minutes
    };

    updateTimer(); // Initial call
    activeTimerInterval = setInterval(updateTimer, 1000);

    // Poll the backend for real-time status and rider updates
    const pollOrderUpdate = async () => {
        if (!state.activeOrder) return;

        let updatedOrder = null;
        if (state.isOffline) {
            try {
                const saved = JSON.parse(localStorage.getItem("orders") || "[]");
                updatedOrder = saved.find(o => o._id === state.activeOrder._id);
            } catch (e) {
                console.error("Local storage order parse issue:", e);
            }
        } else {
            try {
                const res = await apiCall("/api/orders", "GET", null, true);
                if (res.ok && res.data && res.data.orders) {
                    state.orders = res.data.orders;
                    localStorage.setItem("orders", JSON.stringify(state.orders));
                    updatedOrder = res.data.orders.find(o => o._id === state.activeOrder._id);
                }
            } catch (err) {
                console.warn("Error polling live orders status updates from server:", err);
            }
        }

        if (updatedOrder) {
            const oldStatus = state.activeOrder.status;
            const oldRiderId = state.activeOrder.deliveryBoy
                ? (typeof state.activeOrder.deliveryBoy === 'object' ? state.activeOrder.deliveryBoy._id : state.activeOrder.deliveryBoy)
                : null;

            const newRiderId = updatedOrder.deliveryBoy
                ? (typeof updatedOrder.deliveryBoy === 'object' ? updatedOrder.deliveryBoy._id : updatedOrder.deliveryBoy)
                : null;

            if (oldStatus !== updatedOrder.status || oldRiderId !== newRiderId) {
                console.log(`Order updated: status (${oldStatus} -> ${updatedOrder.status}), rider (${oldRiderId} -> ${newRiderId})`);
                state.activeOrder = updatedOrder;

                // Re-render tracker DOM components if we are still on the tracker page
                if (state.activeRoute === "#/tracker") {
                    const matchedView = await renderTracker();
                    const appContent = document.getElementById("app-content");
                    if (appContent) {
                        appContent.innerHTML = matchedView;
                    }
                }
            }
        }
    };

    activeTrackerPollInterval = setInterval(pollOrderUpdate, 4000);
};

// ==========================================
// Checkout Location Map & Geocoding Utilities
// ==========================================
let googleMapsLoadingPromise = null;
function ensureGoogleMapsLoaded() {
    if (window.google && window.google.maps) {
        return Promise.resolve();
    }
    if (googleMapsLoadingPromise) {
        return googleMapsLoadingPromise;
    }
    googleMapsLoadingPromise = new Promise(async (resolve, reject) => {
        try {
            const res = await fetch("/api/config/google-maps-key");
            const data = await res.json();
            const key = data.apiKey;

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                resolve();
            };
            script.onerror = (e) => {
                googleMapsLoadingPromise = null;
                reject(new Error("Failed to load Google Maps script"));
            };
            document.head.appendChild(script);
        } catch (err) {
            googleMapsLoadingPromise = null;
            reject(err);
        }
    });
    return googleMapsLoadingPromise;
}

let checkoutGoogleMap = null;
let checkoutGoogleMarker = null;
let lastGeocodedAddress = "";

window.initCheckoutMap = async function () {
    const mapDiv = document.getElementById("checkout-map");
    if (!mapDiv) return;

    const startLat = state.customerGeoLocation ? state.customerGeoLocation.lat : 12.9716;
    const startLng = state.customerGeoLocation ? state.customerGeoLocation.lng : 77.5946;

    try {
        await ensureGoogleMapsLoaded();

        const mapOptions = {
            center: { lat: startLat, lng: startLng },
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };

        checkoutGoogleMap = new google.maps.Map(mapDiv, mapOptions);

        checkoutGoogleMarker = new google.maps.Marker({
            position: { lat: startLat, lng: startLng },
            map: checkoutGoogleMap,
            draggable: true,
            title: "Your Delivery Location"
        });

        // initial geocode
        geocodeLatLng(startLat, startLng);

        // dragend listener
        checkoutGoogleMarker.addListener('dragend', function () {
            const pos = checkoutGoogleMarker.getPosition();
            geocodeLatLng(pos.lat(), pos.lng());
            checkoutGoogleMap.panTo(pos);
        });

        // click listener on map to move marker
        checkoutGoogleMap.addListener('click', function (e) {
            const pos = e.latLng;
            checkoutGoogleMarker.setPosition(pos);
            geocodeLatLng(pos.lat(), pos.lng());
            checkoutGoogleMap.panTo(pos);
        });

        // Auto-detect and select location on checkout page load (Zepto-style)
        if (!state.customerGeoLocation) {
            setTimeout(() => {
                window.useCurrentLocation();
            }, 100);
        }

    } catch (err) {
        console.error("Failed to initialize Google Maps on checkout:", err);
        // Fallback: render an OSM iframe so the map container is never blank
        const lat = startLat.toFixed(5);
        const lng = startLng.toFixed(5);
        mapDiv.innerHTML = `
            <div style="position:relative; height:100%; width:100%;">
                <iframe
                    width="100%" height="100%"
                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${(startLng - 0.01)},${(startLat - 0.008)},${(startLng + 0.01)},${(startLat + 0.008)}&layer=mapnik&marker=${lat},${lng}"
                    style="border-radius: var(--border-radius-md); border: none; display: block;">
                </iframe>
                <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.65);color:#fff;font-size:0.73rem;padding:4px 10px;border-radius:20px;pointer-events:none;">
                    📍 Map preview — add a Google Maps API Key for full interactivity
                </div>
            </div>`;
        mapDiv.style.padding = '0';
        // Still populate coordinates from geolocation so order can proceed
        const latInput = document.getElementById("ship-lat");
        const lngInput = document.getElementById("ship-lng");
        if (latInput) latInput.value = startLat.toFixed(6);
        if (lngInput) lngInput.value = startLng.toFixed(6);
        const deliveryForm = document.getElementById("delivery-address-form-wrapper");
        if (deliveryForm) deliveryForm.style.display = "block";
        // Still trigger auto geolocation to populate address fields
        if (!state.customerGeoLocation) {
            setTimeout(() => { window.useCurrentLocation && window.useCurrentLocation(); }, 150);
        }
    }
};

async function geocodeLatLng(lat, lng) {
    const latInput = document.getElementById("ship-lat");
    const lngInput = document.getElementById("ship-lng");
    if (latInput) latInput.value = lat.toFixed(6);
    if (lngInput) lngInput.value = lng.toFixed(6);

    const addressDisplay = document.getElementById("geocoded-address-display");
    const addressText = document.getElementById("detected-address-text");
    const deliveryForm = document.getElementById("delivery-address-form-wrapper");

    if (addressDisplay) addressDisplay.style.display = "block";
    if (deliveryForm) deliveryForm.style.display = "block";
    if (addressText) addressText.innerHTML = `<em>Locating address...</em>`;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
            headers: {
                "Accept-Language": "en"
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
                lastGeocodedAddress = data.display_name;
                if (addressText) addressText.textContent = data.display_name;

                const streetInput = document.getElementById("ship-area");
                const cityInput = document.getElementById("ship-city");
                const stateInput = document.getElementById("ship-state");
                const zipInput = document.getElementById("ship-zip");

                const addr = data.address || {};
                const road = addr.road || addr.suburb || addr.neighbourhood || "";
                const city = addr.city || addr.town || addr.village || addr.county || "";
                const stateName = addr.state || "";
                const postcode = addr.postcode || "";

                if (streetInput) {
                    streetInput.value = road || addr.suburb || data.display_name.split(",")[0] || "";
                    streetInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (cityInput) {
                    cityInput.value = city;
                    cityInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (stateInput) {
                    stateInput.value = stateName;
                    stateInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (zipInput) {
                    zipInput.value = postcode;
                    zipInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } else {
                if (addressText) addressText.textContent = `Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            }
        } else {
            if (addressText) addressText.textContent = `Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)} (Geocoding API unavailable)`;
        }
    } catch (err) {
        console.error("Reverse geocoding error:", err);
        if (addressText) addressText.textContent = `Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)} (API request timed out)`;
    }
}

window.useCurrentLocation = function (event) {
    if (event) event.preventDefault();
    if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser.", "error");
        return;
    }

    const btn = event?.currentTarget || document.querySelector('[onclick*="useCurrentLocation"]');
    const originalHTML = btn ? btn.innerHTML : "";
    if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Getting GPS...`;
        btn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            if (btn) {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            state.customerGeoLocation = { lat, lng };

            if (checkoutGoogleMap && checkoutGoogleMarker) {
                const newPos = new google.maps.LatLng(lat, lng);
                checkoutGoogleMarker.setPosition(newPos);
                checkoutGoogleMap.setCenter(newPos);
                checkoutGoogleMap.setZoom(16);
                geocodeLatLng(lat, lng);
                showToast("Current location detected!", "success");
            }
        },
        (error) => {
            console.warn("GPS geolocation failed. Error code:", error.code, "Falling back to IP geolocation...");
            if (btn) {
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Trying IP Geo...`;
            }

            fetch("https://ipapi.co/json/")
                .then(res => res.json())
                .then(ipData => {
                    if (btn) {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                    }
                    if (ipData && ipData.latitude && ipData.longitude) {
                        const lat = ipData.latitude;
                        const lng = ipData.longitude;

                        state.customerGeoLocation = { lat, lng };

                        if (checkoutGoogleMap && checkoutGoogleMarker) {
                            const newPos = new google.maps.LatLng(lat, lng);
                            checkoutGoogleMarker.setPosition(newPos);
                            checkoutGoogleMap.setCenter(newPos);
                            checkoutGoogleMap.setZoom(16);
                            geocodeLatLng(lat, lng);
                            showToast("Location detected via IP address (approximate)!", "success");
                        }
                    } else {
                        showToast("Location API details unavailable. Please search manually.", "warning");
                    }
                })
                .catch(err => {
                    if (btn) {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                    }
                    console.error("IP Geolocation fallback failed:", err);
                    showToast("Failed to retrieve location automatically. Please search manually.", "warning");
                });
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
};

window.searchMapLocation = async function (event) {
    if (event) event.preventDefault();
    const queryInput = document.getElementById("map-search-input");
    const resultsDiv = document.getElementById("map-search-results");
    if (!queryInput || !resultsDiv) return;

    const query = queryInput.value.trim();
    if (!query) {
        showToast("Please enter an address to search", "warning");
        return;
    }

    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = `<div style="padding: 6px; color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Searching...</div>`;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=5`, {
            headers: {
                "Accept-Language": "en"
            }
        });
        if (response.ok) {
            const results = await response.json();
            if (results && results.length > 0) {
                resultsDiv.innerHTML = results.map(item => `
                    <div class="search-result-item" onclick="window.selectSearchResult(${item.lat}, ${item.lon}, '${item.display_name.replace(/'/g, "\\'")}')" style="padding: 10px; cursor: pointer; border-bottom: 1px solid var(--border-color);">
                        <i class="fa-solid fa-location-dot" style="color:var(--primary); margin-right:8px;"></i> ${item.display_name}
                    </div>
                `).join("");
            } else {
                resultsDiv.innerHTML = `<div style="padding: 10px; color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> No location matches found.</div>`;
            }
        } else {
            resultsDiv.innerHTML = `<div style="padding: 10px; color: var(--danger);">Search failed. Please try again.</div>`;
        }
    } catch (err) {
        console.error("Nominatim search failed:", err);
        resultsDiv.innerHTML = `<div style="padding: 10px; color: var(--danger);">Network error. Check connection.</div>`;
    }
};

window.selectSearchResult = function (lat, lng, displayName) {
    const resultsDiv = document.getElementById("map-search-results");
    if (resultsDiv) resultsDiv.style.display = "none";

    const queryInput = document.getElementById("map-search-input");
    if (queryInput) queryInput.value = "";

    if (checkoutGoogleMap && checkoutGoogleMarker) {
        const pos = new google.maps.LatLng(lat, lng);
        checkoutGoogleMarker.setPosition(pos);
        checkoutGoogleMap.setCenter(pos);
        checkoutGoogleMap.setZoom(16);
        geocodeLatLng(lat, lng);
    }
};

window.confirmSelectedLocation = function (event) {
    if (event) event.preventDefault();

    const wrapper = document.getElementById("delivery-address-form-wrapper");
    if (wrapper) {
        wrapper.style.display = "block";
        wrapper.scrollIntoView({ behavior: 'smooth' });
    }

    const latVal = document.getElementById("ship-lat")?.value;
    const lngVal = document.getElementById("ship-lng")?.value;

    const streetInput = document.getElementById("ship-area");
    const houseInput = document.getElementById("ship-house");

    if (lastGeocodedAddress) {
        if (houseInput && !houseInput.value) {
            houseInput.value = "Flat / House Plot";
            houseInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (streetInput && !streetInput.value) {
            streetInput.value = lastGeocodedAddress.split(",").slice(0, 3).join(", ").trim();
            streetInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    showToast("Location confirmed! Form populated below.", "success");
};

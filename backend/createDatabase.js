const sqlite3 = require('sqlite3').verbose();

async function createDatabase() {
    const db = new sqlite3.Database('onlineshop.sqlite');

    db.run('PRAGMA foreign_keys = ON');

    // Create tables IF NOT EXISTS (Removed DROP TABLE to ensure persistence)
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS user (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                address TEXT
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS product (
                productId INTEGER PRIMARY KEY AUTOINCREMENT,
                productName TEXT UNIQUE,
                "key" TEXT,
                category TEXT,
                productMaterial TEXT,
                productDimension TEXT,
                productDesc TEXT,
                productPrice REAL NOT NULL,
                stockQuantity INTEGER,
                activeThumbnail TEXT,
                hoverThumbnail TEXT,
                photoLocation TEXT NOT NULL,
                popularity INTEGER NOT NULL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS "order" (
                orderId INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                orderDate TEXT,
                totalAmount REAL NOT NULL,
                address TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES user(userId)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS orderitem (
                orderId INTEGER NOT NULL,
                productId INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                PRIMARY KEY (orderId, productId),
                FOREIGN KEY (orderId) REFERENCES "order"(orderId),
                FOREIGN KEY (productId) REFERENCES product(productId)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS cart (
                cartId INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                productId INTEGER NOT NULL,
                quantity INTEGER NOT NULL DEFAULT 1,
                date TEXT,
                FOREIGN KEY (userId) REFERENCES user(userId),
                FOREIGN KEY (productId) REFERENCES product(productId)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS wishlist (
                wishlistId INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                productId INTEGER NOT NULL,
                date TEXT,
                FOREIGN KEY (userId) REFERENCES user(userId),
                FOREIGN KEY (productId) REFERENCES product(productId)
            )`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });

    // Check if user table is empty before seeding
    db.get("SELECT COUNT(*) as count FROM user", (err, row) => {
        if (!err && row.count === 0) {
            db.serialize(() => {
                const stmt = db.prepare(`
                    INSERT INTO user ("name", "email", "password", "address")
                    VALUES (?, ?, ?, ?)
                `);
                stmt.run('Harry Potter', 'harry@example.com', '12345678', '4 Privet Drive, Little Whinging, Surrey');
                stmt.run('Test User', 'test@test.com', 'password123', '123 App Street, Tech City');
                stmt.finalize();
            });
        }
    });

    // Check if product table is empty before seeding
    db.get("SELECT COUNT(*) as count FROM product", (err, row) => {
        if (!err && row.count === 0) {
            db.serialize(() => {
                const stmt = db.prepare(`
                    INSERT INTO product (
                    productName, "key", category, productMaterial,
                    productDimension, productDesc, productPrice, stockQuantity,
                    activeThumbnail, photoLocation, popularity
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);

                const products = [
                    [
                        'Feuerstein',
                        'chair,office,gaming,foldable,ergonomic,swivel chair,revolving chair,bedroom,leather,spinning chair,red,black,sit,seat,tall',
                        'bedroom,office',
                        'PU leather & Mix-Moulded Foam; Bucket Seat Base',
                        '84.00 x 65.00 x 34.00 cm',
                        'Feuerstein is the best fit for taller or larger body sizes thanks to its ultra-wide and tall backrest. It features a bucket seat design to help users correct their posture while the lumbar and neck pillows enhance comfort. Adjust with 165-degree recliner and adjustable armrests.',
                        499.99,
                        1000,
                        '/public/resources/images/products/feuerstein/feuerstein.png',
                        '/public/resources/images/products/feuerstein/',
                        8,
                    ],
                    [
                        'wir-Hals',
                        'chair,outdoor,ergonomic,garden chair,stackable,plastic chair,cheap,white',
                        'dining,outdoor',
                        '100% plastic',
                        '55.50 x 53.00 x 82.00 cm',
                        'Traditional garden chair designed for comfort and outdoor relaxation. Stackable for easy storage.',
                        35.99,
                        3000,
                        '/public/resources/images/products/wir-hals/wir-hals.png',
                        '/public/resources/images/products/wir-hals/',
                        10,
                    ],
                    [
                        'Punkt',
                        'chair,living room,armchair,cotton,grey,wood,light beige,brown,white',
                        'living-room',
                        '100% cotton armchair cushion; Wooden frame',
                        '68.00 x 83.00 x 100.00 cm',
                        'Comfortable armchair with bent wood frame and adjustable cushions for styling.',
                        299.99,
                        50,
                        '/public/resources/images/products/punkt/punkt.png',
                        '/public/resources/images/products/punkt/',
                        6,
                    ],
                    [
                        'Gerechtigkeit',
                        'table,bedroom,brown,wood,durable,study,school,children',
                        'bedroom',
                        'wooden table with drawer',
                        '70.00 x 50.00 x 76.00 cm',
                        'Compact table with drawer storage for books and stationery.',
                        89.99,
                        2500,
                        '/public/resources/images/products/gerechtigkeit/gerechtigkeit.png',
                        '/public/resources/images/products/gerechtigkeit/',
                        7,
                    ],
                    [
                        'Betreffen',
                        'table,office,white,electric,adjustable,work,standing desk',
                        'office',
                        'Particleboard top; Steel legs; Plastic corners',
                        '140.00 x 60.00 x 62.00-126.00 cm',
                        'Dual-motor adjustable desk with sit/stand functionality and collision detection.',
                        299.99,
                        50,
                        '/public/resources/images/products/betreffen/betreffen.png',
                        '/public/resources/images/products/betreffen/',
                        4,
                    ],
                    [
                        'Momentan',
                        'sofa,living room,brown,beige,comfortable,lounge,chaise longue',
                        'living-room',
                        '100% polyester; Plywood',
                        '80.50 x 59.00 x 76.00 cm',
                        'Durable sofa with a chaise longue and two-tone Vissle fabric cover.',
                        1299.99,
                        50,
                        '/public/resources/images/products/momentan/momentan.png',
                        '/public/resources/images/products/momentan/',
                        2,
                    ],
                    [
                        'Keramikblüte',
                        'vase,living room,decorative,flower,ceramic,decoration',
                        'living-room',
                        '100% ceramic; Copper base and handle',
                        '22.00 x 22.00 x 41.00 cm',
                        'Handmade ceramic decorative vase featuring a copper base and handle.',
                        888.88,
                        10,
                        '/public/resources/images/products/keramikblute/keramikblute.png',
                        '/public/resources/images/products/keramikblute/',
                        2,
                    ],
                    [
                        'ICB Klein',
                        'table,living room,glass,modern,blue,steel,wood',
                        'living-room',
                        'International Klein Blue pigment; Glass; Wood; Steel',
                        '125.10 x 99.70 x 33.50 cm',
                        'Artistic table featuring patented International Klein Blue pigment and plexiglass.',
                        25000.00,
                        9,
                        '/public/resources/images/products/icbklein/icbklein.png',
                        '/public/resources/images/products/icbklein/',
                        6,
                    ],
                    [
                        'Tiera',
                        'cabinet,living room,outdoor,wood,storage,bedroom',
                        'living-room,bedroom',
                        'Oak particle board; Stainless steel table leg',
                        '120.00 x 42.00 x 74.00 cm',
                        'Storage cabinet with soft-closing hinges and push-to-open doors.',
                        699.00,
                        100,
                        '/public/resources/images/products/tiera/tiera.png',
                        '/public/resources/images/products/tiera/',
                        8,
                    ],
                    [
                        'Mila',
                        'cabinet,living room,black,tv,storage,glass,office',
                        'living-room,office',
                        'Black sanded metal; Tempered glass windows',
                        '140.00 x 40.00 x 90.00 cm',
                        'Metal base unit with adjustable shelves and durable laminate worktop.',
                        799.00,
                        50,
                        '/public/resources/images/products/mila/mila.png',
                        '/public/resources/images/products/mila/',
                        5,
                    ],
                    [
                        'Ochsenberg',
                        'cabinet,bookcase,glass,storage,white,office,bedroom,dining',
                        'living-room,bedroom,dining,office',
                        'Particleboard bookcase; Tempered glass windows',
                        '80.00 x 30.00 x 202.00 cm',
                        'Versatile bookcase with glass doors and adjustable hinges.',
                        420.69,
                        500,
                        '/public/resources/images/products/ochsenberg/ochsenberg.png',
                        '/public/resources/images/products/ochsenberg/',
                        9,
                    ],
                    [
                        'Funf fur Eins',
                        'sofa,living room,white,comfortable,cotton,fabric',
                        'living-room',
                        '3 seats sofa; 75% cotton, 25 % polyester',
                        '243.00 x 99.00 x 70.00 cm',
                        'Three-seat sofa with removable, washable teddy-like cotton blend cover.',
                        4028.00,
                        10,
                        '/public/resources/images/products/funffureins/funffureins.png',
                        '/public/resources/images/products/funffureins/',
                        10,
                    ],
                    [
                        'Angeben',
                        'bench,seat,outdoor,brown,wood,garden,acacia',
                        'outdoor',
                        'Solid acacia wood; Acrylic stain',
                        '100.00 x 62.00 x 78.00 cm',
                        'Durable solid acacia wood bench pre-treated for weather protection.',
                        399.99,
                        399,
                        '/public/resources/images/products/angeben/angeben.png',
                        '/public/resources/images/products/angeben/',
                        8,
                    ],
                    [
                        'Astolfo',
                        'art,mannequin,doll,decoration,wood,office,bedroom',
                        'bedroom,office',
                        'Solid wood; Steel; Chrome-plated',
                        '33.00 cm',
                        'Small movable wooden mannequin for display, decoration, or play.',
                        35.00,
                        100,
                        '/public/resources/images/products/astolfo/astolfo.png',
                        '/public/resources/images/products/astolfo/',
                        10,
                    ],
                    [
                        'Adriaann',
                        'lantern,lamp,light,black,decoration,outdoor,bedroom',
                        'bedroom,outdoor',
                        'Steel; Polyester powder coating',
                        '22.00 cm',
                        'Steel candle lantern suitable for indoor and outdoor festive atmospheres.',
                        15.00,
                        500,
                        '/public/resources/images/products/adriaann/adriaann.png',
                        '/public/resources/images/products/adriaann/',
                        7,
                    ],
                    [
                        'Atem Zeigen',
                        'mirror,honeycomb,glass,decoration,bedroom,dining',
                        'bedroom,dining',
                        'Glass',
                        '18.00 x 22.00 cm',
                        'Adjustable beehive-shaped mirrors that can be arranged in custom patterns.',
                        10.00,
                        41328,
                        '/public/resources/images/products/atemzeigen/atemzeigen.png',
                        '/public/resources/images/products/atemzeigen/',
                        5,
                    ],
                    [
                        'im Sommer',
                        'candle,vanilla,scent,bedroom,dining,office,outdoor,living-room',
                        'bedroom,dining,office,outdoor,living-room',
                        'Aluminium cup; Plant based wax',
                        '3.80 cm',
                        'Pack of 30 vanilla and warm milk scented tealight candles.',
                        10.00,
                        41328,
                        '/public/resources/images/products/imsommer/imsommer.png',
                        '/public/resources/images/products/imsommer/',
                        9,
                    ],
                    [
                        'Falschung',
                        'plant,pot,artificial,green,garden,bedroom,office',
                        'bedroom,office',
                        'Polythylene plastic pot',
                        '32.00 cm',
                        'Set of three lifelike artificial potted plants requiring no maintenance.',
                        10.00,
                        8548,
                        '/public/resources/images/products/falschung/falschung.png',
                        '/public/resources/images/products/falschung/',
                        8,
                    ],
                    [
                        'Kleinstadt',
                        'wardrobe,purple,white,storage,child,bedroom',
                        'bedroom',
                        'Fibreboard; Stainless steel tube',
                        '60.00 x 57.00 x 123.00 cm',
                        'Child-friendly wardrobe with adjustable interiors and soft-closing hinges.',
                        567.00,
                        40,
                        '/public/resources/images/products/kleinstadt/kleinstadt.png',
                        '/public/resources/images/products/kleinstadt/',
                        6,
                    ],
                    [
                        'Knooten',
                        'dustbin,trash can,grey,outdoor,dining,office',
                        'outdoor,dining,office',
                        'Galvanized steel; Polyester powder coating',
                        '41.00 x 51.00 cm',
                        'Large galvanized steel bin with sturdy handles and lid hook.',
                        67.00,
                        1210,
                        '/public/resources/images/products/knooten/knooten.png',
                        '/public/resources/images/products/knooten/',
                        9,
                    ]
                ];

                for (const p of products) {
                    stmt.run(p);
                }

                stmt.finalize(() => {
                    console.log('Products seeded successfully');
                });
            });
        }
    });

}

module.exports = { createDatabase };
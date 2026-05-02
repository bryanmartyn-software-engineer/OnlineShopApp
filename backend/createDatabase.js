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
                        'Feuerstein is the best fit for taller or larger body sizes thanks to its ultra-wide and tall backrest. It features a bucket seat design to help users correct their posture while the lumbar and neck pillows enhance the users comfort experience. Adjust your comfort experience with the 165-degree main recliner and 8cm height-adjustable armrests. With top grade hydraulics and castors, your chairs height can be adjusted easily and is capable of gliding smoothly across all flooring surfaces.',
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
                        'Our garden chair is a traditional-style chair designed to give a comfortable, relaxing place to sit and enjoy the sun. The slim design makes our chair perfect as extra seating around a patio table. Our chairs can also be stacked on top of each other for space-saving storage.',
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
                        'The layer-glued bent wood frame gives the armchair a comfortable resilience, making it perfect to relax in.The high back gives good support for your neck.A range of various seat cushions makes it easy to change the look of your Punkt and your living room.',
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
                        'Small, neat dimensions make the table easy to furnish with, even when space is limited. The drawer allows to store anything from books to stationaries.',
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
                        'Suitable for business use. Dual-motor desk with sturdy construction and high weight capacity secures a smooth transition between sitting and standing positions. The durable, stain-resistant surface wipes clean easily. Collision detection feature senses any sudden resistance when raising or lowering the desk. It automatically stops and reverses the movement by 30-50 mm.',
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
                        'With its soft shapes, modern expressions and durable light cover, this sofa with a chaise longue is a perfect combination of function and comfort. This cover is made from Vissle fabric in polyester, which is dope-dyed. It is a durable material with a smooth weave and a nice two-tone effect.The chaise longue can be placed either to the left or right, so you can adapt the sofa to your space and your preferences.',
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
                        'A nice vase with flowers can brighten up just about any day. This vase makes it easy to decorate with natural beauty in your home and is perfect for bouquets. Even more perfect when you are there with it!',
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
                        'Yves Klein is famous for his explorations into pure color blue in particular. Employing only his signature, patented pigment, International Klein Blue, the artist made iconic monochromes that aimed to bring art into the realm of pure, atmospheric feeling. The contrast between the transparency of the plexiglass and the intensity of the pure color expresses his desire to liberate color from form and grant it full autonomy.',
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
                        'The doors open with a light push and close silently and softly, as the hinges have both push-open and soft-closing functions. Optimise and organise your Tiera storage with boxes and inserts that you like.',
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
                        'This base unit has convenient worktop space giving you room to put anything you need. With adjustable shelves, you can organise the space inside cabinets according to what is being stored. The laminate worktop is durable and easy to maintain. With a little care, it will look good as new for many years.',
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
                        'Ochsenberg bookcase is a beloved icon that, thanks to its versatility, can be used in many ways at home. With glass doors you can display your favourite items while also protecting them from dust. Adjustable hinges allow you to adjust the door horizontally and vertically. Ochsenberg allows you to use it as you like, for storing everyday items, memorabilia or other things you collect.',
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
                        'Long-lasting quality, tactile materials and comfort with geometric shapes and well-balanced proportions, this sofa has it all! Sit back and enjoy a sofa that will be the natural centrepiece of any room.The cover is made of Djurmo, a teddy-like fabric in cotton and polyester with a distinct texture that is soft to the touch. Easy to keep fresh since the cover is removable and can be washed. Sit on what is comfortable to you, do what you like to do, with Funf fur Eins.',
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
                        'The furniture is made of acacia, a naturally durable and sturdy hardwood because of the high density of its wood fibres. Angeben has been pre-treated to be better protected against sun, rain, stains and other wear and tear. The timeless design makes the series easy to place and suitable for many different environments.',
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
                        'Everyone loves Astolfo, especally cultural individual:D. Enjoy an Astolfo with the low price of RM 35.00. Not only for display, it can be used as a toy too.',
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
                        'Lanterns always enhance your home and when it gets dark outside, their glow creates a cosy atmosphere. The home feels warm, guests feel welcome and a romantic touch is added to every moment. Suitable for both indoor and outdoor use. Perfect for hanging at festive occasions to set that extra party mood.',
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
                        'You can hang the mirrors in many different ways. One, two, three or more together, in pairs or on their own. This contemporary mirror features beehive shaped mirror that can be adjust and arrange to different shapes.',
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
                        'Comes with 30 unit per pack. A sweet scent of vanilla and warm milk with hints of coconut. Suitable when you want to create a cosy atmosphere at home with inspiration from crisp autumn days in the city or sunsets by the sea. Say goobye to your busy city life. Welcome home to a cosy atmosphere inspired by crisp autumn city days and sunsets by the sea!',
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
                        'Comes with 3 different artificial potted plant. Falschung artificial potted plants that do not require a green thumb. Perfect when you have better things to do than water plants and tidy up dead leaves. You will have everyone fooled because they look so lifelike. Perfect if you can\'t have a live plant, but still want to enjoy the beauty of nature.',
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
                        'I can do it! Everything height in this Kleinstadt wardrobe allows your child to see, reach and hang their clothes and things on hooks. The wardrobe has interiors which you can move and adjust based on your child needs. The doors have soft-closing hinges which make them close softly and quietly. Perfect for a stubborn 3-year old who does everything on their own.',
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
                        'This large grey bin can be used for waste or storing all kinds of things from laundry to firewood. It has sturdy handles and a clever hook under the lid that allows you to hang it on the edge of the bin. Easy to fill up and empty as you can secure the lid on the edge of the bin.',
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
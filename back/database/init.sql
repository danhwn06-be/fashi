DROP DATABASE IF EXISTS fashi_db;

CREATE DATABASE IF NOT EXISTS fashi_db;

USE fashi_db;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    isSale BOOLEAN DEFAULT false,
    sale_price DECIMAL(10, 2) DEFAULT NULL,
    description TEXT,
    specifications JSON,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

INSERT INTO
    categories (id, name, parent_id)
VALUES (1, 'Clothing', NULL);

INSERT INTO
    categories (id, name, parent_id)
VALUES (2, 'Shoes', NULL);

INSERT INTO
    categories (id, name, parent_id)
VALUES (3, 'Accessories', NULL);

INSERT INTO
    categories (id, name, parent_id)
VALUES (4, 'Sweater', 1);

INSERT INTO categories (id, name, parent_id) VALUES (5, 'Jacket', 1);

INSERT INTO categories (id, name, parent_id) VALUES (6, 'Scarf', 3);

INSERT INTO categories (id, name, parent_id) VALUES (7, 'Hat', 3);

INSERT INTO
    categories (id, name, parent_id)
VALUES (8, 'Backpack', 3);

INSERT INTO categories (id, name, parent_id) VALUES (9, 'Shoes', 2);

INSERT INTO
    products (
        image,
        category_id,
        name,
        price,
        isSale,
        sale_price,
        description,
        specifications
    )
VALUES (
        'img/products/product-1.jpg',
        4,
        'Mustard Twisted-Front Sweater',
        35.00,
        TRUE,
        14.00,
        'Mustard twisted-front knit sweater. Cozy and stylish twisted design at the front, featuring a soft and warm knit fabric perfect for cool weather.',
        '{
            "material": "Premium Acrylic Knit",
            "season": "Autumn / Winter",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Regular Fit (Featuring a cozier twist-front waist detail)",
            "thickness": "Thick & Warm",
            "colors": ["Mustard Yellow", "Cream"],
            "size_chart": {
                "S": "Height: 150 - 158cm, Weight: 45 - 52kg (Chest: 82-86cm)",
                "M": "Height: 159 - 167cm, Weight: 53 - 60kg (Chest: 87-92cm)",
                "L": "Height: 168 - 175cm, Weight: 61 - 68kg (Chest: 93-98cm)"
            }
        }'
    ),
    (
        'img/products/product-2.jpg',
        4,
        'Pink Lace-Up Cropped Sweater',
        13.00,
        FALSE,
        NULL,
        'Trendy ribbed cropped sweater in dusty pink. Highlights a beautiful lace-up cross detailing at the V-cut back, bringing a chic, youth-centric look for autumn.',
        '{
            "material": "Soft Rib-Knit",
            "season": "Autumn / Winter",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Cropped Fit (Featuring back V-cut lace-up detailing)",
            "thickness": "Medium",
            "colors": ["Dusty Pink", "White"],
            "size_chart": {
                "S": "Height: 150 - 158cm, Weight: 42 - 49kg (Length: 42cm)",
                "M": "Height: 159 - 166cm, Weight: 50 - 56kg (Length: 44cm)",
                "L": "Height: 167 - 174cm, Weight: 57 - 64kg (Length: 46cm)"
            }
        }'
    ),
    (
        'img/products/product-3.jpg',
        5,
        'Green Sage Utility Jacket',
        34.00,
        FALSE,
        NULL,
        'Green sage utility jacket featuring functional multi-pocket detailing. Classic collar, sturdy button-down front closure, and adjustable button straps at the cuffs.',
        '{
            "material": "Double-layer Cotton Kaki",
            "season": "Autumn / Winter / Spring",
            "size_type": "clothing_size",
            "gender_target": "Unisex",
            "fit_type": "Oversized Fit (Utility multi-pocket design)",
            "thickness": "Medium-Thick (Double-layer with windproof lining)",
            "colors": ["Sage Green", "Black", "Beige"],
            "size_chart": {
                "S": "Height: 155 - 165cm, Weight: 48 - 56kg (Shoulder width: 46cm)",
                "M": "Height: 166 - 173cm, Weight: 57 - 66kg (Shoulder width: 48cm)",
                "L": "Height: 174 - 182cm, Weight: 67 - 78kg (Shoulder width: 50cm)"
            }
        }'
    ),
    (
        'img/products/product-4.jpg',
        6,
        'Grey Cable-Knit Winter Scarf',
        64.00,
        FALSE,
        NULL,
        'Cozy grey cable-knit winter scarf. Exquisitely woven with premium wool blend to provide superior warmth without itching the neck.',
        '{
            "material": "Lambswool Blend",
            "season": "Winter",
            "size_type": "freesize",
            "gender_target": "Unisex",
            "fit_type": "Freesize long loop",
            "thickness": "Very Thick & Warm",
            "dimensions": "Length 180cm x Width 30cm",
            "colors": ["Charcoal Grey", "Black", "Burgundy"],
            "size_chart": {
                "Freesize": "Length of 180cm allows 2-3 wraps around the neck, suitable for all genders and ages."
            }
        }'
    ),
    (
        'img/products/product-5.jpg',
        7,
        'Yellow Streetwear Baseball Cap',
        44.00,
        FALSE,
        NULL,
        'Eye-catching yellow streetwear cap. Designed with signature embroidery details and an elongated adjustable strap for an edgy style.',
        '{
            "material": "100% Breathable Kaki Cotton",
            "season": "Spring / Summer / Year-round",
            "size_type": "freesize",
            "gender_target": "Unisex",
            "fit_type": "Adjustable (Sporty head-hugging cap with a metal buckle adjustor)",
            "thickness": "Lightweight & Breathable",
            "dimensions": "Standard circumference: 54cm - 60cm (Depth: 11cm, Visor length: 7.5cm)",
            "colors": ["Vibrant Yellow", "Black", "Pink"],
            "size_chart": {
                "Freesize": "Featuring an elongated strap for flexible circumference tuning from 54cm to 60cm"
            }
        }'
    ),
    (
        'img/products/product-6.jpg',
        4,
        'Beige Bear-Sleeve Knit Sweater',
        34.00,
        FALSE,
        NULL,
        'Oversized crewneck knit sweater in beige. Contrasting mustard-yellow trim on collar and cuffs, with a cute white bear face pattern knitted on the sleeves.',
        '{
            "material": "Soft Acrylic Cozy Blend",
            "season": "Autumn / Winter",
            "size_type": "clothing_size",
            "gender_target": "Women / Unisex",
            "fit_type": "Oversized Fit (Drop shoulder, puff color-block sleeves)",
            "thickness": "Thick & Cozy",
            "colors": ["Beige-Mustard", "Beige-Pink"],
            "size_chart": {
                "S": "Height: 150 - 160cm, Weight: 45 - 53kg (Length: 64cm, Chest: 112cm)",
                "M": "Height: 161 - 168cm, Weight: 54 - 62kg (Length: 66cm, Chest: 116cm)",
                "L": "Height: 169 - 176cm, Weight: 63 - 72kg (Length: 68cm, Chest: 120cm)"
            }
        }'
    ),
    (
        'img/products/product-7.jpg',
        8,
        'Yellow Outdoor Hiking Backpack',
        64.00,
        TRUE,
        34.00,
        'Vibrant yellow hiking and outdoor backpack. Built with ergonomic straps, multi-pocket organization, and padded support for premium comfort.',
        '{
            "material": "600D Waterproof Oxford Nylon",
            "season": "Year-round",
            "size_type": "freesize",
            "gender_target": "Unisex",
            "fit_type": "Freesize Outdoor (Adjustable chest and waist support straps)",
            "waterproof": true,
            "capacity": "35 Liters",
            "dimensions": "52cm (H) x 33cm (W) x 18cm (D)",
            "weight_empty": "0.85 kg",
            "colors": ["Yellow-Black", "Blue-Grey", "Full Black"],
            "size_chart": {
                "Freesize": "35L capacity featuring a dedicated 15.6-inch laptop compartment and ergonomic 3D honey-comb back padding."
            }
        }'
    ),
    (
        'img/products/product-8.jpg',
        5,
        'Green Waterproof Windbreaker',
        44.00,
        FALSE,
        NULL,
        'Double-layer waterproof hooded windbreaker in deep green. Zippered front closure, snap-button pockets, and adjustable toggles at the waist and cuffs.',
        '{
            "material": "Double-layer Water-Resistant Polyester with breathable mesh lining",
            "season": "Autumn / Winter / Rainy Season",
            "size_type": "clothing_size",
            "gender_target": "Men / Unisex",
            "fit_type": "Regular Utility Fit (Featuring adjustable waist toggles and cuff buttons)",
            "waterproof": true,
            "thickness": "Lightweight yet excellent windbreaker (Gore-Tex windproof tech)",
            "colors": ["Forest Green", "Black", "Navy Blue"],
            "size_chart": {
                "S": "Height: 158 - 165cm, Weight: 50 - 58kg (Shoulder: 45cm, Length: 68cm)",
                "M": "Height: 166 - 173cm, Weight: 59 - 68kg (Shoulder: 47cm, Length: 70cm)",
                "L": "Height: 174 - 181cm, Weight: 69 - 80kg (Shoulder: 49cm, Length: 72cm)",
                "XL": "Height: 182 - 190cm, Weight: 81 - 92kg (Shoulder: 51cm, Length: 74cm)"
            }
        }'
    ),
    (
        'img/products/product-9.jpg',
        9,
        'Yellow Suede High-Top Sneakers',
        34.00,
        FALSE,
        NULL,
        'Yellow suede high-top sneakers with white star chevron side details. Crafted with sturdy vulcanized rubber soles to provide maximum traction and classic streetwear vibes.',
        '{
            "material": "Natural Suede Leather with Canvas Lining",
            "season": "Year-round",
            "size_type": "shoe_size",
            "gender_target": "Unisex (Streetwear / Casual)",
            "sole_material": "Sturdy Vulcanized Rubber (Anti-slip)",
            "colors": ["Mustard-White", "Cobalt-White", "Black-White"],
            "size_chart": {
                "39": "Foot Length: 24.1cm - 24.5cm",
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm",
                "43": "Foot Length: 26.1cm - 26.5cm"
            }
        }'
    );

CREATE TABLE IF NOT EXISTS chat_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    sender ENUM('user', 'bot') NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type ENUM('PERCENT', 'FIXED') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
    max_uses INT DEFAULT NULL,
    used_count INT DEFAULT 0,
    expiry_date DATETIME DEFAULT NULL,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO
    coupons (
        code,
        discount_type,
        discount_value,
        max_uses,
        expiry_date
    )
VALUES (
        'SUMMER20',
        'PERCENT',
        20.00,
        100,
        '2026-12-31 23:59:59'
    ),
    (
        'DISCOUNT10',
        'FIXED',
        10.00,
        50,
        '2026-12-31 23:59:59'
    );

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    users (
        username,
        email,
        password,
        role
    )
VALUES (
        'Dohan',
        'user@fashi.dev',
        '$2b$10$7vebN8EWCPwEbST49rHWOuruoyXVsYglC0pvl4FdkyLzmz/7mu06y',
        'user'
    );

CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    selected_specs VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    coupon_code VARCHAR(50) DEFAULT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    status ENUM(
        'pending',
        'processing',
        'completed',
        'cancelled'
    ) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    selected_specs VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

INSERT INTO
    categories (id, name, parent_id)
VALUES (10, 'T-Shirt', 1);

INSERT INTO categories (id, name, parent_id) VALUES (11, 'Jeans', 1);

INSERT INTO categories (id, name, parent_id) VALUES (12, 'Dress', 1);

INSERT INTO
    categories (id, name, parent_id)
VALUES (13, 'Sneakers', 2);

INSERT INTO categories (id, name, parent_id) VALUES (14, 'Boots', 2);

INSERT INTO
    categories (id, name, parent_id)
VALUES (15, 'Sunglasses', 3);

INSERT INTO categories (id, name, parent_id) VALUES (16, 'Watch', 3);

INSERT INTO
    products (
        image,
        category_id,
        name,
        price,
        isSale,
        sale_price,
        description,
        specifications
    )
VALUES
    (
        'img/products/product-10.jpg',
        10,
        'Basic White Cotton T-Shirt',
        15.00,
        FALSE,
        NULL,
        'A comfortable and versatile everyday basic white t-shirt. Crafted from 100% premium breathable cotton, this tee offers a relaxed fit and incredibly soft feel, making it an essential foundation for any casual wardrobe.',
        '{
            "material": "100% Premium Breathable Cotton",
            "season": "Spring / Summer",
            "size_type": "clothing_size",
            "gender_target": "Unisex",
            "fit_type": "Classic Relaxed Fit (Everyday essential drape)",
            "thickness": "Lightweight & Breathable (Single jersey knit)",
            "colors": ["Alabaster White", "Midnight Black", "Heather Mist Grey"],
            "size_chart": {
                "S": "Height: 155 - 165cm, Weight: 48 - 56kg (Chest: 96cm, Length: 66cm)",
                "M": "Height: 166 - 173cm, Weight: 57 - 66kg (Chest: 100cm, Length: 68cm)",
                "L": "Height: 174 - 181cm, Weight: 67 - 78kg (Chest: 104cm, Length: 70cm)"
            }
        }'
    ),
    (
        'img/products/product-11.jpg',
        10,
        'Vintage Graphic Tee',
        22.00,
        TRUE,
        18.00,
        'Vintage style graphic t-shirt featuring a retro faded print on the front. Made from a durable cotton blend, it provides a lived-in feel and edgy street-style look for casual weekend outings.',
        '{
            "material": "80% Cotton, 20% Polyester Blend (Soft-wash treatment)",
            "season": "All Seasons",
            "size_type": "clothing_size",
            "gender_target": "Men / Unisex",
            "fit_type": "Regular Fit (Retro-inspired washed silhouette)",
            "thickness": "Medium-weight (Durable and structured)",
            "colors": ["Charcoal Acid Wash", "Vintage Navy Blue"],
            "size_chart": {
                "S": "Height: 160 - 168cm, Weight: 50 - 58kg (Chest: 98cm, Length: 68cm)",
                "M": "Height: 169 - 176cm, Weight: 59 - 68kg (Chest: 102cm, Length: 70cm)",
                "L": "Height: 177 - 185cm, Weight: 69 - 80kg (Chest: 108cm, Length: 72cm)"
            }
        }'
    ),
    (
        'img/products/product-12.jpg',
        10,
        'Oversized Streetwear T-Shirt',
        25.00,
        FALSE,
        NULL,
        'Heavyweight oversized t-shirt designed for a contemporary streetwear aesthetic. Features dropped shoulders, a thick ribbed crew neck, and high-density fabric that holds its shape beautifully.',
        '{
            "material": "Heavyweight Carded Cotton (220gsm)",
            "season": "Spring / Autumn / Year-round",
            "size_type": "clothing_size",
            "gender_target": "Unisex",
            "fit_type": "Oversized Fit (Dropped shoulders & wide sleeves)",
            "thickness": "Thick & Structured",
            "colors": ["Desert Beige", "Olive Canopy Green"],
            "size_chart": {
                "S": "Height: 158 - 167cm, Weight: 52 - 62kg (Chest: 106cm, Length: 70cm)",
                "M": "Height: 168 - 176cm, Weight: 63 - 75kg (Chest: 112cm, Length: 73cm)",
                "L": "Height: 177 - 186cm, Weight: 76 - 90kg (Chest: 118cm, Length: 76cm)"
            }
        }'
    ),
    (
        'img/products/product-13.jpg',
        10,
        'Striped Long Sleeve Tee',
        28.00,
        TRUE,
        20.00,
        'Classic breton striped long sleeve t-shirt inspired by nautical fashion. Made from soft organic cotton, it provides lightweight warmth perfect for layering during breezy autumn days.',
        '{
            "material": "100% Organic combed cotton",
            "season": "Autumn / Spring",
            "size_type": "clothing_size",
            "gender_target": "Women / Unisex",
            "fit_type": "Slim Fit (Flattering horizontal nautical stripes)",
            "thickness": "Light-to-Medium",
            "colors": ["Off-White/Navy Striped", "Off-White/Crimson Red Striped"],
            "size_chart": {
                "S": "Height: 150 - 158cm, Weight: 43 - 50kg (Chest: 92cm, Length: 58cm)",
                "M": "Height: 159 - 167cm, Weight: 51 - 58kg (Chest: 96cm, Length: 60cm)",
                "L": "Height: 168 - 175cm, Weight: 59 - 66kg (Chest: 100cm, Length: 62cm)"
            }
        }'
    ),
    (
        'img/products/product-14.jpg',
        10,
        'Athletic Performance Tee',
        30.00,
        FALSE,
        NULL,
        'High-performance moisture-wicking t-shirt designed for intense workouts and running. Features quick-dry technology and four-way stretch fabric for maximum mobility and comfort.',
        '{
            "material": "90% Recycled Polyester, 10% Spandex Interlock",
            "season": "Summer / Active Year-round",
            "size_type": "clothing_size",
            "gender_target": "Men",
            "fit_type": "Athletic Fit (Ergonomic flatlock seams to reduce chafing)",
            "thickness": "Ultra Lightweight & Quick-dry",
            "colors": ["Neon Acid Yellow", "Stealth Matte Black"],
            "size_chart": {
                "S": "Height: 162 - 170cm, Weight: 55 - 63kg (Chest: 94cm, Length: 67cm)",
                "M": "Height: 171 - 178cm, Weight: 64 - 74kg (Chest: 98cm, Length: 69cm)",
                "L": "Height: 179 - 186cm, Weight: 75 - 85kg (Chest: 104cm, Length: 71cm)"
            }
        }'
    ),
    (
        'img/products/product-15.jpg',
        11,
        'Classic Straight Leg Jeans',
        55.00,
        FALSE,
        NULL,
        'Timeless straight leg blue denim jeans with a subtle vintage fade. Woven with a touch of elastane for comfort, these jeans offer a classic silhouette that transitions easily from day to night.',
        '{
            "material": "98% Heavy Denim Cotton, 2% Elastane Stretch",
            "season": "All Seasons",
            "size_type": "clothing_size",
            "gender_target": "Men",
            "fit_type": "Straight Leg Fit (Mid-rise waist, straight from hip to hem)",
            "thickness": "Medium-Heavy Denim (12.5 oz)",
            "colors": ["Medium Vintage Blue", "Dark Indigo Wash"],
            "size_chart": {
                "30": "Height: 165 - 172cm, Weight: 55 - 62kg (Waist: 78cm, Inseam: 78cm, Length: 102cm)",
                "32": "Height: 173 - 180cm, Weight: 63 - 72kg (Waist: 83cm, Inseam: 80cm, Length: 105cm)",
                "34": "Height: 181 - 188cm, Weight: 73 - 83kg (Waist: 88cm, Inseam: 82cm, Length: 108cm)"
            }
        }'
    ),
    (
        'img/products/product-16.jpg',
        11,
        'High-Waisted Mom Jeans',
        48.00,
        TRUE,
        38.00,
        'Comfortable high-waisted mom jeans in a vintage light wash. Designed to flatter the waistline while providing a relaxed fit through the hips and thighs for an effortlessly chic 90s aesthetic.',
        '{
            "material": "100% Rigid Organic Cotton Denim",
            "season": "All Seasons",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Relaxed Mom Fit (High-rise, tapered ankle crop)",
            "thickness": "Medium Denim (11.8 oz)",
            "colors": ["Light Cloud Blue Wash"],
            "size_chart": {
                "26": "Height: 152 - 160cm, Weight: 43 - 49kg (Waist: 66cm, Hips: 92cm, Length: 95cm)",
                "28": "Height: 161 - 168cm, Weight: 50 - 57kg (Waist: 71cm, Hips: 97cm, Length: 98cm)",
                "30": "Height: 169 - 176cm, Weight: 58 - 66kg (Waist: 76cm, Hips: 102cm, Length: 101cm)"
            }
        }'
    ),
    (
        'img/products/product-17.jpg',
        11,
        'Black Skinny Denim',
        50.00,
        FALSE,
        NULL,
        'Sleek and versatile black skinny jeans engineered with super-stretch denim. These jeans contour perfectly to your body shape while offering superior flexibility for all-day comfort.',
        '{
            "material": "85% Combed Cotton, 13% Polyester, 2% Spandex Super-Stretch",
            "season": "All Seasons",
            "size_type": "clothing_size",
            "gender_target": "Unisex",
            "fit_type": "Skinny Fit (High-retention stretch, contours body outline)",
            "thickness": "Medium-Light Denim (10.5 oz)",
            "colors": ["Midnight Shadow Black"],
            "size_chart": {
                "28": "Height: 158 - 166cm, Weight: 48 - 56kg (Waist: 71cm, Inseam: 76cm)",
                "30": "Height: 167 - 174cm, Weight: 57 - 65kg (Waist: 76cm, Inseam: 78cm)",
                "32": "Height: 175 - 182cm, Weight: 66 - 76kg (Waist: 81cm, Inseam: 80cm)"
            }
        }'
    ),
    (
        'img/products/product-18.jpg',
        11,
        'Distressed Boyfriend Jeans',
        60.00,
        TRUE,
        45.00,
        'Relaxed fit boyfriend jeans featuring authentic-looking knee rips and frayed hems. The perfect laid-back denim choice to pair with clean white sneakers and a simple cropped tee.',
        '{
            "material": "100% Tough Cotton Denim (Pre-shrunk)",
            "season": "Spring / Summer / Autumn",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Slouchy Boyfriend Fit (Low-slung waist with distressed knee cuts)",
            "thickness": "Medium Denim (12 oz)",
            "colors": ["Washed Stone Indigo"],
            "size_chart": {
                "S": "Height: 153 - 161cm, Weight: 45 - 52kg (Waist: 68cm, Hips: 94cm, Length: 96cm)",
                "M": "Height: 162 - 169cm, Weight: 53 - 60kg (Waist: 73cm, Hips: 99cm, Length: 98cm)",
                "L": "Height: 170 - 177cm, Weight: 61 - 70kg (Waist: 78cm, Hips: 104cm, Length: 100cm)"
            }
        }'
    ),
    (
        'img/products/product-19.jpg',
        11,
        'Raw Denim Selvedge Jeans',
        85.00,
        FALSE,
        NULL,
        'Premium unwashed Japanese selvedge denim for true denim enthusiasts. These stiff, highly durable jeans will mold to your body over time, creating a completely unique and personalized fade pattern.',
        '{
            "material": "14oz Premium Japanese Selvedge Cotton Denim",
            "season": "Autumn / Winter",
            "size_type": "clothing_size",
            "gender_target": "Men",
            "fit_type": "Slim Straight Fit (Rigid feel that breaks in uniquely to wearer)",
            "thickness": "Heavyweight Rigid Denim",
            "colors": ["Raw Deep Indigo"],
            "size_chart": {
                "30": "Height: 167 - 174cm, Weight: 56 - 64kg (Waist: 77cm, Inseam: 82cm, Outseam: 106cm)",
                "32": "Height: 175 - 181cm, Weight: 65 - 75kg (Waist: 82cm, Inseam: 82cm, Outseam: 108cm)",
                "34": "Height: 182 - 189cm, Weight: 76 - 87kg (Waist: 87cm, Inseam: 84cm, Outseam: 110cm)"
            }
        }'
    ),
    (
        'img/products/product-20.jpg',
        12,
        'Floral Summer Midi Dress',
        45.00,
        FALSE,
        NULL,
        'Lightweight and breezy floral midi dress perfect for sunny days and garden parties. Features a flattering sweetheart neckline, adjustable shoulder straps, and a flowy tiered A-line skirt.',
        '{
            "material": "100% Breathable Eco-Viscose",
            "season": "Summer",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "A-Line Flowy (Smocked elastic back panel for customized bust fit)",
            "thickness": "Lightweight & Airy (Includes soft interior lining)",
            "colors": ["Crimson Red Floral", "Cerulean Blue Floral"],
            "size_chart": {
                "S": "Height: 152 - 160cm, Weight: 42 - 50kg (Bust: 82-86cm, Length: 110cm)",
                "M": "Height: 161 - 168cm, Weight: 51 - 58kg (Bust: 87-92cm, Length: 112cm)",
                "L": "Height: 169 - 176cm, Weight: 59 - 68kg (Bust: 93-98cm, Length: 114cm)"
            }
        }'
    ),
    (
        'img/products/product-21.jpg',
        12,
        'Elegant Black Evening Gown',
        120.00,
        TRUE,
        95.00,
        'Sophisticated and glamorous floor-length evening gown. Crafted from luxurious high-grade stretch satin, it highlights a stunning draped cowl neckline and a daring thigh-high side slit for formal events.',
        '{
            "material": "Luxurious Heavyweight Stretch Satin (95% Poly, 5% Spandex)",
            "season": "All Seasons / Evening Gala",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Form-fitting Silhouette (Draped cowl neckline & side high slit)",
            "thickness": "Medium with high-quality drape luster",
            "colors": ["Noir Black", "Emerald Forest Green"],
            "size_chart": {
                "S": "Height: 155 - 163cm, Weight: 44 - 51kg (Bust: 82-85cm, Waist: 63-66cm, Length: 142cm)",
                "M": "Height: 164 - 171cm, Weight: 52 - 59kg (Bust: 86-90cm, Waist: 67-71cm, Length: 145cm)",
                "L": "Height: 172 - 180cm, Weight: 60 - 68kg (Bust: 91-96cm, Waist: 72-78cm, Length: 148cm)"
            }
        }'
    ),
    (
        'img/products/product-22.jpg',
        12,
        'Boho Maxi Dress',
        55.00,
        FALSE,
        NULL,
        'Flowy bohemian maxi dress adorned with intricate ethnic-inspired patterns. Features elegant retro bell sleeves, a drawstring split-neck collar, and a tiered skirt, offering ultimate comfort and a free-spirited vibe.',
        '{
            "material": "Premium Cotton-Linen Blend",
            "season": "Spring / Summer",
            "size_type": "freesize",
            "gender_target": "Women",
            "fit_type": "Loose Bohemian Fit (Tiered flowy silhouette with drawstring waist)",
            "thickness": "Lightweight & Breathable",
            "colors": ["Earthy Terracotta Brown", "Vintage Mustard Yellow"],
            "size_chart": {
                "Freesize": "Height: 153 - 172cm, Weight: 45 - 68kg (Bust: up to 105cm, Length: 135cm)"
            }
        }'
    ),
    (
        'img/products/product-23.jpg',
        12,
        'Ribbed Knit Bodycon Dress',
        40.00,
        TRUE,
        25.00,
        'Cozy yet alluring form-fitting ribbed knit dress for autumn evenings. The stretchable fine-knit fabric comfortably hugs your curves while keeping you warm during transitional weather.',
        '{
            "material": "Ribbed Cotton-Acrylic Fine Knit",
            "season": "Autumn / Winter / Spring",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Bodycon Fit (Curve-hugging rib texture with high elasticity)",
            "thickness": "Medium-Thick & Warm",
            "colors": ["Oatmeal Beige", "Deep Wine Burgundy"],
            "size_chart": {
                "S": "Height: 150 - 158cm, Weight: 42 - 49kg (Bust: 80-85cm, Dress Length: 90cm)",
                "M": "Height: 159 - 167cm, Weight: 50 - 57kg (Bust: 86-91cm, Dress Length: 92cm)",
                "L": "Height: 168 - 175cm, Weight: 58 - 66kg (Bust: 92-98cm, Dress Length: 94cm)"
            }
        }'
    ),
    (
        'img/products/product-24.jpg',
        12,
        'White Linen Wrap Dress',
        65.00,
        FALSE,
        NULL,
        'Breathable and elegant pure flax linen wrap dress, a quintessential piece for beach vacations and sunny afternoons. Features an adjustable self-tie waist that creates a custom, flattering fit for any body shape.',
        '{
            "material": "100% Pure Flax Linen",
            "season": "Summer",
            "size_type": "clothing_size",
            "gender_target": "Women",
            "fit_type": "Adjustable Wrap Fit (Surplice V-neckline with side tie strings)",
            "thickness": "Lightweight & Ultra-Breathable",
            "colors": ["Crisp Ivory White", "Warm Oatmeal Beige"],
            "size_chart": {
                "S": "Height: 152 - 160cm, Weight: 45 - 52kg (Bust: 84-88cm, Length: 103cm)",
                "M": "Height: 161 - 168cm, Weight: 53 - 60kg (Bust: 89-93cm, Length: 105cm)",
                "L": "Height: 169 - 176cm, Weight: 61 - 69kg (Bust: 94-98cm, Length: 107cm)"
            }
        }'
    ),
    (
        'img/products/product-25.jpg',
        13,
        'Classic White Canvas Sneakers',
        35.00,
        FALSE,
        NULL,
        'The ultimate everyday low-top white canvas sneaker. Featuring a durable vulcanized rubber sole and breathable canvas upper, it pairs effortlessly with everything from raw denim to summer dresses.',
        '{
            "material": "Heavy-duty Cotton Canvas Upper",
            "season": "All Seasons / Year-round",
            "size_type": "shoe_size",
            "gender_target": "Unisex",
            "sole_material": "Sturdy Vulcanized Rubber (Anti-slip waffle traction)",
            "fit_type": "True to Size (Classic low-cut profile)",
            "colors": ["Crisp Alabaster White"],
            "size_chart": {
                "37": "Foot Length: 22.8cm - 23.3cm (Standard EU 37)",
                "38": "Foot Length: 23.4cm - 24.0cm (Standard EU 38)",
                "39": "Foot Length: 24.1cm - 24.5cm (Standard EU 39)",
                "40": "Foot Length: 24.6cm - 25.0cm (Standard EU 40)",
                "41": "Foot Length: 25.1cm - 25.5cm (Standard EU 41)"
            }
        }'
    ),
    (
        'img/products/product-26.jpg',
        13,
        'Chunky Dad Shoes',
        75.00,
        TRUE,
        55.00,
        'Trendy retro-style chunky sneakers with exaggerated sculpted thick soles. Combines breathable sports mesh panels with premium synthetic leather overlays for a bold, fashion-forward 90s aesthetic.',
        '{
            "material": "Premium Sport Mesh & Textured Synthetic Leather Overlays",
            "season": "All Seasons / Streetwear",
            "size_type": "shoe_size",
            "gender_target": "Unisex",
            "sole_material": "Sculpted EVA Foam Midsole & Grippy Rubber Outsole",
            "fit_type": "Bulky/Chunky Fit (Height boosting +4.5cm heel height)",
            "colors": ["Chalk White/Concrete Grey", "Midnight Mono Black"],
            "size_chart": {
                "38": "Foot Length: 23.4cm - 24.0cm",
                "39": "Foot Length: 24.1cm - 24.5cm",
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm"
            }
        }'
    ),
    (
        'img/products/product-27.jpg',
        13,
        'Lightweight Running Shoes',
        85.00,
        FALSE,
        NULL,
        'Engineered for performance, these running shoes feature a highly breathable mesh upper and a responsive, shock-absorbing foam midsole to keep you comfortable and supported mile after mile.',
        '{
            "material": "Engineered Jacquard Mesh with TPU Welded Overlays",
            "season": "All Seasons / Athletics",
            "size_type": "shoe_size",
            "gender_target": "Men",
            "sole_material": "Responsive EVA Foam Midsole & Segmented Rubber Pods",
            "fit_type": "Athletic Snug Fit (Padded collar & tongue for locked-in support)",
            "colors": ["Neon Hyper Blue", "Stealth Black/Volt Crimson"],
            "size_chart": {
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm",
                "43": "Foot Length: 26.1cm - 26.5cm",
                "44": "Foot Length: 26.6cm - 27.0cm"
            }
        }'
    ),
    (
        'img/products/product-28.jpg',
        13,
        'High-Top Street Sneakers',
        60.00,
        TRUE,
        45.00,
        'Urban-inspired high-top sneakers offering exceptional ankle support. Made with premium PU leather and padded collars, perfect for adding an edgy touch to your autumn streetwear.',
        '{
            "material": "Premium Matte PU Leather & Padded Nylon Mesh Collar",
            "season": "Autumn / Winter / Year-round",
            "size_type": "shoe_size",
            "gender_target": "Men / Unisex",
            "sole_material": "Flat Vulcanized Rubber Outsole (Anti-abrasion)",
            "fit_type": "High-Top Secure Fit (Hook-and-loop ankle strap closure)",
            "colors": ["Classic Black/White", "Varsity Crimson Red/Black"],
            "size_chart": {
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm",
                "43": "Foot Length: 26.1cm - 26.5cm"
            }
        }'
    ),
    (
        'img/products/product-29.jpg',
        13,
        'Slip-On Skate Shoes',
        45.00,
        FALSE,
        NULL,
        'Convenient and highly durable slip-on shoes designed for skateboarding and casual wear. Features elastic side gussets for easy on-and-off and a grippy vulcanized waffle outsole.',
        '{
            "material": "Split Suede & Heavyweight 12oz Canvas Upper",
            "season": "Spring / Summer / Year-round",
            "size_type": "shoe_size",
            "gender_target": "Unisex",
            "sole_material": "Reinforced Vulcanized Rubber Waffle Outsole",
            "fit_type": "Slip-on Snug Fit (Dual elastic side panels for easy entry)",
            "colors": ["Classic Checkerboard Noir", "Solid Carbon Black"],
            "size_chart": {
                "37": "Foot Length: 22.8cm - 23.3cm",
                "38": "Foot Length: 23.4cm - 24.0cm",
                "39": "Foot Length: 24.1cm - 24.5cm",
                "40": "Foot Length: 24.6cm - 25.0cm"
            }
        }'
    ),
    (
        'img/products/product-30.jpg',
        14,
        'Leather Chelsea Boots',
        95.00,
        FALSE,
        NULL,
        'A footwear essential, these classic leather Chelsea boots feature iconic elastic side panels and a woven pull tab. The sleek silhouette pairs perfectly with both tailored suits and raw denim.',
        '{
            "material": "100% Genuine Full-Grain Calf Leather Upper",
            "season": "Autumn / Winter / Rainy Season",
            "size_type": "shoe_size",
            "gender_target": "Men",
            "sole_material": "Stack Leather Heel with Durable Anti-slip Rubber Injected Outsole",
            "fit_type": "Sleek Ankle Fit (Double elastic gore sides, pull-back tab)",
            "colors": ["Rich Espresso Dark Brown", "Matte Charcoal Black"],
            "size_chart": {
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm",
                "43": "Foot Length: 26.1cm - 26.5cm"
            }
        }'
    ),
    (
        'img/products/product-31.jpg',
        14,
        'Suede Desert Boots',
        80.00,
        TRUE,
        65.00,
        'Casual lace-up desert boots crafted from incredibly soft genuine suede. Featuring a comfortable natural crepe rubber sole, they bridge the gap perfectly between casual sneakers and formal dress shoes.',
        '{
            "material": "Premium Eco-treated Soft Suede Leather",
            "season": "Spring / Autumn",
            "size_type": "shoe_size",
            "gender_target": "Men",
            "sole_material": "Cushioned Crepe Rubber (Provides natural bounce and comfort)",
            "fit_type": "Relaxed Chukka Boot Fit (Two-eyelet lace-up structure)",
            "colors": ["Desert Sand Beige", "Navy Ocean Blue"],
            "size_chart": {
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm",
                "43": "Foot Length: 26.1cm - 26.5cm"
            }
        }'
    ),
    (
        'img/products/product-32.jpg',
        14,
        'Chunky Combat Boots',
        70.00,
        FALSE,
        NULL,
        'Edgy, military-inspired lace-up combat boots with formidable Platform soles. Made from water-resistant vegan leather, they add a tough, rebellious grounding to feminine dresses or skinny jeans.',
        '{
            "material": "Premium Water-Resistant Vegan Matte Leather",
            "season": "Autumn / Winter / Rainy Season",
            "size_type": "shoe_size",
            "gender_target": "Women",
            "sole_material": "Heavy-duty Lugged Rubber Platform Outsole (4cm height)",
            "fit_type": "Platform Standard Fit (Full-length lace-up front with side zip closure)",
            "colors": ["Pitch Obsidian Black"],
            "size_chart": {
                "36": "Foot Length: 22.2cm - 22.7cm",
                "37": "Foot Length: 22.8cm - 23.3cm",
                "38": "Foot Length: 23.4cm - 24.0cm",
                "39": "Foot Length: 24.1cm - 24.5cm"
            }
        }'
    ),
    (
        'img/products/product-33.jpg',
        14,
        'Winter Snow Boots',
        110.00,
        TRUE,
        85.00,
        'Heavy-duty waterproof insulated boots engineered for extreme cold weather. Lined with plush heat-trapping faux fur to ensure your feet stay completely dry and warm in deep snow.',
        '{
            "material": "Waterproof Ripstop Ballistic Nylon & Thermal Rubber Shell",
            "season": "Winter / Snow Season",
            "size_type": "shoe_size",
            "gender_target": "Unisex",
            "sole_material": "Multi-directional Lugged Ice-grip Rubber Outsole",
            "fit_type": "Insulated Heavy Boot Fit (Adjustable toggle collar & thick faux fur lining)",
            "waterproof": true,
            "colors": ["Charcoal Tundra Grey", "Carbon Snow Black"],
            "size_chart": {
                "38": "Foot Length: 23.4cm - 24.0cm",
                "39": "Foot Length: 24.1cm - 24.5cm",
                "40": "Foot Length: 24.6cm - 25.0cm",
                "41": "Foot Length: 25.1cm - 25.5cm",
                "42": "Foot Length: 25.6cm - 26.0cm"
            }
        }'
    ),
    (
        'img/products/product-34.jpg',
        14,
        'Over-the-Knee Suede Boots',
        85.00,
        FALSE,
        NULL,
        'Elegant and sultry tall boots that stretch comfortably over the knee. Features a sturdy block heel for all-day stability and a tie-back toggle detail to prevent slipping off the thigh.',
        '{
            "material": "Stretch-infused Micro-Faux Suede Upper",
            "season": "Autumn / Winter",
            "size_type": "shoe_size",
            "gender_target": "Women",
            "sole_material": "Smooth Synthetic Outsole with Stacked Block Heel (5.5cm)",
            "fit_type": "Thigh-High Slim Fit (Drawstring tie closure at upper collar)",
            "colors": ["Obsidian Black", "Muted Taupe Grey"],
            "size_chart": {
                "36": "Foot Length: 22.2cm - 22.7cm",
                "37": "Foot Length: 22.8cm - 23.3cm",
                "38": "Foot Length: 23.4cm - 24.0cm",
                "39": "Foot Length: 24.1cm - 24.5cm"
            }
        }'
    ),
    (
        'img/products/product-35.jpg',
        15,
        'Classic Aviator Sunglasses',
        25.00,
        FALSE,
        NULL,
        'Timeless metal frame aviator sunglasses providing 100% UV400 protection. The iconic teardrop shape and lightweight alloy frame offer a universally flattering look for sunny adventures.',
        '{
            "material": "Electroplated Nickel-free Metal Alloy Frame & Shatterproof Polycarbonate Lens",
            "season": "Year-round / Summer",
            "size_type": "accessories_size",
            "gender_target": "Unisex",
            "features": "UV400 Protection (Blocks 99% UVA/UVB), Polarized Anti-Glare Lens",
            "colors": ["Polished Gold Frame / Bottle Green Lens", "Brushed Silver Frame / Smoke Grey Lens"],
            "size_chart": {
                "Freesize": "Frame Width: 140mm, Lens Width: 58mm, Bridge Width: 14mm, Temple Length: 135mm"
            }
        }'
    ),
    (
        'img/products/product-36.jpg',
        15,
        'Retro Square Sunglasses',
        20.00,
        TRUE,
        15.00,
        'Thick-framed vintage-inspired square sunglasses that make a bold fashion statement. Handcrafted from durable cellulose acetate, they add an instant touch of Hollywood glamour to any outfit.',
        '{
            "material": "Handcut Cellulose Acetate Frame & Scratch-resistant Acrylic Lens",
            "season": "Summer / Beachwear",
            "size_type": "accessories_size",
            "gender_target": "Women / Unisex",
            "features": "UV400 Protection (Blocks 100% harmful rays), Bold Chunky Frame Profile",
            "colors": ["Earthy Tortoise Shell", "Glossy Obsidian Black"],
            "size_chart": {
                "Freesize": "Frame Width: 145mm, Lens Width: 52mm, Bridge Width: 19mm, Temple Length: 140mm"
            }
        }'
    ),
    (
        'img/products/product-37.jpg',
        15,
        'Round Steampunk Sunglasses',
        30.00,
        FALSE,
        NULL,
        'Unique and edgy round sunglasses featuring intricate metal mesh side shields and industrial spring hinges. A standout statement accessory for those looking to add an avant-garde, retro-futuristic vibe.',
        '{
            "material": "Corrosion-resistant Stainless Steel Frame & Metal Mesh Side Guards",
            "season": "All Seasons / Festivals",
            "size_type": "accessories_size",
            "gender_target": "Unisex",
            "features": "Removable Metal Mesh Side Shields, UV400 Protection, Mirrored Lens Options",
            "colors": ["Industrial Black Frame / Ruby Red Lens", "Antique Gold Frame / Shadow Black Lens"],
            "size_chart": {
                "Freesize": "Frame Width: 138mm, Lens Width: 48mm, Bridge Width: 22mm, Temple Length: 145mm"
            }
        }'
    ),
    (
        'img/products/product-38.jpg',
        16,
        'Minimalist Leather Watch',
        120.00,
        FALSE,
        NULL,
        'An elegant, understated quartz timepiece featuring an ultra-slim stainless steel case, a clean sunray dial, and a premium top-grain genuine leather strap. Perfect for the modern professional.',
        '{
            "material": "316L Surgical Stainless Steel Case & Top-Grain Calfskin Leather Strap",
            "season": "Year-round / Professional",
            "size_type": "accessories_size",
            "gender_target": "Men / Unisex",
            "features": "3ATM Water Resistant (Splashproof), Precision Japanese Miyota Quartz Movement",
            "colors": ["Rose Gold Case / Chestnut Brown Strap", "Polished Silver Case / Noir Black Strap"],
            "size_chart": {
                "Freesize": "Case Diameter: 40mm, Case Thickness: 7.2mm, Strap Width: 20mm, Max Wrist Fit: 215mm"
            }
        }'
    ),
    (
        'img/products/product-39.jpg',
        16,
        'Digital Sports Watch',
        55.00,
        TRUE,
        40.00,
        'Rugged, highly durable digital sports watch designed for demanding outdoor activities. Features a shock-resistant resin case, built-in stopwatch, daily alarm, automatic calendar, and a bright amber LED backlight.',
        '{
            "material": "Impact-resistant High-Density Polyurethane Resin Case & Ribbed Strap",
            "season": "All Seasons / Outdoor Sports",
            "size_type": "accessories_size",
            "gender_target": "Unisex",
            "features": "5ATM Water Resistant (Swimming-proof), Heavy-duty Shockproof structure, LED Backlight",
            "colors": ["Matte Stealth Black", "Military Olive Drab Green"],
            "size_chart": {
                "Freesize": "Case Diameter: 45mm, Case Thickness: 15mm, Band Width: 22mm, Wearable Range: 145mm-220mm"
            }
        }'
    );
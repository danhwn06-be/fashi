<h1 align="center">
  <img src="front/public/img/logo.png" alt="Fashi Logo" width="180"/>
  <br/>
  Fashi — Fashion E-Commerce Web App
</h1>

<p align="center">
  A full-stack fashion e-commerce web application built for academic learning purposes.
</p>

<p align="center">
  <!-- Tech Stack Badges -->
  <img src="https://img.shields.io/badge/-React-555555?style=for-the-badge&logo=react&logoColor=black&labelColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/-Vite-555555?style=for-the-badge&logo=vite&logoColor=white&labelColor=646CFF" alt="Vite"/>
  <img src="https://img.shields.io/badge/-Node.js-555555?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=5FA04E" alt="Node.js"/>
  <img src="https://img.shields.io/badge/-Express-555555?style=for-the-badge&logo=express&logoColor=white&labelColor=000000" alt="Express"/>
  <img src="https://img.shields.io/badge/-MySQL-555555?style=for-the-badge&logo=mysql&logoColor=white&labelColor=4479A1" alt="MySQL"/>
  <img src="https://img.shields.io/badge/-Google%20Gemini-555555?style=for-the-badge&logo=googlegemini&logoColor=white&labelColor=8E75B2" alt="Google Gemini AI"/>
  <img src="https://img.shields.io/badge/-JWT-555555?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=000000" alt="JWT"/>
  <img src="https://img.shields.io/badge/-Axios-555555?style=for-the-badge&logo=axios&logoColor=white&labelColor=5A29E4" alt="Axios"/>
  <img src="https://img.shields.io/badge/-Bootstrap-555555?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=7952B3" alt="Bootstrap"/>
</p>

---

> [!CAUTION]
> **⚠️ Academic Use Only — Non-Commercial**
>
> This project was developed **solely for educational and academic learning purposes** as part of an Advanced Web Design course. It is **NOT intended for commercial use** of any kind.
>
> The author takes **NO responsibility** for any consequences arising from unauthorized commercial use, redistribution, or misuse of this project. By using, cloning, or referencing this repository, you agree to use it strictly for learning and non-commercial purposes only.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🌟 Overview

**Fashi** is a full-stack fashion e-commerce web application that simulates a real-world online clothing store. Users can browse and filter products by category, view detailed product pages, manage their shopping cart, place orders with coupon discounts, and interact with an AI-powered virtual assistant chatbot (powered by Google Gemini AI) for product recommendations and store inquiries.

The project follows a **RESTful API** architecture with a clear separation between the frontend (React + Vite) and backend (Node.js + Express), connected to a MySQL relational database. Authentication is handled via **JWT (JSON Web Tokens)** with **bcryptjs** password hashing.

---

## 🛠 Tech Stack

### Frontend

| Badge | Technology | Role |
|-------|-----------|------|
| ![React](https://img.shields.io/badge/-React%2019-555555?style=flat-square&logo=react&logoColor=black&labelColor=61DAFB) | **React 19** | UI component library |
| ![Vite](https://img.shields.io/badge/-Vite-555555?style=flat-square&logo=vite&logoColor=white&labelColor=646CFF) | **Vite** | Build tool & dev server |
| ![React Router](https://img.shields.io/badge/-React%20Router-555555?style=flat-square&logo=reactrouter&logoColor=white&labelColor=CA4245) | **React Router DOM v7** | Client-side routing |
| ![Axios](https://img.shields.io/badge/-Axios-555555?style=flat-square&logo=axios&logoColor=white&labelColor=5A29E4) | **Axios** | HTTP client for API calls |
| ![React Markdown](https://img.shields.io/badge/-React%20Markdown-555555?style=flat-square&logo=markdown&logoColor=white&labelColor=000000) | **react-markdown** | Render AI chatbot Markdown responses |

### Backend

| Badge | Technology | Role |
|-------|-----------|------|
| ![Node.js](https://img.shields.io/badge/-Node.js-555555?style=flat-square&logo=nodedotjs&logoColor=white&labelColor=5FA04E) | **Node.js** | JavaScript runtime |
| ![Express](https://img.shields.io/badge/-Express-555555?style=flat-square&logo=express&logoColor=white&labelColor=000000) | **Express v5** | Web application framework |
| ![MySQL](https://img.shields.io/badge/-mysql2-555555?style=flat-square&logo=mysql&logoColor=white&labelColor=4479A1) | **mysql2** | MySQL database driver |
| ![Gemini](https://img.shields.io/badge/-Google%20Gemini-555555?style=flat-square&logo=googlegemini&logoColor=white&labelColor=8E75B2) | **@google/generative-ai** | AI chatbot integration |
| ![JWT](https://img.shields.io/badge/-jsonwebtoken-555555?style=flat-square&logo=jsonwebtokens&logoColor=white&labelColor=000000) | **jsonwebtoken** | Stateless authentication tokens |
| ![bcrypt](https://img.shields.io/badge/-bcryptjs-555555?style=flat-square&logo=letsencrypt&logoColor=white&labelColor=003A70) | **bcryptjs** | Password hashing |
| ![dotenv](https://img.shields.io/badge/-dotenv-555555?style=flat-square&logo=dotenv&logoColor=black&labelColor=ECD53F) | **dotenv** | Environment variable management |
| ![nodemon](https://img.shields.io/badge/-nodemon-555555?style=flat-square&logo=nodemon&logoColor=white&labelColor=76D04B) | **nodemon** | Auto-restart dev server |

### Database

| Badge | Technology | Role |
|-------|-----------|------|
| ![MySQL](https://img.shields.io/badge/-MySQL-555555?style=flat-square&logo=mysql&logoColor=white&labelColor=4479A1) | **MySQL** | Relational database |

---

## ✨ Features

- 🛍️ **Product Catalog** — Browse 30+ fashion products fetched dynamically from the database, organized into multiple categories (Clothing, Shoes, Accessories)
- 🔍 **Category Filtering** — Filter products by category and sub-category (Sweater, Jacket, T-Shirt, Jeans, Dress, Sneakers, Boots, Scarf, Hat, Backpack, Sunglasses, Watch) with URL-based navigation
- 📄 **Product Detail Page** — Full product page with image gallery, description, detailed specifications (material, size chart, colors), and size/color selection before adding to cart
- 🏷️ **Sale Badges & Pricing** — Products on sale are highlighted with a "Sale" badge and display both the original and discounted price
- 🔐 **User Authentication** — Secure registration and login system using **JWT tokens** and **bcryptjs** password hashing; protected routes for cart, checkout, and orders
- 🛒 **Shopping Cart** — Authenticated users can add products to cart, update quantities, remove items, and view a live order summary
- 🎟️ **Coupon & Discount System** — Apply coupon codes at checkout for percentage or fixed-amount discounts; coupons have expiry dates and usage limits
- 📦 **Order Placement** — Full checkout flow with shipping info form, coupon application, and order confirmation stored in the database
- 🤖 **AI Chatbot Assistant** — Real-time customer support powered by **Google Gemini AI**, context-aware of the live product catalog, with Markdown-rendered responses
- 💬 **Chat History** — Chatbot conversation history is persisted to the database per session
- 🗂️ **Collection Page** — Dedicated page showcasing the full product collection with advanced filtering
- 📱 **Responsive Design** — Mobile-friendly layout using Bootstrap grid system and custom CSS

---

## 📁 Project Structure

```
fashi/
├── back/                              # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                      # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js          # Register & login logic (JWT + bcrypt)
│   │   ├── cartController.js          # Cart CRUD business logic
│   │   ├── chatbotController.js       # Gemini AI chatbot handler
│   │   ├── couponController.js        # Coupon validation logic
│   │   ├── orderController.js         # Order placement & transaction logic
│   │   └── productController.js       # Product listing & detail logic
│   ├── database/
│   │   └── init.sql                   # Full database initialization script
│   ├── middleware/
│   │   └── authMiddleware.js          # JWT verification middleware
│   ├── models/
│   │   ├── Cart.js                    # Cart model (SQL queries)
│   │   ├── Coupon.js                  # Coupon model
│   │   ├── Message.js                 # Chat message model
│   │   ├── Order.js                   # Order & order_items model
│   │   ├── Product.js                 # Product model
│   │   └── User.js                    # User model
│   ├── routes/
│   │   ├── authRoutes.js              # /api/auth endpoints
│   │   ├── cartRoutes.js              # /api/cart endpoints (protected)
│   │   ├── chatbotRoutes.js           # /api/chatbot endpoints
│   │   ├── couponRoutes.js            # /api/coupons endpoints (protected)
│   │   ├── orderRoutes.js             # /api/orders endpoints (protected)
│   │   └── productRoutes.js           # /api/products endpoints
│   ├── .env                           # Environment variables (not committed)
│   ├── package.json
│   └── server.js                      # Express app entry point
│
└── front/                             # Frontend (React + Vite)
    ├── public/
    │   ├── css/                       # Bootstrap, Font Awesome, and theme CSS
    │   ├── img/                       # Static images and product photos
    │   └── js/                        # jQuery and plugin scripts
    ├── src/
    │   ├── components/
    │   │   ├── Breadcrumb.jsx         # Page breadcrumb navigation
    │   │   ├── CartItem.jsx           # Single cart item row component
    │   │   ├── CartSummary.jsx        # Cart total & order summary
    │   │   ├── Chatbot.jsx            # AI chatbot floating widget
    │   │   ├── Footer.jsx             # Site footer
    │   │   ├── Header.jsx             # Navigation header with auth state
    │   │   ├── PartnerLogo.jsx        # Partner brands section
    │   │   └── ProductCard.jsx        # Individual product card
    │   ├── hooks/
    │   │   └── useScrollToTop.js      # Custom hook: scroll to top on route change
    │   ├── pages/
    │   │   ├── Checkout.jsx           # Checkout form & order placement
    │   │   ├── Collection.jsx         # Full collection with filtering
    │   │   ├── Login.jsx              # Login page
    │   │   ├── ProductDetail.jsx      # Product detail page
    │   │   ├── Register.jsx           # Registration page
    │   │   ├── Shop.jsx               # Main shop / product listing page
    │   │   └── ShoppingCart.jsx       # Shopping cart page
    │   ├── App.jsx                    # Root component with routing
    │   └── main.jsx                   # React app entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🗄 Database Schema

The database (`fashi_db`) contains **8 tables**:

```sql
-- Product category hierarchy (supports parent/child categories)
CREATE TABLE categories (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Products catalog with rich details
CREATE TABLE products (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    image          VARCHAR(255) NOT NULL,
    category_id    INT NOT NULL,
    name           VARCHAR(255) NOT NULL,
    price          DECIMAL(10, 2) NOT NULL,
    isSale         BOOLEAN DEFAULT false,
    sale_price     DECIMAL(10, 2) DEFAULT NULL,
    description    TEXT,
    specifications JSON,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Registered users
CREATE TABLE users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50) NOT NULL,
    first_name VARCHAR(100),
    last_name  VARCHAR(100),
    address    VARCHAR(255),
    phone      VARCHAR(20),
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,   -- bcrypt hashed
    role       ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping cart items (per user)
CREATE TABLE cart_items (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT NOT NULL,
    product_id     INT NOT NULL,
    quantity       INT DEFAULT 1,
    selected_specs VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE
);

-- Placed orders
CREATE TABLE orders (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    address         VARCHAR(255) NOT NULL,
    phone           VARCHAR(20)  NOT NULL,
    email           VARCHAR(100) NOT NULL,
    total           DECIMAL(10, 2) NOT NULL,
    coupon_code     VARCHAR(50) DEFAULT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    status          ENUM('pending','processing','completed','cancelled') DEFAULT 'pending',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Line items belonging to an order
CREATE TABLE order_items (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    order_id       INT NOT NULL,
    product_id     INT NOT NULL,
    quantity       INT NOT NULL,
    price          DECIMAL(10, 2) NOT NULL,
    selected_specs VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Discount coupons
CREATE TABLE coupons (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    code           VARCHAR(50) UNIQUE NOT NULL,
    discount_type  ENUM('PERCENT', 'FIXED') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
    max_uses       INT DEFAULT NULL,
    used_count     INT DEFAULT 0,
    expiry_date    DATETIME DEFAULT NULL,
    is_active      BOOLEAN DEFAULT true
);

-- Chatbot conversation history
CREATE TABLE chat_messages (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    session_id   VARCHAR(100) NOT NULL,
    sender       ENUM('user', 'bot') NOT NULL,
    message_text TEXT NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Seed Data

The `init.sql` script seeds the database with:
- **3 top-level categories** (Clothing, Shoes, Accessories) with **13 sub-categories** (Sweater, Jacket, T-Shirt, Jeans, Dress, Sneakers, Boots, Scarf, Hat, Backpack, Sunglasses, Watch, Shoes)
- **30+ products** across all categories, each with detailed descriptions and JSON specifications (material, size chart, colors)
- **2 sample coupon codes**: `SUMMER20` (20% off) and `DISCOUNT10` ($10 off)
- **1 default test user** (`user@fashi.dev`)

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user account |
| `POST` | `/api/auth/login` | ❌ | Login and receive a JWT token |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | ❌ | Retrieve all products |
| `GET` | `/api/products/:id` | ❌ | Retrieve a single product by ID |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/cart` | ✅ JWT | Get current user's cart items |
| `POST` | `/api/cart` | ✅ JWT | Add a product to the cart |
| `DELETE` | `/api/cart/:id` | ✅ JWT | Remove a specific cart item |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/orders` | ✅ JWT | Place an order from the current cart |

### Coupons
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/coupons/validate` | ✅ JWT | Validate a coupon code |

### Chatbot
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/chatbot` | ❌ | Send a message and receive an AI reply |

**Chatbot request body:**
```json
{
  "session_id": "unique-session-id",
  "message": "Can you recommend a coat?"
}
```

**Login response example:**
```json
{
  "message": "Login successful!",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "username": "Dohan",
    "email": "user@fashi.dev",
    "role": "user",
    "first_name": null,
    "last_name": null,
    "address": null,
    "phone": null
  }
}
```

> [!NOTE]
> Protected routes (marked ✅ JWT) require the `Authorization: Bearer <token>` header. Tokens expire after **1 day**.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Environment Variables

Create a `.env` file inside the `back/` directory with the following variables:

```env
# Server
PORT=5000

# MySQL Database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=fashi_db
DB_PORT=3306

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

> **Tips:**
> - You can get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/).
> - Use a long, random string for `JWT_SECRET` (e.g., generated with `openssl rand -base64 64`).

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/fashi.git
cd fashi
```

**2. Initialize the database**

Log in to MySQL and run the initialization script:
```bash
mysql -u root -p < back/database/init.sql
```

**3. Install backend dependencies**
```bash
cd back
npm install
```

**4. Install frontend dependencies**
```bash
cd ../front
npm install
```

### Running the Application

**Start the backend server** (from the `back/` directory):
```bash
npm run dev
```
The API server will start at: `http://localhost:5000`

**Start the frontend dev server** (from the `front/` directory, in a separate terminal):
```bash
npm run dev
```
The web app will be available at: `http://localhost:5173`

**Test credentials (seeded by `init.sql`):**
```
Email:    user@fashi.dev
Password: 123456
```

---

## 📸 Screenshots

| Shop Page | Product Detail | AI Chatbot |
|-----------|---------------|------------|
| Product listing with category filters and sale highlights | Full product page with specs, size & color selector | Floating chatbot widget with Markdown-rendered AI replies |

| Login / Register | Shopping Cart | Checkout |
|-----------------|--------------|----------|
| JWT-authenticated user login and registration forms | Cart page with item list, quantity controls, and order summary | Checkout form with shipping info and coupon code support |

---

## 📄 License

This project is licensed for **educational and non-commercial use only**.

> This project was created as part of the **Advanced Web Design** course curriculum.  
> © 2026 — All rights reserved by the original author.  
> Unauthorized commercial use is strictly prohibited.

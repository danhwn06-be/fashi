const db = require('../config/db');

class Order {
    static async createOrder(user_id, firstName, lastName, address, phone, email, total, couponCode = null, discountAmount = 0) {
        return db.query(
            'INSERT INTO orders (user_id, first_name, last_name, address, phone, email, total, coupon_code, discount_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, firstName, lastName, address, phone, email, total, couponCode, discountAmount]
        );
    }

    static async addOrderItem(order_id, product_id, quantity, price, selected_specs) {
        return db.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price, selected_specs) VALUES (?, ?, ?, ?, ?)',
            [order_id, product_id, quantity, price, selected_specs]
        );
    }

    static async clearUserCart(user_id) {
        return db.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);
    }

    static async getUserOrders(user_id) {
        return db.query('SELECT id, total, status, created_at, discount_amount, coupon_code FROM orders WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
    }

    static async placeFullOrder(user_id, firstName, lastName, address, phone, email, total, cartItems, couponCode = null, discountAmount = 0) {
        const conn = await db.getConnection(); 
        try {
            await conn.beginTransaction(); 

            const [orderResult] = await conn.query(
                'INSERT INTO orders (user_id, first_name, last_name, address, phone, email, total, coupon_code, discount_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user_id, firstName, lastName, address, phone, email, total, couponCode, discountAmount]
            );
            const orderId = orderResult.insertId;

            for (let item of cartItems) {
                const priceToUse = item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price;
                const priceNum = parseFloat(String(priceToUse).replace(/[^0-9.-]+/g, ""));
                await conn.query(
                    'INSERT INTO order_items (order_id, product_id, quantity, price, selected_specs) VALUES (?, ?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, priceNum, item.selected_specs]
                );
            }

            await conn.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

            await conn.commit();
            return orderId;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
}

module.exports = Order; 
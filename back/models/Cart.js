const db = require('../config/db');

class Cart {
    static async getCartItems(user_id) {
        const query = `SELECT c.id as cart_id, p.id as product_id, p.name, p.price, p.isSale, p.sale_price, p.image, c.quantity, c.selected_specs
                    FROM cart_items c
                    JOIN products p ON c.product_id = p.id
                    WHERE c.user_id = ?`;
        return db.query(query, [user_id]);
    }

    static async checkItemExists(user_id, product_id, selected_specs = null) {
        return db.query('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ? AND selected_specs <=> ?', [user_id, product_id, selected_specs]);
    }

    static async updateQuantity(user_id, product_id, quantity, selected_specs = null) {
        return db.query('UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ? AND selected_specs <=> ?', [quantity, user_id, product_id, selected_specs]);
    }

    static async addItem(user_id, product_id, quantity, selected_specs = null) {
        return db.query('INSERT INTO cart_items (user_id, product_id, quantity, selected_specs) VALUES (?, ?, ?, ?)', [user_id, product_id, quantity, selected_specs]);
    }

    static async deleteItem(user_id, cart_id) {
        return db.query('DELETE FROM cart_items WHERE user_id = ? AND id = ?', [user_id, cart_id]);
    }
}

module.exports = Cart;
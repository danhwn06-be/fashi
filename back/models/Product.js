const db = require('../config/db');

class Product {
    static async getAll() {
        return db.query(`
            SELECT 
                p.id, p.image, p.name, p.price, p.isSale, p.sale_price, p.description, p.category_id, p.specifications,
                sub.name AS subcategory,
                parent.name AS category
            FROM products p
            LEFT JOIN categories sub ON p.category_id = sub.id
            LEFT JOIN categories parent ON sub.parent_id = parent.id
        `);
    }

    static async getById(id) {
        return db.query(`
            SELECT 
                p.id, p.image, p.name, p.price, p.isSale, p.sale_price, p.description, p.category_id, p.specifications,
                sub.name AS subcategory,
                parent.name AS category
            FROM products p
            LEFT JOIN categories sub ON p.category_id = sub.id
            LEFT JOIN categories parent ON sub.parent_id = parent.id
            WHERE p.id = ?
        `, [id]);
    }

    static async getFiltered(filters) {
        let sql = `
            SELECT 
                p.id, p.image, p.name, p.price, p.isSale, p.sale_price, p.description, p.category_id, p.specifications,
                sub.name AS subcategory,
                parent.name AS category
            FROM products p
            LEFT JOIN categories sub ON p.category_id = sub.id
            LEFT JOIN categories parent ON sub.parent_id = parent.id
            WHERE 1=1
        `;
        const params = [];

        if (filters.category) {
            sql += " AND parent.name = ?";
            params.push(filters.category);
        }
        if (filters.subcategory) {
            sql += " AND sub.name = ?";
            params.push(filters.subcategory);
        }
        if (filters.isSale !== null && filters.isSale !== undefined) {
            sql += " AND p.isSale = ?";
            params.push(filters.isSale ? 1 : 0);
        }

        return db.query(sql, params);
    }
}

module.exports = Product;
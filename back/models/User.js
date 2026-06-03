const db = require('../config/db');

class User {
    static async findByEmail(email) {
        return db.query('SELECT * FROM users WHERE email = ?', [email]);
    }

    static async findById(id) {
        return db.query('SELECT * FROM users WHERE id = ?', [id]);
    }

    static async create(username, first_name, last_name, address, phone, email, hashedPassword) {
        return db.query('INSERT INTO users (username, first_name, last_name, address, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, first_name, last_name, address, phone, email, hashedPassword]);
    }
}

module.exports = User;
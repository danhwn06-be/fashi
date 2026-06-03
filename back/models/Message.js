const db = require('../config/db');

class Message {
    static async saveMessage(session_id, sender, message_text) {
        return db.query(`
            INSERT INTO chat_messages (session_id, sender, message_text) VALUES (?, ?, ?)
        `, [session_id, sender, message_text]);
    }

    static async getHistoryBySession(session_id) {
        return db.query(`
            SELECT sender, message_text, created_at 
            FROM chat_messages 
            WHERE session_id = ? 
            ORDER BY created_at ASC
        `, [session_id]);
    }
}

module.exports = Message;
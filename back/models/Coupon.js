const db = require('../config/db');

class Coupon {
    static async getCouponByCode(code) {
        return db.query('SELECT * FROM coupons WHERE code = ? AND is_active = true', [code]);
    }

    static async getAllActiveCoupons() {
        return db.query('SELECT * FROM coupons WHERE is_active = true');
    }

    static async incrementUsedCount(code) {
        return db.query('UPDATE coupons SET used_count = used_count + 1 WHERE code = ?', [code]);
    }
}
module.exports = Coupon;

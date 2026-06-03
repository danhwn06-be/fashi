const Coupon = require('../models/Coupon');

exports.validateCoupon = async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ message: "Coupon code is required." });
    }

    try {
        const [coupons] = await Coupon.getCouponByCode(code);
        if (coupons.length === 0) {
            return res.status(400).json({ message: "Invalid or inactive coupon code." });
        }

        const coupon = coupons[0];

        if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
            return res.status(400).json({ message: "This coupon has expired." });
        }

        if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
            return res.status(400).json({ message: "This coupon has reached its usage limit." });
        }

        res.status(200).json({
            message: "Coupon applied successfully!",
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value
        });
    } catch (error) {
        console.error("Error validating coupon:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

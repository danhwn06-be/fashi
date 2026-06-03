const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Coupon = require('../models/Coupon');

exports.placeOrder = async (req, res) => {
    const user_id = req.user.id;
    const { firstName, lastName, address, phone, email, couponCode } = req.body;

    try {
        const [cartItems] = await Cart.getCartItems(user_id);
        
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Your cart is empty!" });
        }

        let total = 0;
        cartItems.forEach(item => {
            const priceToUse = item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price;
            const priceNum = parseFloat(String(priceToUse).replace(/[^0-9.-]+/g, ""));
            total += priceNum * item.quantity;
        });

        let discountAmount = 0;
        let finalCouponCode = null;

        if (couponCode) {
            const [coupons] = await Coupon.getCouponByCode(couponCode);
            if (coupons.length > 0) {
                const coupon = coupons[0];
                if (!coupon.expiry_date || new Date(coupon.expiry_date) > new Date()) {
                    if (!coupon.max_uses || coupon.used_count < coupon.max_uses) {
                        finalCouponCode = coupon.code;
                        if (coupon.discount_type === 'PERCENT') {
                            discountAmount = total * (parseFloat(coupon.discount_value) / 100);
                        } else if (coupon.discount_type === 'FIXED') {
                            discountAmount = parseFloat(coupon.discount_value);
                        }
                        
                        if (discountAmount > total) discountAmount = total;
                    }
                }
            }
        }

        const finalTotal = total - discountAmount;

        // Call the Transaction method
        const orderId = await Order.placeFullOrder(user_id, firstName, lastName, address, phone, email, finalTotal, cartItems, finalCouponCode, discountAmount);

        if (finalCouponCode) {
            await Coupon.incrementUsedCount(finalCouponCode);
        }

        res.status(200).json({ message: "Order placed successfully!", orderId });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error while placing order." });
    }
};
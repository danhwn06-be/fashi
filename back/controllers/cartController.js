const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [rows] = await Cart.getCartItems(user_id);
        res.json(rows);
    } catch (error) {
        console.error("Database connection error: ",error);
        res.status(500).json({ message: "Database connection error!" });
    }
};

exports.addToCart = async (req, res) => {
    const { product_id, quantity, selected_specs } = req.body;
    const user_id = req.user.id;
    try {
        let specsString = null;
        if (selected_specs && Object.keys(selected_specs).length > 0) {
            const sortedKeys = Object.keys(selected_specs).sort();
            const sortedSpecs = {};
            for (const key of sortedKeys) {
                sortedSpecs[key] = selected_specs[key];
            }
            specsString = JSON.stringify(sortedSpecs);
        }

        const [existing] = await Cart.checkItemExists(user_id, product_id, specsString);
        
        if (existing.length > 0) {
            await Cart.updateQuantity(user_id, product_id, quantity, specsString);
        } else {
            await Cart.addItem(user_id, product_id, quantity, specsString);
        }
        res.status(200).json({ message: "Cart updated successfully!" });
    } catch (error) {
        console.error("Server error updating cart:",error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

exports.deleteItem = async (req, res) => {
    const cart_id = req.params.id;
    const user_id = req.user.id;

    try {
        await Cart.deleteItem(user_id, cart_id);
        res.status(200).json({ message: "Item removed from cart successfully!"});
    } catch (error) {
        console.error("Server error deleting cart item:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
};
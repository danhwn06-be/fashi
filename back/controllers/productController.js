const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const [rows] = await Product.getAll();
        res.json(rows);
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Database connection error!" });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await Product.getById(id);

        if (rows.length === 0)
            return res.status(404).json({ message: "Product not found!" });

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Database connection error!" });
    }
};
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {username, first_name, last_name, address, phone, email, password } = req.body;
    try {
        const [existingUser] = await User.findByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email is already in use."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create(username, first_name, last_name, address, phone, email, hashedPassword);
        res.status(201).json({ message: "Registration successful. You can now log in." });
    } catch (error) {
        console.error("Registration error", error.message);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await User.findByEmail(email);
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid email or password."})
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password"})
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        res.status(200).json({
            message: "Login successful!",
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(" Login error:", error.message);
        return res.status(500).json({ message: "Internal server error!"});
    }
};
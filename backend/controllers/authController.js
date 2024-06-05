const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// サインアップ
const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).send({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(201).send({ message: 'User created', user: user._id });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).send({ error: 'Server error' });
    }
};

// ログイン
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).send({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ message: 'Logged in', user: user._id });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).send({ error: 'Server error' });
    }
};

module.exports = { signup, login };

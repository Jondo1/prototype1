const express = require('express');
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send({ message: 'You have access' });
});

module.exports = router;

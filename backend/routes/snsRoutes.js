const express = require('express');
const { registerSNS, getSNSAccounts, deleteSNSAccount } = require('../controllers/snsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authMiddleware, registerSNS);
router.get('/accounts', authMiddleware, getSNSAccounts);
router.delete('/delete/:sns', authMiddleware, deleteSNSAccount);

module.exports = router;

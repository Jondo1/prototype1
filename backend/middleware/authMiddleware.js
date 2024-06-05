const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.protect = async (req, res, next) => {
    let token;
    console.log(req.headers.authorization,"token")
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token,"soumenmaity8537964101");
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};
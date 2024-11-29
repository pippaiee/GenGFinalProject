// USER TOKEN VERIFICATION

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({ message: 'Access denied. No token provided'});
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; //Tambahkan data pengguna ke request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.'});
    }
};

module.exports = verifyToken;
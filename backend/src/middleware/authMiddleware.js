const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Lấy token từ header Authorization (Bearer token)
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'No token provided, authorization denied',
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            message: 'Invalid token',
            success: false,
        });
    }
};

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Lấy token từ header Authorization (Bearer token)
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided, authorization denied',
            success: false,
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Gắn thông tin user vào req (thường là { id: user._id })
        next(); // Chuyển tiếp request nếu token hợp lệ
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
            success: false,
        });
    }
};

module.exports = authMiddleware;
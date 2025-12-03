import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
        if (!token) return res.status(401).json({ success: false, error: { code: 'AUTH_ERROR', message: 'No token provided' } });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, role: payload.role };
        next();
    } catch (e) {
        res.status(401).json({ success: false, error: { code: 'AUTH_ERROR', message: 'Invalid token' } });
    }
};
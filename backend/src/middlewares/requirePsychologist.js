import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requirePsychologist = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: { code: 'AUTH_ERROR', message: 'No token provided' } });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: { code: 'AUTH_ERROR', message: 'User not found' } });
        }

        if (user.role !== 'psychologist') {
            return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Psychologist access required' } });
        }

        req.user = { id: user._id, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: { code: 'AUTH_ERROR', message: 'Invalid token' } });
    }
};

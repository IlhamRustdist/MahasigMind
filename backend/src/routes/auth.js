import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User.js';
import { validate } from '../middlewares/validate.js';
import auth from '../middlewares/auth.js';
import passport from '../config/passport.js';

const router = express.Router();

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

// Register
router.post('/register', validate(registerSchema), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, error: { code: 'AUTH_ERROR', message: 'Email already registered' } });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, passwordHash });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }
        });
    } catch (e) {
        next(e);
    }
});

// Login
router.post('/login', validate(loginSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: { code: 'AUTH_ERROR', message: 'Invalid credentials' } });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: { code: 'AUTH_ERROR', message: 'Invalid credentials' } });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }
        });
    } catch (e) {
        next(e);
    }
});

// Get Current User
router.get('/me', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        res.json({ success: true, data: user });
    } catch (e) {
        next(e);
    }
});

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign(
            { id: req.user._id, role: req.user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_ORIGIN || 'http://localhost:5173'}/auth/callback?token=${token}`);
    }
);

export default router;

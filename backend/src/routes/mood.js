import express from 'express';
import { z } from 'zod';
import Mood from '../models/MoodEntry.js'; // Ensure extension is used if type: module
import auth from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

const moodSchema = z.object({
    mood: z.string().min(1, "Mood is required"),
    note: z.string().optional()
});

// Create mood entry
router.post('/', auth, validate(moodSchema), async (req, res, next) => {
    try {
        const { mood, note } = req.body;
        const entry = await Mood.create({
            user: req.user.id,
            mood,
            note
        });
        res.status(201).json({ success: true, data: entry });
    } catch (e) {
        next(e);
    }
});

// Get user's mood history
router.get('/me', auth, async (req, res, next) => {
    try {
        const data = await Mood.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(100);
        res.json({ success: true, data });
    } catch (e) {
        next(e);
    }
});

export default router;
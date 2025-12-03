import express from 'express';
import { z } from 'zod';
import Journal from '../models/JournalEntry.js';
import auth from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

const journalSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    mood: z.string().optional(),
    category: z.enum(['Kuliah', 'Keluarga', 'Relasi', 'Keuangan', 'Lainnya']).optional()
});

// Create journal
router.post('/', auth, validate(journalSchema), async (req, res, next) => {
    try {
        const { title, content, mood, category } = req.body;
        const entry = await Journal.create({
            user: req.user.id,
            title,
            content,
            mood,
            category
        });
        res.status(201).json({ success: true, data: entry });
    } catch (e) {
        next(e);
    }
});

// Get all journals (with pagination)
router.get('/', auth, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const data = await Journal.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Journal.countDocuments({ user: req.user.id });

        res.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (e) {
        next(e);
    }
});

// Get single journal
router.get('/:id', auth, async (req, res, next) => {
    try {
        const entry = await Journal.findOne({ _id: req.params.id, user: req.user.id });
        if (!entry) {
            const error = new Error('Journal not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, data: entry });
    } catch (e) {
        next(e);
    }
});

// Delete journal
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const entry = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!entry) {
            const error = new Error('Journal not found');
            error.status = 404;
            throw error;
        }
        res.json({ success: true, message: "Journal deleted" });
    } catch (e) {
        next(e);
    }
});

export default router;

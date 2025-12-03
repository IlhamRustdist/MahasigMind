import express from 'express';
import { requirePsychologist } from '../middlewares/requirePsychologist.js';
import ConsultationRequest from '../models/ConsultationRequest.js';
import MoodEntry from '../models/MoodEntry.js';

const router = express.Router();

// GET /api/psychologist/consultations - List all consultation requests
router.get('/consultations', requirePsychologist, async (req, res, next) => {
    try {
        const consultations = await ConsultationRequest.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({ success: true, data: consultations });
    } catch (err) {
        next(err);
    }
});

// PATCH /api/psychologist/consultations/:id - Update consultation status
router.patch('/consultations/:id', requirePsychologist, async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['new', 'in_progress', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'Invalid status value' }
            });
        }

        const consultation = await ConsultationRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user', 'name email');

        if (!consultation) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Consultation not found' }
            });
        }

        res.json({ success: true, data: consultation });
    } catch (err) {
        next(err);
    }
});

// GET /api/psychologist/mood-summary - Aggregate mood data
router.get('/mood-summary', requirePsychologist, async (req, res, next) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const moods = await MoodEntry.find({ createdAt: { $gte: oneWeekAgo } });

        const moodCounts = moods.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});

        const totalMoods = moods.length;

        res.json({
            success: true,
            data: {
                period: 'last_7_days',
                total: totalMoods,
                breakdown: moodCounts
            }
        });
    } catch (err) {
        next(err);
    }
});

export default router;

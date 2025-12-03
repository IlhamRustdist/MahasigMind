import express from 'express';
import { z } from 'zod';
import Consultation from '../models/ConsultationRequest.js';
import auth from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

const consultationSchema = z.object({
    category: z.enum(['Akademik', 'Relasi', 'Finansial', 'Pribadi', 'Lainnya']),
    preferredTime: z.string().min(1, "Preferred time is required"),
    description: z.string().min(1, "Description is required")
});

// Create consultation request
router.post('/', auth, validate(consultationSchema), async (req, res, next) => {
    try {
        const { category, preferredTime, description } = req.body;
        const request = await Consultation.create({
            user: req.user.id,
            category,
            preferredTime,
            description
        });
        res.status(201).json({ success: true, data: request });
    } catch (e) {
        next(e);
    }
});

// Get user's requests
router.get('/', auth, async (req, res, next) => {
    try {
        const data = await Consultation.find({ user: req.user.id })
            .sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (e) {
        next(e);
    }
});

export default router;

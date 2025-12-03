import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum: ['Akademik', 'Relasi', 'Finansial', 'Pribadi', 'Lainnya'],
        required: true
    },
    preferredTime: { type: String, required: true }, // e.g., "Pagi (08-12)", "Siang (13-16)"
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'completed'],
        default: 'new'
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Consultation', consultationSchema);

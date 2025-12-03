import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: String },
    category: {
        type: String,
        enum: ['Kuliah', 'Keluarga', 'Relasi', 'Keuangan', 'Lainnya'],
        default: 'Lainnya'
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Journal', journalSchema);

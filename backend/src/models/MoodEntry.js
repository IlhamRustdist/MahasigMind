import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mood: { type: String, required: true }, // Removed enum restriction for flexibility or keep it if needed. Plan didn't specify enum change but UI has specific emojis. I'll keep it simple string for now to match UI IDs or labels.
    note: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MoodEntry', MoodSchema);

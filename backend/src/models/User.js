import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String }, // Optional for Google users
    googleId: { type: String, unique: true, sparse: true },
    photoUrl: String,
    role: { type: String, enum: ['student', 'psychologist', 'admin'], default: 'student' },
    lastLoginAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
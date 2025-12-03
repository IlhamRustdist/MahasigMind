const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
psychologist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
datetime: { type: Date, required: true },
status: { type: String, enum: ['pending','confirmed','done','cancelled'], default: 'pending' },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
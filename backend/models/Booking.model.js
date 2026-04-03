const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    service: { type: String, required: true },
    packageType: { type: String, default: '' },
    timeSlot: { type: String, default: '' },
    date: { type: Date },
    notes: { type: String, default: '' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
    paymentMethod: { type: String, enum: ['offline', 'online'], default: 'offline' },
    paymentAmount: { type: Number, default: 0 },
    paymentId: { type: String, default: '' },
    amount: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)

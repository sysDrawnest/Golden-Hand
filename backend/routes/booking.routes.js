const express = require('express')
const Booking = require('../models/Booking.model')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')
const { sendBookingConfirmation } = require('../config/mailer')

const router = express.Router()

// POST /api/bookings/create — Create booking (auth required)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { name, phone, address, service, packageType, timeSlot, date, notes, message, paymentMethod, paymentAmount } = req.body
        if (!name || !phone || !service) {
            return res.status(400).json({ message: 'Name, phone, and service are required.' })
        }
        const booking = await Booking.create({
            userId: req.user._id, name, phone, address, service,
            packageType: packageType || '', timeSlot: timeSlot || '',
            date: date ? new Date(date) : undefined,
            notes: notes || message || '', message: message || '',
            paymentMethod: paymentMethod || 'offline',
            paymentAmount: paymentAmount || 0,
        })
        // Send confirmation email asynchronously (don't block response)
        sendBookingConfirmation(booking, req.user.email).catch(console.error)
        res.status(201).json({ message: 'Booking created successfully.', booking })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Failed to create booking.' })
    }
})

// GET /api/bookings/user — Current user's bookings
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 })
        res.json(bookings)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch bookings.' })
    }
})

// GET /api/bookings/all — All bookings (admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('userId', 'name email').sort({ createdAt: -1 })
        res.json(bookings)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch bookings.' })
    }
})

// PUT /api/bookings/update-status — Update booking status (admin only)
router.put('/update-status', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { bookingId, status } = req.body
        const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true })
        if (!booking) return res.status(404).json({ message: 'Booking not found.' })
        res.json({ message: 'Status updated.', booking })
    } catch (err) {
        res.status(500).json({ message: 'Failed to update booking.' })
    }
})

// DELETE /api/bookings/:id — Delete booking (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)
        if (!booking) return res.status(404).json({ message: 'Booking not found.' })
        res.json({ message: 'Booking deleted successfully.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete booking.' })
    }
})

module.exports = router

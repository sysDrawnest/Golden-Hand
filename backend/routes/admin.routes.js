const express = require('express')
const User = require('../models/User.model')
const Booking = require('../models/Booking.model')
const Payment = require('../models/Payment.model')
const ContactMessage = require('../models/ContactMessage.model')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')

const router = express.Router()

// All admin routes require auth + admin role
router.use(authMiddleware, adminMiddleware)

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
    try {
        const [totalUsers, totalBookings, newMessages, payments] = await Promise.all([
            User.countDocuments(),
            Booking.countDocuments(),
            ContactMessage.countDocuments({ status: 'new' }),
            Payment.find({ status: 'captured' }),
        ])
        const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0)
        res.json({ totalUsers, totalBookings, newMessages, totalRevenue })
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch stats.' })
    }
})



// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 })
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users.' })
    }
})



// PATCH /api/admin/messages/:id/read
router.patch('/messages/:id/read', async (req, res) => {
    try {
        const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true })
        res.json(msg)
    } catch (err) {
        res.status(500).json({ message: 'Failed to update message.' })
    }
})

// DELETE /api/admin/messages/:id
router.get('/messages/:id', async (req, res) => { // Using GET here as a placeholder if needed, but let's use DELETE
    try {
        await ContactMessage.findByIdAndDelete(req.params.id)
        res.json({ message: 'Message deleted.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete message.' })
    }
})
router.delete('/messages/:id', async (req, res) => {
    try {
        await ContactMessage.findByIdAndDelete(req.params.id)
        res.json({ message: 'Message deleted.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete message.' })
    }
})

// ─── User Management ─────────────────────────────────────────────────────────

// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: 'User not found.' })
        user.isActive = !user.isActive
        await user.save()
        res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}.`, user })
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user status.' })
    }
})

// PUT /api/admin/users/:id/progress
router.put('/users/:id/progress', async (req, res) => {
    try {
        const { trainingProgress, trainingStatus, certificateIssued } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        if (trainingProgress !== undefined) user.trainingProgress = trainingProgress;
        if (trainingStatus !== undefined) user.trainingStatus = trainingStatus;
        if (certificateIssued !== undefined) user.certificateIssued = certificateIssued;

        await user.save();
        res.json({ message: 'User progress updated successfully.', user });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user progress.', error: err.message });
    }
})

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ message: 'User not found.' })
        res.json({ message: 'User deleted successfully.' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user.' })
    }
})

module.exports = router

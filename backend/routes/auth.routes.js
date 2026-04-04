const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const authMiddleware = require('../middleware/auth.middleware')
const { sendWelcomeEmail } = require('../config/mailer')

const router = express.Router()

const signToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required.' })
        }
        const existing = await User.findOne({ email })
        if (existing) return res.status(409).json({ message: 'Email already registered.' })

        const user = await User.create({ name, email, phone, password })

        // Dispatch Welcome Email
        sendWelcomeEmail(user).catch(console.error)

        const token = signToken(user._id)
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, trainingProgress: user.trainingProgress, trainingStatus: user.trainingStatus, certificateIssued: user.certificateIssued }
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: err.message || 'Registration failed.' })
    }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

        const user = await User.findOne({ email }).select('+password')
        if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid credentials.' })

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' })

        const token = signToken(user._id)
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, trainingProgress: user.trainingProgress, trainingStatus: user.trainingStatus, certificateIssued: user.certificateIssued }
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: err.message || 'Registration failed.' })
    }
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        user: { id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, role: req.user.role, trainingProgress: req.user.trainingProgress, trainingStatus: req.user.trainingStatus, certificateIssued: req.user.certificateIssued }
    })
})

// PUT /api/auth/me - Update user profile
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const { name, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone },
            { new: true, runValidators: true }
        );
        res.json({
            user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone, role: updatedUser.role, trainingProgress: updatedUser.trainingProgress, trainingStatus: updatedUser.trainingStatus, certificateIssued: updatedUser.certificateIssued }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Profile update failed.' });
    }
})

module.exports = router

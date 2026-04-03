const express = require('express')
const ContactMessage = require('../models/ContactMessage.model')
const { sendContactReply } = require('../config/mailer')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')

const router = express.Router()

// POST /api/contact/send — Save contact message and send email reply
router.post('/send', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' })
        }
        const contactMsg = await ContactMessage.create({ name, email, phone: phone || '', subject: subject || 'General Inquiry', message })
        // Send auto-reply email asynchronously
        sendContactReply(contactMsg).catch(console.error)
        res.status(201).json({ message: 'Message received! We\'ll get back to you within 24 hours.' })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Failed to send message.' })
    }
})

// GET /api/contact/all — All messages (admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 })
        res.json(messages)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch messages.' })
    }
})

module.exports = router

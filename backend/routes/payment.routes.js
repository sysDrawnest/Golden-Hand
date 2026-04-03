const express = require('express')
const crypto = require('crypto')
const Razorpay = require('razorpay')
const Payment = require('../models/Payment.model')
const Booking = require('../models/Booking.model')
const authMiddleware = require('../middleware/auth.middleware')
const { sendPaymentReceipt } = require('../config/mailer')

const router = express.Router()

const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// POST /api/payment/create-order
router.post('/create-order', authMiddleware, async (req, res) => {
    try {
        const { amount, bookingId } = req.body // amount in paise (rupees * 100)
        if (!amount || !bookingId) {
            return res.status(400).json({ message: 'Amount and bookingId are required.' })
        }
        const razorpay = getRazorpay()
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // convert to paise
            currency: 'INR',
            receipt: `receipt_${bookingId}_${Date.now()}`,
        })
        // Save the payment record
        await Payment.create({
            bookingId,
            userId: req.user._id,
            razorpayOrderId: order.id,
            amount: amount,
        })
        res.json({ orderId: order.id, amount: order.amount, currency: order.currency })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Failed to create Razorpay order.' })
    }
})

// POST /api/payment/verify
router.post('/verify', authMiddleware, async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body
        // Verify HMAC-SHA256 signature
        const body = `${razorpayOrderId}|${razorpayPaymentId}`
        const expectedSig = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex')

        if (expectedSig !== razorpaySignature) {
            return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' })
        }

        // Update Payment record
        await Payment.findOneAndUpdate(
            { razorpayOrderId },
            { razorpayPaymentId, razorpaySignature, status: 'captured' }
        )
        // Update Booking record
        const booking = await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid', status: 'confirmed', paymentId: razorpayPaymentId }, { new: true })

        // Send payment receipt
        if (booking && req.user && req.user.email) {
            sendPaymentReceipt(booking, booking.paymentAmount || '4500', req.user.email, razorpayPaymentId).catch(console.error)
        }

        res.json({ message: 'Payment verified successfully.' })
    } catch (err) {
        res.status(500).json({ message: err.message || 'Payment verification failed.' })
    }
})

module.exports = router

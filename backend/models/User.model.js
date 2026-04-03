const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2 },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    phone: { type: String, required: [true, 'Phone is required'], match: [/^[6-9]\d{9}$/, 'Invalid phone number'] },
    password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    trainingProgress: { type: Number, default: 0, min: 0, max: 14 },
    trainingStatus: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    certificateIssued: { type: Boolean, default: false }
}, { timestamps: true })

// Hash password before save
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 12)
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)

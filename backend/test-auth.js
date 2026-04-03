require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User.model')
const bcrypt = require('bcryptjs')

async function test() {
    await mongoose.connect(process.env.MONGODB_URI)
    const user = await User.findOne({ email: 'admin@goldenhands.com' }).select('+password')
    if (!user) {
        console.log('User not found')
    } else {
        console.log('User found:', user.email)
        console.log('Role:', user.role)
        console.log('Is Active:', user.isActive)
        const isMatch = await bcrypt.compare('Admin@1234', user.password)
        console.log('Password match:', isMatch)
    }
    await mongoose.disconnect()
}
test()

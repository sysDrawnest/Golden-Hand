/**
 * Seed Admin Script
 * Run with: npm run seed-admin
 * Creates a default admin user if one doesn't exist.
 */
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User.model')

const ADMIN = {
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@goldenhands.com',
    phone: '9999999999',
    password: process.env.ADMIN_PASS || 'Admin@1234',
    role: 'admin',
}

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const existing = await User.findOne({ email: ADMIN.email })
    if (existing) {
        console.log(`⚠️  Admin already exists: ${ADMIN.email}`)
    } else {
        await User.create(ADMIN)
        console.log(`✅ Admin created: ${ADMIN.email} / ${ADMIN.password}`)
    }

    await mongoose.disconnect()
    process.exit(0)
}

seed().catch(err => {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
})

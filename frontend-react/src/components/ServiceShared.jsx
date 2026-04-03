import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Slideshow({ slides }) {
    const [active, setActive] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setActive(c => (c + 1) % slides.length), 5000)
        return () => clearInterval(t)
    }, [slides.length])
    return (
        <div className="slideshow-container">
            {slides.map((slide, i) => (
                <div key={i} className={`slide ${i === active ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.bg})` }}>
                    <div className="slide-overlay">
                        <h3 className="text-2xl font-bold">{slide.title}</h3>
                        <p className="text-gray-200">{slide.sub}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function BookingForm({ serviceLabel }) {
    const { user } = useAuth()
    const [form, setForm] = useState({ name: user?.name || '', address: '', service: '', phone: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState(null)

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    const handleSubmit = async e => {
        e.preventDefault()
        if (!user) return setMsg({ type: 'error', text: 'Please login first to book a service.' })
        setLoading(true)
        try {
            await api.post('/bookings/create', { ...form, date: new Date().toISOString().split('T')[0] })
            setMsg({ type: 'success', text: '✅ Booking submitted! We\'ll contact you within 24 hours.' })
            setForm({ name: user?.name || '', address: '', service: '', phone: '', message: '' })
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Booking failed. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="book-service" className="py-16 bg-broto-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">Book Your <span className="text-broto-yellow">{serviceLabel}</span></h2>
                    <p className="text-gray-400 text-lg">Fill out the form below and we'll contact you to schedule</p>
                </div>
                {msg && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${msg.type === 'success' ? 'bg-green-900/30 border border-green-500 text-green-400' : 'bg-red-900/30 border border-red-500 text-red-400'}`}>
                        {msg.text}
                    </div>
                )}
                <div className="bg-broto-black p-8 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                                <input type="text" name="name" required value={form.name} onChange={handleChange} className="form-input w-full text-white p-4 rounded-xl focus:outline-none" placeholder="Full Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                                <input type="text" name="address" required value={form.address} onChange={handleChange} className="form-input w-full text-white p-4 rounded-xl focus:outline-none" placeholder="Your pickup address" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Select Service *</label>
                                <select name="service" required value={form.service} onChange={handleChange} className="form-input w-full text-white p-4 rounded-xl focus:outline-none">
                                    <option value="">Choose a service</option>
                                    <option value="package-1">Package 1 (10 Hrs) — ₹3000</option>
                                    <option value="package-2">Package 2 (15 Hrs) — ₹3500</option>
                                    <option value="package-3">Package 3 (20 Hrs) — ₹4500</option>
                                    <option value="package-4">Package 4 (24 Hrs) — ₹5000</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                                <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                                    onInput={e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }}
                                    className="form-input w-full text-white p-4 rounded-xl focus:outline-none" placeholder="10-digit number" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Write Something (Optional)</label>
                            <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="form-input w-full text-white p-4 rounded-xl focus:outline-none" placeholder="Any specific requirements or questions..." />
                        </div>
                        <button type="submit" disabled={loading} className="submit-btn w-full text-broto-black font-bold text-lg p-4 rounded-xl transition duration-300 disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Book Service Now'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export { Slideshow, BookingForm }

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, AlertTriangle, HelpCircle, CheckCircle, XCircle } from 'lucide-react'
import api from '../services/api'
import ParticleCanvas from '../components/home/ParticleCanvas'

const validators = {
    name: v => v.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(v.trim()),
    phone: v => v === '' || /^[6-9]\d{9}$/.test(v),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: v => v.trim().length >= 10,
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const validate = (field, value) => validators[field] ? validators[field](value) : true

    const handleChange = e => {
        const { name, value } = e.target
        setForm(p => ({ ...p, [name]: value }))
        if (errors[name] !== undefined) {
            setErrors(p => ({ ...p, [name]: !validate(name, value) }))
        }
    }

    const handleBlur = e => {
        const { name, value } = e.target
        setErrors(p => ({ ...p, [name]: !validate(name, value) }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors = {}
        let valid = true
            ;['name', 'email', 'phone', 'message'].forEach(f => {
                const ok = validate(f, form[f])
                if (!ok) { newErrors[f] = true; valid = false }
            })
        setErrors(newErrors)
        if (!valid) return

        setLoading(true)
        try {
            await api.post('/contact/send', form)
            showToast('success', 'Thank you for your message! We will get back to you within 24 hours.')
            setForm({ name: '', email: '', phone: '', subject: '', message: '' })
            setErrors({})
        } catch {
            showToast('error', 'Failed to send message. Please try again or call us directly.')
        } finally {
            setLoading(false)
        }
    }

    const showToast = (type, text) => {
        setToast({ type, text })
        setTimeout(() => setToast(null), 5000)
    }

    return (
        <div className="bg-broto-black text-white">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl max-w-sm ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white flex items-center gap-2`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                    <span className="text-sm">{toast.text}</span>
                </div>
            )}

            {/* Hero */}
            <ParticleCanvas />
            <section className="contact-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-broto-yellow/10 rounded-full floating" />
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-broto-yellow/5 rounded-full floating" style={{ animationDelay: '1s' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">Get In <span className="text-broto-yellow">Touch</span></h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">Ready to start your driving journey? Contact us today and let's get you on the road to independence.</p>
                        <div className="flex justify-center space-x-4 flex-wrap gap-4">
                            <a href="#contact-form" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition duration-300 transform hover:scale-105">Send Message</a>
                            <a href="tel:+919040040165" className="border border-broto-yellow text-broto-yellow font-bold text-lg px-8 py-3 rounded-xl hover:bg-broto-yellow hover:text-broto-black transition duration-300">Call Now</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">How Can We <span className="text-broto-yellow">Help You?</span></h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">We're here to answer any questions about our driving courses, packages, or scheduling.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { Icon: Phone, title: 'Call Us', desc: 'Speak directly with our team during business hours', link: 'tel:+919040040165', linkText: '+91 9040040165' },
                            { Icon: Mail, title: 'Email Us', desc: 'Send us an email and we\'ll respond within 24 hours', link: 'mailto:goldenhandsdrivingschool@gmail.com', linkText: 'goldenhandsdrivingschool@gmail.com' },
                            { Icon: MapPin, title: 'Visit Us', desc: 'Come see us at our training center in Bhubaneswar', link: null, linkText: 'Satyavihar, Bhubaneswar' },
                        ].map(({ Icon, title, desc, link, linkText }, i) => (
                            <div key={i} className="info-card p-8 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-broto-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6 pulse-icon">
                                    <Icon className="w-8 h-8 text-broto-yellow" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{title}</h3>
                                <p className="text-gray-400 mb-4">{desc}</p>
                                {link ? <a href={link} className="text-broto-yellow font-semibold text-lg hover:underline break-all">{linkText}</a>
                                    : <p className="text-broto-yellow font-semibold">{linkText}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form + Map */}
            <section className="py-16 bg-broto-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="contact-form-bg p-8 rounded-2xl">
                            <h2 className="text-3xl font-extrabold mb-2">Send Us a <span className="text-broto-yellow">Message</span></h2>
                            <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you soon</p>
                            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { id: 'name', label: 'Full Name *', type: 'text', errorMsg: 'Please enter a valid name (min 2 chars, letters only)' },
                                        { id: 'email', label: 'Email Address *', type: 'email', errorMsg: 'Please enter a valid email address' },
                                    ].map(field => (
                                        <div key={field.id} className="relative">
                                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                                            <input type={field.type} id={field.id} name={field.id} required value={form[field.id]}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className={`contact-input validation-input w-full text-white p-4 rounded-xl focus:outline-none ${errors[field.id] ? 'error' : form[field.id] ? 'success' : ''}`} />
                                            {errors[field.id] && <p className="text-xs text-red-400 mt-1">{field.errorMsg}</p>}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                                            onInput={e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }}
                                            className={`contact-input validation-input w-full text-white p-4 rounded-xl focus:outline-none ${errors.phone ? 'error' : ''}`} />
                                        {errors.phone && <p className="text-xs text-red-400 mt-1">Please enter a valid 10-digit number</p>}
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                        <select id="subject" name="subject" value={form.subject} onChange={handleChange}
                                            className="contact-input validation-input w-full text-white p-4 rounded-xl focus:outline-none">
                                            <option value="">Select a subject</option>
                                            <option value="driving-lessons">Driving Lessons</option>
                                            <option value="license-assistance">License Assistance</option>
                                            <option value="car-consultation">Car Buying Consultation</option>
                                            <option value="rto-services">RTO Services</option>
                                            <option value="general-inquiry">General Inquiry</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message *</label>
                                    <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} onBlur={handleBlur}
                                        className={`contact-input validation-input w-full text-white p-4 rounded-xl focus:outline-none ${errors.message ? 'error' : form.message.length >= 10 ? 'success' : ''}`}
                                        placeholder="Tell us how we can help you..." />
                                    {errors.message && <p className="text-xs text-red-400 mt-1">Please enter at least 10 characters</p>}
                                </div>
                                <button type="submit" disabled={loading} className="submit-btn w-full text-broto-black font-bold text-lg p-4 rounded-xl transition duration-300 disabled:opacity-50">
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Map + Hours */}
                        <div className="space-y-8">
                            <div className="map-container">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.647521366209!2d85.8220112753378!3d20.29601438133317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1698765432101!5m2!1sen!2sin"
                                    width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Golden Hands Location" />
                            </div>
                            <div className="contact-form-bg p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-broto-yellow" /> Business Hours</h3>
                                <ul className="space-y-3">
                                    {[['Monday - Friday', '7:00 AM - 9:00 PM'], ['Saturday', '7:00 AM - 8:00 PM'], ['Sunday', '8:00 AM - 6:00 PM']].map(([day, hours]) => (
                                        <li key={day} className="flex justify-between"><span className="text-gray-400">{day}</span><span className="font-medium">{hours}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="contact-form-bg p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-broto-red" /> Emergency Contact</h3>
                                <p className="text-gray-400 mb-2">For urgent matters outside business hours</p>
                                <a href="tel:+919040040165" className="text-broto-yellow font-semibold text-lg">+91 9040040165</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-broto-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4">Frequently Asked <span className="text-broto-yellow">Questions</span></h2>
                        <p className="text-gray-400 text-lg">Quick answers to common questions about our services</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { q: 'How quickly can I get my driving license?', a: 'With our comprehensive training and RTO assistance, most students obtain their license within 4-6 weeks of starting lessons.' },
                            { q: 'Do you provide pick-up and drop services?', a: 'Yes, we offer convenient pick-up and drop services for Package 2, 3, and 4. Check our fees section for details.' },
                            { q: 'What documents do I need to start driving lessons?', a: 'You\'ll need a valid learner\'s license, address proof, age proof, and passport-sized photographs. We can assist in obtaining a learner\'s license.' },
                        ].map((faq, i) => (
                            <div key={i} className="contact-form-bg p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-broto-yellow" /> {faq.q}</h3>
                                <p className="text-gray-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-broto-black text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold mb-6">Ready to Start Your <span className="text-broto-yellow">Driving Journey?</span></h2>
                    <p className="text-gray-400 text-lg mb-8">Don't wait any longer. Book your first lesson today!</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/#book-lesson" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Book Your First Lesson</Link>
                        <a href="tel:+919040040165" className="border border-broto-yellow text-broto-yellow font-bold text-lg px-8 py-3 rounded-xl hover:bg-broto-yellow hover:text-broto-black transition">Call to Inquire</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

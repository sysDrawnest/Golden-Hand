import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

export default function BookLessonFormSection() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('online') // online, offline
    const [paymentAmount, setPaymentAmount] = useState(4500) // 4500 (full), 2250 (half)

    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: '',
        vehicle: 'Hatchback', pincode: '', training_time: 'morning'
    })

    // Pre-fill if user exists
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }))
        }
    }, [user])

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
    }, [])

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            alert('Please login or register to complete your booking. Your seats are waiting!')
            navigate('/login')
            return
        }

        setLoading(true)
        try {
            // 1. Create Booking
            const bookingRes = await api.post('/bookings/create', {
                ...formData,
                service: 'Driving Lessons',
                packageType: '14 Days Practical',
                paymentMethod,
                paymentAmount
            })
            const bookingId = bookingRes.data.booking._id

            // 2. Handle Offline
            if (paymentMethod === 'offline') {
                alert('Booking created successfully! Please pay on Day 1 of your training.')
                setLoading(false)
                setFormData({ ...formData, address: '', pincode: '' })
                return
            }

            // 3. Handle Online Payment (Razorpay)
            const orderRes = await api.post('/payment/create-order', {
                amount: paymentAmount,
                bookingId
            })

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Fallback
                amount: orderRes.data.amount,
                currency: orderRes.data.currency,
                name: "Golden Hands Driving School",
                description: "Driving Lesson Booking",
                order_id: orderRes.data.orderId,
                handler: async function (response) {
                    try {
                        await api.post('/payment/verify', {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            bookingId
                        })
                        alert('Payment successful! Your receipt has been emailed to you.')
                        setFormData({ ...formData, address: '', pincode: '' })
                    } catch (err) {
                        alert('Payment verification failed.')
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#FFC107" }
            }

            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', function (response) {
                alert('Payment failed. Reason: ' + response.error.description)
            })
            rzp.open()

        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to complete booking'
            alert(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="book-lesson-form-section" className="py-16 bg-broto-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-black/50 p-8 rounded-2xl shadow-xl border border-broto-yellow/30">
                    <h2 className="text-3xl font-extrabold text-white text-center mb-6 uppercase tracking-wider">
                        COMPLETE YOUR <span className="text-broto-yellow">BOOKING</span>
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label className="block text-gray-300 text-sm mb-2">Name</label><input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" type="text" placeholder="Your Name" /></div>
                            <div><label className="block text-gray-300 text-sm mb-2">Phone</label><input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" type="tel" placeholder="Your Phone Number" /></div>
                            <div><label className="block text-gray-300 text-sm mb-2">Email</label><input name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" type="email" placeholder="Your Email" /></div>
                            <div><label className="block text-gray-300 text-sm mb-2">Pincode</label><input required name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-transparent border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" type="text" placeholder="e.g. 751015" /></div>
                        </div>

                        <div className="mb-6"><label className="block text-gray-300 text-sm mb-2">Address</label><input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" type="text" placeholder="Your Full Address" /></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div><label className="block text-gray-300 text-sm mb-2">Vehicle Type</label><select name="vehicle" value={formData.vehicle} onChange={handleChange} className="w-full bg-broto-dark border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow"><option value="Hatchback">Hatchback (WagonR / Similar)</option><option value="Sedan">Sedan</option><option value="SUV">SUV</option></select></div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Preferred Training Time</label>
                                <select name="training_time" value={formData.training_time} onChange={handleChange} className="w-full bg-broto-dark border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow">
                                    <option value="early_morning">Early Morning (6 AM - 8 AM)</option>
                                    <option value="morning">Morning (8 AM - 11 AM)</option>
                                    <option value="afternoon">Afternoon (3 PM - 5 PM)</option>
                                    <option value="evening">Evening (5 PM - 7 PM)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-broto-grey/50 pt-6">
                            <div>
                                <label className="block text-broto-yellow font-bold text-sm mb-3 uppercase tracking-wider">Payment Method</label>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 cursor-pointer text-white">
                                        <input type="radio" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="w-5 h-5 text-broto-yellow bg-broto-dark border-broto-grey" />
                                        <span>Pay Online Now</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer text-white">
                                        <input type="radio" value="offline" checked={paymentMethod === 'offline'} onChange={() => setPaymentMethod('offline')} className="w-5 h-5 text-broto-yellow bg-broto-dark border-broto-grey" />
                                        <span>Pay Later (On Day 1)</span>
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === 'online' && (
                                <div>
                                    <label className="block text-broto-yellow font-bold text-sm mb-3 uppercase tracking-wider">Payment Amount</label>
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3 cursor-pointer text-white">
                                            <input type="radio" checked={paymentAmount === 4500} onChange={() => setPaymentAmount(4500)} name="paymentAmount" className="w-5 h-5 text-broto-yellow bg-broto-dark border-broto-grey" />
                                            <span>Full Amount — Rs 4500</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer text-white">
                                            <input type="radio" checked={paymentAmount === 2250} onChange={() => setPaymentAmount(2250)} name="paymentAmount" className="w-5 h-5 text-broto-yellow bg-broto-dark border-broto-grey" />
                                            <span>Half in Advance — Rs 2250</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-8 pt-6 border-t border-broto-grey/50">
                            {paymentMethod === 'online' ? (
                                <h3 className="text-xl text-white mb-4">Total Amount : <span className="text-broto-yellow font-bold text-3xl">Rs {paymentAmount}</span></h3>
                            ) : (
                                <h3 className="text-xl text-white mb-4">Due on Day 1 : <span className="text-broto-yellow font-bold text-3xl">Rs 4500</span></h3>
                            )}

                            <button disabled={loading} type="submit" className="bg-broto-yellow text-broto-black font-bold text-xl px-12 py-4 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-xl w-full md:w-auto disabled:opacity-50">
                                {loading ? 'PROCESSING...' : (paymentMethod === 'online' ? 'PAY & BOOK NOW' : 'CONFIRM BOOKING')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

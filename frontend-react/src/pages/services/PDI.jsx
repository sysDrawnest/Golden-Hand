import { Check, Eye, Shield, AlertTriangle, Settings } from 'lucide-react'
import { Slideshow, BookingForm } from '../../components/ServiceShared'

const slides = [
    { bg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2070&q=80', title: 'New Car Inspection', sub: 'Thorough pre-delivery check before you accept your car' },
    { bg: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2070&q=80', title: 'Expert Verification', sub: 'Our certified technicians verify every component' },
]

const checks = [
    { icon: Eye, title: 'Exterior Inspection', items: ['Paint job quality & uniformity', 'Panel alignment & gaps', 'Glass & mirror integrity', 'Tire condition & pressure'] },
    { icon: Settings, title: 'Mechanical Check', items: ['Engine performance test', 'Transmission smoothness', 'Brake function verification', 'Steering & suspension check'] },
    { icon: Shield, title: 'Safety Systems', items: ['Airbag system verification', 'ABS & traction control', 'Seatbelt functionality', 'Warning light check'] },
    { icon: AlertTriangle, title: 'Documentation Verification', items: ['Warranty documentation', 'Service book verification', 'Insurance documents', 'Registration papers'] },
]

export default function PDI() {
    return (
        <div className="bg-broto-black text-white">
            <section className="service-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Pre-Delivery <span className="text-broto-yellow">Inspection</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Ensure your new vehicle is perfect before accepting delivery. Our 100-point inspection catches defects dealers miss.</p>
                    <a href="#book-service" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Book Inspection</a>
                </div>
            </section>
            <section className="py-12 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Slideshow slides={slides} /></div>
            </section>
            <section className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Our <span className="text-broto-yellow">100-Point Inspection</span> Checklist</h2>
                        <p className="text-gray-400 text-lg">We check everything so you don't have to</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {checks.map((check, i) => (
                            <div key={i} className="service-card p-8 rounded-2xl">
                                <div className="flex items-center mb-6">
                                    <div className="service-icon w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                        <check.icon className="w-6 h-6 text-broto-yellow" />
                                    </div>
                                    <h3 className="text-xl font-bold">{check.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {check.items.map((item, j) => (
                                        <li key={j} className="flex items-center text-gray-300"><Check className="w-5 h-5 text-broto-yellow mr-3 flex-shrink-0" />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <BookingForm serviceLabel="Pre-Delivery Inspection" />
        </div>
    )
}

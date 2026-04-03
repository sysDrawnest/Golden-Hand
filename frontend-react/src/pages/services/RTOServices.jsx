import { Check, FileText, CreditCard, Car, BookOpen } from 'lucide-react'
import { Slideshow, BookingForm } from '../../components/ServiceShared'

const slides = [
    { bg: 'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=2070&q=80', title: 'RTO Services Made Easy', sub: 'We handle all your RTO documentation needs' },
    { bg: 'https://images.unsplash.com/photo-1544627836-5c6cb5779451?auto=format&fit=crop&w=2070&q=80', title: 'Expert Guidance', sub: 'Navigate RTO bureaucracy without the stress' },
]

const services = [
    { icon: FileText, title: 'New Driving Licence', desc: 'Complete assistance from learner\'s permit to full driving licence, including test preparation.' },
    { icon: BookOpen, title: 'Licence Renewal', desc: 'Hassle-free renewal of expired or expiring driving licences with all documentation handled.' },
    { icon: Car, title: 'Vehicle Registration', desc: 'New vehicle registration, RC transfer, NOC, and all related documentation services.' },
    { icon: CreditCard, title: 'Fitness Certificate', desc: 'Comprehensive vehicle fitness test and certification services for commercial and personal vehicles.' },
]

export default function RTOServices() {
    return (
        <div className="bg-broto-black text-white">
            <section className="service-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">RTO <span className="text-broto-yellow">Services</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">All your RTO requirements handled under one roof. From new licence to vehicle registration — we make it simple.</p>
                    <a href="#book-service" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Get Started</a>
                </div>
            </section>
            <section className="py-12 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Slideshow slides={slides} /></div>
            </section>
            <section className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Our RTO <span className="text-broto-yellow">Service Portfolio</span></h2>
                        <p className="text-gray-400 text-lg">Comprehensive RTO services for individuals and businesses</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((s, i) => (
                            <div key={i} className="service-card p-8 rounded-2xl flex items-start space-x-6">
                                <div className="service-icon w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                                    <s.icon className="w-7 h-7 text-broto-yellow" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                                    <p className="text-gray-400">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-center mb-8">What We Need From You</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {['Valid identity proof documents', 'Address proof (Aadhaar/Utility bills)', 'Recent passport-sized photographs', 'Any existing licence (for renewal)', 'Vehicle details (for registration)', 'Payment for government fees'].map((item, i) => (
                                <div key={i} className="flex items-center p-4 bg-broto-dark rounded-xl">
                                    <Check className="w-5 h-5 text-broto-yellow mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <BookingForm serviceLabel="RTO Services" />
        </div>
    )
}

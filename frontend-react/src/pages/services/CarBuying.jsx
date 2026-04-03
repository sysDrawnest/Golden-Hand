import { Check, Search, TrendingUp, Handshake, FileText } from 'lucide-react'
import { Slideshow, BookingForm } from '../../components/ServiceShared'

const slides = [
    { bg: 'https://images.unsplash.com/photo-1609963379754-2e05a61c24b9?auto=format&fit=crop&w=2070&q=80', title: 'Expert Car Buying Consultation', sub: 'Make the right decision the first time' },
    { bg: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2070&q=80', title: 'Transparent Vehicle Inspection', sub: 'Know exactly what you\'re buying' },
]

const services = [
    { icon: Search, title: 'Vehicle Research & Shortlisting', desc: 'We analyze your requirements, budget, and preferences to shortlist the best vehicles for you from the current market.' },
    { icon: TrendingUp, title: 'Price Negotiation', desc: 'Our experts negotiate the best price with dealers to ensure you get the maximum value for your money.' },
    { icon: Handshake, title: 'Dealer Liaison', desc: 'We handle all communications with dealerships, protecting you from high-pressure sales tactics.' },
    { icon: FileText, title: 'Documentation Support', desc: 'Complete assistance with loan applications, insurance, registration, and all necessary paperwork.' },
]

export default function CarBuying() {
    return (
        <div className="bg-broto-black text-white">
            <section className="service-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Car Buying <span className="text-broto-yellow">Consultant</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Don't navigate the complex car market alone. Our expert consultants guide you to the perfect vehicle at the best price.</p>
                    <a href="#book-service" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Get Advice</a>
                </div>
            </section>
            <section className="py-12 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Slideshow slides={slides} /></div>
            </section>
            <section className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Our Consultation <span className="text-broto-yellow">Services</span></h2>
                        <p className="text-gray-400 text-lg">End-to-end support for your vehicle purchase journey</p>
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
                </div>
            </section>
            <BookingForm serviceLabel="Car Buying Consultation" />
        </div>
    )
}

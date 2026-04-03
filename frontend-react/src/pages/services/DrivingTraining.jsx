import { Link } from 'react-router-dom'
import { Car, RefreshCw, Shield, Check, X } from 'lucide-react'
import { Slideshow, BookingForm } from '../../components/ServiceShared'

const slides = [
    { bg: 'https://images.unsplash.com/photo-1544627836-5c6cb5779451?auto=format&fit=crop&w=2070&q=80', title: 'Professional Driving Instructors', sub: 'Learn from certified experts with years of experience' },
    { bg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80', title: 'Modern Training Vehicles', sub: 'Latest cars with dual controls for safety' },
    { bg: 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?auto=format&fit=crop&w=2070&q=80', title: 'Comprehensive Training Programs', sub: 'From basic driving to advanced techniques' },
    { bg: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2070&q=80', title: 'Flexible Scheduling', sub: 'Choose timings that work for you' },
]

const programs = [
    { icon: Car, title: 'Basic Driving Training', price: '₹3000', desc: 'Perfect for absolute beginners. Learn driving fundamentals from scratch with our patient, certified instructors.', features: ['Vehicle controls and operations', 'Road signs and traffic rules', 'Basic maneuvers and parking', 'City driving fundamentals'] },
    { icon: RefreshCw, title: 'Refresher Course', price: '₹2500', desc: 'For licensed drivers who want to regain confidence or improve specific skills after a break.', features: ['Skill assessment and improvement', 'Advanced parking techniques', 'Highway driving practice', 'Night driving skills'] },
    { icon: Shield, title: 'Defensive Driving', price: '₹4000', desc: 'Advanced training to anticipate hazards and prevent accidents. Essential for safe driving in all conditions.', features: ['Hazard recognition and avoidance', 'Emergency braking techniques', 'Skid control and recovery', 'Adverse weather driving'] },
]

const packages = [
    { name: 'Package 1', price: '₹3000', hours: 10, theory: 3, pickup: false, vehicle: 'WagonR', trial: '1 Day', time: '8AM-10AM / 3PM-7PM' },
    { name: 'Package 2', price: '₹3500', hours: 15, theory: 5, pickup: true, vehicle: 'WagonR', trial: '2 Days', time: '6AM-11AM / 3PM-7PM' },
    { name: 'Package 3', price: '₹4500', hours: 20, theory: 7, pickup: true, vehicle: 'WagonR', trial: '—', time: '6AM-11AM / 3PM-7PM' },
    { name: 'Package 4', price: '₹5000', hours: 24, theory: 10, pickup: true, vehicle: 'WagonR', trial: '—', time: '6AM-11AM / 3PM-7PM' },
]

export default function DrivingTraining() {
    return (
        <div className="bg-broto-black text-white">
            {/* Hero */}
            <section className="service-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Driving <span className="text-broto-yellow">Training</span></h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">Master the road with our comprehensive driving training programs. From complete beginners to experienced drivers.</p>
                    <a href="#book-service" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Explore Programs</a>
                </div>
            </section>

            {/* Slideshow */}
            <section className="py-12 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Slideshow slides={slides} /></div>
            </section>

            {/* Programs */}
            <section id="services" className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Our Driving <span className="text-broto-yellow">Training Programs</span></h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose from our range of professional driving training programs designed for every skill level.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programs.map((prog, i) => (
                            <div key={i} className="service-card p-8 rounded-2xl">
                                <div className="service-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <prog.icon className="w-8 h-8 text-broto-yellow" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-center">{prog.title}</h3>
                                <p className="text-gray-400 mb-6 text-center">{prog.desc}</p>
                                <ul className="space-y-3 mb-6">
                                    {prog.features.map((f, j) => (
                                        <li key={j} className="flex items-center"><Check className="w-5 h-5 text-broto-yellow mr-2 flex-shrink-0" /><span>{f}</span></li>
                                    ))}
                                </ul>
                                <div className="text-center"><span className="text-broto-yellow font-bold text-xl">Starting at {prog.price}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fees Table */}
            <section className="py-16 bg-broto-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white mb-8 uppercase tracking-wider text-center">CHOOSE YOUR <span className="text-broto-yellow">DRIVING PACKAGE</span></h2>
                    <div className="overflow-x-auto rounded-xl shadow-2xl">
                        <table className="w-full min-w-max border-collapse">
                            <thead className="bg-broto-yellow text-broto-black uppercase text-sm">
                                <tr>
                                    <th className="p-4 text-left font-black">Packages</th>
                                    {packages.map(p => <th key={p.name} className="p-4 text-center font-black">{p.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: 'Price (INR)', key: 'price', yellow: true },
                                    { label: 'Practical Lessons (Hrs)', key: 'hours', yellow: false },
                                    { label: 'Theory Classes (Hrs)', key: 'theory', yellow: true },
                                    { label: 'Home Pickup & Drop', key: 'pickup', bool: true, yellow: false },
                                    { label: 'Vehicle', key: 'vehicle', yellow: true },
                                    { label: 'Trail Driving (Days)', key: 'trial', yellow: false },
                                    { label: 'Training Time', key: 'time', yellow: true },
                                ].map((row, ri) => (
                                    <tr key={ri} className={`${row.yellow ? 'bg-broto-dark' : 'bg-broto-dark/70'} text-white border-b border-broto-grey`}>
                                        <td className={`p-4 font-bold ${row.yellow ? 'text-broto-yellow' : ''}`}>{row.label}</td>
                                        {packages.map(p => (
                                            <td key={p.name} className="p-4 text-center text-sm">
                                                {row.bool ? (p[row.key] ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-broto-red mx-auto" />) : String(p[row.key])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <BookingForm serviceLabel="Driving Training" />
        </div>
    )
}

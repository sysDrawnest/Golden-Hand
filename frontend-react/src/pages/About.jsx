import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Quote, Mail } from 'lucide-react'

const trainerQuotes = [
    { name: 'Ravi Sharma', role: 'Senior Instructor', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop', quote: 'Patience is the foundation of good instruction. We focus on building confidence, one careful lesson at a time, ensuring every student masters the road at their own pace.' },
    { name: 'Anjali Varma', role: 'Lead Trainer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop', quote: 'Driving is freedom. Our mission is to equip our students not just with a license, but with the comprehensive skill set to stay safe in any traffic condition.' },
    { name: 'Prakash Singh', role: 'RTO Expert', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop', quote: 'The RTO process can be daunting. We streamline the entire documentation and preparation, ensuring our students\' only focus is on becoming excellent drivers.' },
]

const statsData = [
    { id: 'stat-1', target: 95, unit: '%', label: 'Licence Success Rate' },
    { id: 'stat-2', target: 4200, unit: '+', label: 'Satisfied Students Registered' },
    { id: 'stat-3', target: 12, unit: '+', label: 'Driving Excellence Awards' },
]

export default function About() {
    const [counts, setCounts] = useState([0, 0, 0])
    const statsRef = useRef(null)
    const animated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !animated.current) {
                animated.current = true
                statsData.forEach((stat, i) => {
                    const duration = 2000
                    let start = null
                    const step = (ts) => {
                        if (!start) start = ts
                        const progress = Math.min((ts - start) / duration, 1)
                        setCounts(c => { const n = [...c]; n[i] = Math.floor(progress * stat.target); return n })
                        if (progress < 1) requestAnimationFrame(step)
                        else setCounts(c => { const n = [...c]; n[i] = stat.target; return n })
                    }
                    requestAnimationFrame(step)
                })
            }
        }, { threshold: 0.5 })
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="bg-broto-black text-white">
            {/* Hero */}
            <section className="about-hero-bg py-32 relative">
                <div className="hero-overlay absolute inset-0" />
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <p className="text-white text-md mb-2 uppercase tracking-widest font-light">Home / About Us</p>
                    <h1 className="text-6xl font-black text-white">About Us</h1>
                </div>
            </section>

            {/* Get to Know Us */}
            <section className="py-20 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="lg:order-1 order-2">
                            <img src="https://images.unsplash.com/photo-1544627836-5c6cb5779451?auto=format&fit=crop&w=800&q=80" alt="Friendly Instructors" className="w-full h-full object-cover shadow-2xl" />
                        </div>
                        <div className="text-left py-8 lg:py-0 lg:order-2 order-1">
                            <p className="text-sm font-semibold text-broto-yellow mb-2 uppercase tracking-widest">About Our Institution</p>
                            <h2 className="text-4xl font-black text-white mb-6">More than 10+ Years Trusted Our <span className="text-accent">Driving &amp; Training</span> Institution</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">SysDriving School was founded on the principle of promoting safe, confident, and responsible driving. For over a decade, we have successfully trained thousands of students, ensuring they not only pass their tests but become capable drivers for life. We use modern, dual-control vehicles and curriculum designed by veteran road safety experts.</p>
                            <p className="text-gray-400 text-base leading-relaxed">Our commitment goes beyond the certificate; it's about instilling the knowledge needed to handle any real-world situation, making road safety the priority for every student that walks through our doors.</p>
                            <a href="#mission-section" className="inline-block mt-8 text-accent border border-accent px-6 py-3 rounded-lg text-sm font-bold hover:bg-accent hover:text-primary transition duration-300">LEARN MORE ABOUT US</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trainer Quotes */}
            <section className="py-20 bg-broto-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black text-center text-white mb-12">Words from Our <span className="text-accent">Expert Trainers</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {trainerQuotes.map((q, i) => (
                            <div key={i} className="quote-card p-6 border-b-4 border-accent">
                                <Quote className="w-8 h-8 text-accent mb-4" />
                                <p className="text-gray-300 text-base italic mb-6">"{q.quote}"</p>
                                <div className="flex items-center space-x-4">
                                    <img src={q.img} alt={q.name} className="w-10 h-10 rounded-full object-cover border-2 border-accent" />
                                    <div>
                                        <p className="font-bold text-white">{q.name}</p>
                                        <p className="text-sm text-accent">{q.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section id="mission-section" className="py-20 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80" alt="Our Mission" className="w-full rounded-xl shadow-2xl" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-widest">About Our Corporation</p>
                            <h2 className="text-4xl font-black text-white mb-6">Quality Makes the Belief for <span className="text-accent">Safe Drivers</span></h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">Our Mission is to set the gold standard for driving education. We strive to reduce road accidents by producing drivers who are not just competent but truly responsible. From the moment you enroll to the day you receive your license, we guarantee a supportive, high-quality learning environment focused on real-world preparedness.</p>
                            <Link to="/contact" className="inline-flex items-center bg-cta-red text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition duration-300">
                                <Mail className="w-5 h-5 mr-3" /> Contact Us Directly
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section ref={statsRef} className="py-20 stats-bg text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black text-white mb-10 uppercase tracking-wider"><span className="text-accent">Technical</span> Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {statsData.map((stat, i) => (
                            <div key={i} className="text-white">
                                <p className="stat-number text-accent mb-3">{counts[i]}{stat.unit}</p>
                                <p className="text-sm uppercase tracking-widest font-semibold text-gray-300">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="book-lesson-banner h-64 flex items-center justify-center">
                <div className="tire-mark hidden md:block" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
                    <div className="text-white text-left p-4">
                        <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">Book Your First Driving Lesson Today</h2>
                        <Link to="/#book-lesson" className="inline-block bg-broto-black text-white font-bold text-lg px-8 py-3 rounded-xl hover:bg-broto-grey transition duration-300 shadow-xl">Book Now</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

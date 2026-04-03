import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
    {
        title: 'Driving Training',
        img: '1000058876.jpg', // Original had this image source, we might need a fallback
        fallback: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=400&fit=crop',
        link: '/services/driving-training',
        span: true
    },
    {
        title: 'Driving Licence',
        img: 'https://placehold.co/300x400/222222/ffffff?text=Driving+Licence',
        link: '/services/driving-license',
        span: false
    },
    {
        title: 'Car Buying Consultant',
        img: 'https://placehold.co/300x400/222222/ffffff?text=Car+Buying+Consultant',
        link: '/services/car-buying',
        span: false
    },
    {
        title: 'Pre-Delivery Inspection',
        img: 'https://placehold.co/300x400/222222/ffffff?text=PDI+Service',
        link: '/services/pdi',
        span: false
    },
    {
        title: 'RTO Service',
        img: 'https://placehold.co/300x400/222222/ffffff?text=RTO+Service',
        link: '/services/rto-services',
        span: false
    }
]

export default function WhatWeDoSection() {
    return (
        <section id="service-section" className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wider">WHAT WE DO</h2>
                <p className="text-gray-400 text-sm mb-12 border-b border-broto-grey pb-4">
                    At Golden Hand's, we provide comprehensive training programs designed to transform beginners into confident, responsible drivers. Our services extend beyond just lessons; we offer full RTO assistance, vehicle consulting, and advanced defensive driving training, ensuring you are prepared for every aspect of vehicle ownership.
                </p>

                <h3 className="text-3xl font-extrabold text-white mb-8 tracking-wider">
                    CHOOSE FROM A RANGE OF <span className="text-broto-yellow">PREMIUM SERVICES</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {services.map((svc, i) => (
                        <Link
                            key={i}
                            to={svc.link}
                            className={`bg-broto-black rounded-xl overflow-hidden shadow-xl hover:shadow-broto-yellow/30 transition duration-300 group block ${svc.span ? 'md:col-span-1 col-span-2 flex justify-center' : ''}`}
                        >
                            <div className={svc.span ? 'w-full max-w-[200px]' : ''}>
                                <img
                                    src={svc.img}
                                    alt={svc.title}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => { if (svc.fallback) e.target.src = svc.fallback; }}
                                />
                                <div className="p-4 flex justify-between items-center">
                                    <p className="text-sm font-semibold text-white">{svc.title}</p>
                                    <ArrowRight className="w-5 h-5 text-broto-yellow group-hover:translate-x-1 transition duration-200" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

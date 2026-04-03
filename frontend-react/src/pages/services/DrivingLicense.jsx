import { Check, FileText, CreditCard, Car, MapPin } from 'lucide-react'
import { Slideshow, BookingForm } from '../../components/ServiceShared'

const slides = [
    { bg: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2070&q=80', title: 'Driving Licence Assistance', sub: 'We handle the paperwork, you focus on driving' },
    { bg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2070&q=80', title: 'RTO Test Preparation', sub: 'Theory and practical test guidance' },
]

const steps = [
    { icon: FileText, step: '01', title: 'Submit Documents', desc: 'Provide ID proof, age proof, and address proof. Our team helps with document preparation and verification.' },
    { icon: MapPin, step: '02', title: 'Obtain Learner\'s Licence', desc: 'We guide you through the learner\'s licence application process at the RTO office.' },
    { icon: Car, step: '03', title: 'Complete Training', desc: 'Undergo comprehensive driving training with certified instructors. Track your progress throughout.' },
    { icon: CreditCard, step: '04', title: 'Get Your Licence', desc: 'Sit for the practical test with full confidence. We prepare you for every aspect of the test.' },
]

export default function DrivingLicense() {
    return (
        <div className="bg-broto-black text-white">
            <section className="service-hero-bg py-20 lg:py-28 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Driving <span className="text-broto-yellow">Licence</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Complete driving licence assistance — from learner's permit to final licence. We handle the paperwork so you can focus on driving.</p>
                    <a href="#book-service" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition transform hover:scale-105">Start Application</a>
                </div>
            </section>
            <section className="py-12 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Slideshow slides={slides} /></div>
            </section>
            <section className="py-16 bg-broto-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4">Licence Application <span className="text-broto-yellow">Process</span></h2>
                        <p className="text-gray-400 text-lg">Simple 4-step process to get your driving licence with our full assistance</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="service-card p-8 rounded-2xl text-center">
                                <div className="text-5xl font-black text-broto-yellow/20 mb-4">{step.step}</div>
                                <div className="service-icon w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="w-7 h-7 text-broto-yellow" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-broto-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-extrabold text-center mb-12">Documents <span className="text-broto-yellow">Required</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {['Age Proof (Birth Certificate/10th Marksheet)', 'Identity Proof (Aadhaar / Passport)', 'Address Proof (Aadhaar / Utility Bill)', '4 Passport-sized Photographs', 'Medical Certificate (Form 1A)', 'Application Fee Payment Receipt'].map((doc, i) => (
                            <div key={i} className="flex items-center p-4 bg-broto-dark rounded-xl">
                                <Check className="w-6 h-6 text-broto-yellow mr-4 flex-shrink-0" />
                                <span className="text-gray-300">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <BookingForm serviceLabel="Driving Licence" />
        </div>
    )
}

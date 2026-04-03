import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        q: 'What sets SysDriving School apart from other driving schools in Bhubaneswar?',
        a: 'We focus on customized learning, offer door-step pick-up, provide modern, dual-control vehicles, and give comprehensive RTO assistance, making us a one-stop solution for new drivers in Bhubaneswar.'
    },
    {
        q: 'How experienced are your driving instructors?',
        a: 'Our team consists of certified instructors, each with a minimum of 7 years of professional experience, ensuring you receive the highest standard of safe and patient instruction.'
    },
    {
        q: 'What types of driving courses do you offer?',
        a: 'We offer Basic Beginner courses, Refresher courses for licensed drivers, Advanced City driving, and specialized programs like car buying consultation and full RTO documentation services.'
    },
    {
        q: 'Can I choose the schedule for my driving lessons?',
        a: 'Yes, we offer flexible training slots, including early mornings and evenings, as detailed in our fees section. You can coordinate directly with your instructor to find a time that fits your life.'
    },
    {
        q: 'Do you provide training vehicles for practice sessions?',
        a: 'Absolutely. All practical training is conducted in our modern, well-maintained vehicles (WagonR, Altroz) equipped with dual controls for your maximum safety.'
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i)
    }

    return (
        <section id="faq-section" className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wider text-center">
                    Have Questions in Your Mind? <span className="text-broto-yellow">Get the Answers Now</span>
                </h2>

                <div className="max-w-3xl mx-auto mt-12 space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i
                        return (
                            <div key={i} className="bg-broto-black rounded-xl shadow-lg border border-broto-grey overflow-hidden transition-all duration-300">
                                <button
                                    className="flex justify-between items-center w-full p-5 font-semibold text-left text-white hover:text-broto-yellow transition duration-200"
                                    onClick={() => toggle(i)}
                                >
                                    {faq.q}
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div
                                    className={`text-gray-300 px-5 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                >
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

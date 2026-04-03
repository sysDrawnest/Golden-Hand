import { Star } from 'lucide-react'

const reviews = [
    {
        name: 'Priya K.',
        role: 'Passed License Test',
        text: 'Thanks SysDriving! I passed my driving test on the first attempt thanks to the patient instructors and excellent practical lessons. Highly recommend Package 4!'
    },
    {
        name: 'Sameer A.',
        role: 'Advanced City Driving',
        text: 'The home pickup service was a lifesaver. My instructor, Ravi, was extremely calm and taught me to drive in city traffic with confidence. Worth every rupee!'
    },
    {
        name: 'Zoya F.',
        role: 'RTO Service & Theory',
        text: 'The theory classes were concise and super helpful for the RTO exam. I also used their RTO service for the application, making the whole process hassle-free.'
    },
    {
        name: 'Umesh Karnal',
        role: 'Consultant Client',
        text: 'I took the Car Buying Consultant package and they helped me select the perfect used car for my budget. Fantastic non-driving services too!'
    }
]

export default function TestimonialsSection() {
    return (
        <section className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-broto-yellow text-center mb-6 uppercase tracking-wider">
                    Student Testimonials
                </h2>
            </div>

            <div className="scrolling-wrapper">
                <div className="scrolling-track" id="review-track">
                    <div className="flex">
                        {reviews.map((r, i) => (
                            <div key={i} className="scroll-item-review bg-broto-black p-6 rounded-xl border-t-4 border-broto-yellow shadow-xl cursor-pointer">
                                <div className="flex text-broto-yellow mb-4">
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                </div>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                                    {r.text}
                                </p>
                                <p className="font-bold text-lg text-broto-yellow">{r.name}</p>
                                <p className="text-xs text-gray-500">{r.role}</p>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for infinite scroll */}
                    <div className="flex" aria-hidden="true">
                        {reviews.map((r, i) => (
                            <div key={`dup-${i}`} className="scroll-item-review bg-broto-black p-6 rounded-xl border-t-4 border-broto-yellow shadow-xl cursor-pointer">
                                <div className="flex text-broto-yellow mb-4">
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                    <Star className="w-5 h-5 fill-broto-yellow stroke-broto-yellow" />
                                </div>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-4">
                                    {r.text}
                                </p>
                                <p className="font-bold text-lg text-broto-yellow">{r.name}</p>
                                <p className="text-xs text-gray-500">{r.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    )
}

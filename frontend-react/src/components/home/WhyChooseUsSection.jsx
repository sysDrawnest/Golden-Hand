import { CheckCircle2 } from 'lucide-react'

const reasons = [
    'High level of customer service',
    'Over 250 vehicles',
    'Individual programs',
    'Best safety protocols',
    'Qualified team of trainers'
]

export default function WhyChooseUsSection() {
    return (
        <section className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=600&fit=crop"
                            alt="Why Choose Us"
                            className="rounded-xl shadow-2xl w-full h-auto object-cover"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-extrabold text-broto-yellow mb-6">
                            Why You Should Choose Our Driving School?
                        </h2>
                        <ul className="space-y-4">
                            {reasons.map((reason, i) => (
                                <li key={i} className="flex items-center text-white text-lg font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-broto-yellow mr-4 shrink-0" />
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

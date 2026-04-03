import { Package, CalendarPlus, UserCheck, Award } from 'lucide-react'

const steps = [
    {
        title: 'Choose Your Package',
        desc: 'Review our fees table and select the driving course and duration that meets your needs.',
        icon: Package
    },
    {
        title: 'Schedule Your Lesson',
        desc: 'Book your initial session online or by phone, choosing a time slot that works best for you.',
        icon: CalendarPlus
    },
    {
        title: 'Meet Your Instructor',
        desc: "We'll pair you with a certified expert who will conduct your first lesson, often with home pickup.",
        icon: UserCheck
    },
    {
        title: 'Drive Confidently',
        desc: 'Continue your lessons until you are ready for your test, equipped with all the skills for safe driving.',
        icon: Award
    }
]

export default function EnrollmentProcessSection() {
    return (
        <section className="py-16 bg-broto-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-broto-yellow text-center mb-12 uppercase tracking-wider">
                    Enrollment Process
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="text-center p-6 rounded-xl border border-broto-grey hover:border-broto-yellow transition duration-300">
                            <div className="w-16 h-16 bg-broto-yellow text-broto-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                            <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import { Link } from 'react-router-dom'

export default function BookLessonBanner() {
    return (
        <section className="py-12 bg-broto-yellow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-extrabold text-broto-black mb-4 md:mb-0 uppercase tracking-wide text-center md:text-left">
                    Book Your First Driving Lesson Today
                </h2>
                <a href="#book-lesson-form-section" className="bg-broto-black text-broto-yellow font-bold text-lg px-8 py-3 rounded hover:bg-gray-900 transition duration-300 whitespace-nowrap shadow-xl">
                    Book Your Training
                </a>
            </div>
        </section>
    )
}

export default function UrgentCTASection() {
    return (
        <section className="py-12 bg-broto-yellow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-broto-black uppercase tracking-tight mb-4">
                    Seats Are Filling Up Fast
                </h2>
                <p className="text-xl md:text-2xl text-broto-black font-semibold mb-8 max-w-3xl mx-auto">
                    Don't wait — <span className="font-black bg-broto-black text-broto-yellow px-2 py-1 rounded">1,676+</span> people already learned to drive with us. You're next.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a
                        href="tel:+919040040265"
                        className="flex items-center text-xl md:text-2xl font-bold bg-broto-black text-broto-yellow px-8 py-4 rounded-xl hover:bg-gray-900 transition-transform transform hover:scale-105 shadow-2xl w-full sm:w-auto justify-center"
                    >
                        <span className="mr-3 text-2xl">📞</span> Call Now — 9040040265
                    </a>

                    <a
                        href="https://wa.me/919040040265"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-xl md:text-2xl font-bold bg-[#25D366] text-white px-8 py-4 rounded-xl hover:bg-[#128C7E] transition-transform transform hover:scale-105 shadow-2xl w-full sm:w-auto justify-center"
                    >
                        <span className="mr-3 text-2xl">💬</span> WhatsApp Us 9040040265
                    </a>
                </div>
            </div>
        </section>
    )
}

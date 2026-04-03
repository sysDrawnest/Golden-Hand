import { Phone, MapPin, Mail } from 'lucide-react'

export default function ContactSection() {
    return (
        <section className="py-16 bg-broto-black border-t border-broto-grey">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-extrabold text-broto-yellow mb-6 uppercase">
                            FEEL FREE TO WRITE TO US
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-lg text-sm">
                            Have specific requirements or just want to learn more about our
                            courses? Reach out to our customer service team. We are available
                            to assist you in making the right choice for your driving journey.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Phone className="w-6 h-6 text-broto-yellow mt-1 mr-4 shrink-0" />
                                <div>
                                    <p className="text-white font-bold">Call Us First</p>
                                    <p className="text-gray-400">9237699100</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-6 h-6 text-broto-yellow mt-1 mr-4 shrink-0" />
                                <div>
                                    <p className="text-white font-bold">Email</p>
                                    <p className="text-gray-400">info@sysdriving.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-broto-yellow mt-1 mr-4 shrink-0" />
                                <div>
                                    <p className="text-white font-bold">Location</p>
                                    <p className="text-gray-400">R2, Indradhanu market IRC village near idbi bank Nayapalli BBSR 751015</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <form className="bg-broto-dark p-8 rounded-xl shadow-xl border border-broto-grey">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold mb-2 uppercase" htmlFor="name">Full Name</label>
                                    <input className="w-full bg-broto-black border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" id="name" type="text" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold mb-2 uppercase" htmlFor="email">Email</label>
                                    <input className="w-full bg-broto-black border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" id="email" type="email" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase" htmlFor="subject">Subject</label>
                                <input className="w-full bg-broto-black border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow" id="subject" type="text" placeholder="How can we help?" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase" htmlFor="message">Message</label>
                                <textarea className="w-full bg-broto-black border border-broto-grey rounded p-3 text-white focus:outline-none focus:border-broto-yellow h-32" id="message" placeholder="Your message here..."></textarea>
                            </div>
                            <button className="w-full bg-broto-yellow hover:bg-yellow-400 text-broto-black font-bold py-3 rounded transition duration-300" type="button">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

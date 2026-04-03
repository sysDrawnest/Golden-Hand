import { Check, X } from 'lucide-react'

export default function FeesSection() {
    return (
        <section id="fees-section" className="py-16 bg-broto-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wider text-center">
                    CHOOSE YOUR <span className="text-broto-yellow">DRIVING PACKAGE</span>
                </h2>

                <div className="overflow-x-auto rounded-xl shadow-2xl">
                    <table className="w-full min-w-max border-collapse">
                        <thead className="bg-broto-yellow text-broto-black uppercase text-sm">
                            <tr>
                                <th className="p-4 text-left font-black">Packages</th>
                                <th className="p-4 text-center font-black">Package 1</th>
                                <th className="p-4 text-center font-black">Package 2</th>
                                <th className="p-4 text-center font-black">Package 3</th>
                                <th className="p-4 text-center font-black">Package 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-broto-dark text-white border-b border-broto-grey">
                                <td className="p-4 font-bold text-broto-yellow">Price (INR)</td>
                                <td className="p-4 text-center">₹3000</td>
                                <td className="p-4 text-center">₹3500</td>
                                <td className="p-4 text-center">₹4500</td>
                                <td className="p-4 text-center">₹5000</td>
                            </tr>
                            <tr className="bg-broto-dark/70 text-white border-b border-broto-grey">
                                <td className="p-4 font-bold">Practical Lessons (Hrs)</td>
                                <td className="p-4 text-center">10</td>
                                <td className="p-4 text-center">15</td>
                                <td className="p-4 text-center">20</td>
                                <td className="p-4 text-center">24</td>
                            </tr>
                            <tr className="bg-broto-dark text-white border-b border-broto-grey">
                                <td className="p-4 font-bold text-broto-yellow">Theory Classes (Clases)</td>
                                <td className="p-4 text-center">3</td>
                                <td className="p-4 text-center">5</td>
                                <td className="p-4 text-center">7</td>
                                <td className="p-4 text-center">10</td>
                            </tr>
                            <tr className="bg-broto-dark/70 text-white border-b border-broto-grey">
                                <td className="p-4 font-bold">Home Pickup & Drop</td>
                                <td className="p-4 text-center"><X className="w-5 h-5 text-broto-red mx-auto" /></td>
                                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                            </tr>
                            <tr className="bg-broto-dark text-white border-b border-broto-grey">
                                <td className="p-4 font-bold text-broto-yellow">Vehicle</td>
                                <td className="p-4 text-center">WagonR</td>
                                <td className="p-4 text-center">WagonR</td>
                                <td className="p-4 text-center">WagonR</td>
                                <td className="p-4 text-center">WagonR</td>
                            </tr>
                            <tr className="bg-broto-dark/70 text-white border-b border-broto-grey">
                                <td className="p-4 font-bold">Trail Driving (Days)</td>
                                <td className="p-4 text-center">1</td>
                                <td className="p-4 text-center">2</td>
                                <td className="p-4 text-center"><X className="w-5 h-5 text-broto-red mx-auto" /></td>
                                <td className="p-4 text-center"><X className="w-5 h-5 text-broto-red mx-auto" /></td>
                            </tr>
                            <tr className="bg-broto-dark text-white">
                                <td className="p-4 font-bold text-broto-yellow">Training Time</td>
                                <td className="p-4 text-center text-xs">8AM - 10AM<br />3PM - 7PM</td>
                                <td className="p-4 text-center text-xs">6AM - 11AM<br />3PM - 7PM</td>
                                <td className="p-4 text-center text-xs">6AM - 11AM<br />3PM - 7PM</td>
                                <td className="p-4 text-center text-xs">6AM - 11AM<br />3PM - 7PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-8">
                    <a href="#book-lesson-form-section" className="inline-block bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                        Book Your Package
                    </a>
                </div>
            </div>
        </section>
    )
}

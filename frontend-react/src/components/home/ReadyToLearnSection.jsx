import { Link } from 'react-router-dom'

export default function ReadyToLearnSection() {
    return (
        <section className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wider">
                            <span className="text-broto-yellow">Ready to</span> Learn Driving?
                        </h2>
                        <p className="text-gray-300 text-lg mb-6">
                            Welcome to Golden Hands, where safe, confident driving is our mission. Our certified instructors and modern training vehicles ensure you get the best start on the road. We tailor every lesson to your pace, guaranteeing you pass your test and drive independently.
                        </p>
                        <Link to="/about" className="inline-block bg-broto-yellow text-broto-black font-bold text-md px-8 py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                            Discover More About Us
                        </Link>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                        <img
                            src="background.jpg"
                            alt="Driving Lesson Photo"
                            className="w-full h-auto object-cover"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

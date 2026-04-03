import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
export default function Footer() {
    return (
        <footer className="bg-broto-black pt-16 border-t-8 border-broto-yellow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-broto-grey">
                    {/* Column 1: Logo & Social */}
                    <div>
                        <Link to="/" className="text-2xl font-extrabold tracking-widest mb-4 block">
                            <span className="text-white">GOLDEN</span>
                            <span className="text-broto-yellow">HANDS</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            GOLDEN HANDS Driving School. Your path to becoming a safe, skilled, and confident driver.
                        </p>
                        <div className="flex space-x-3 text-broto-yellow">
                            <a href="#" aria-label="Facebook"><FaFacebook className="w-5 h-5 hover:text-white transition" /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram className="w-5 h-5 hover:text-white transition" /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter className="w-5 h-5 hover:text-white transition" /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin className="w-5 h-5 hover:text-white transition" /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4 uppercase">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About Us' },
                                { to: '/gallery', label: 'Gallery' },
                                { to: '/contact', label: 'Contact' },
                            ].map(item => (
                                <li key={item.to}><Link to={item.to} className="text-gray-400 hover:text-broto-yellow transition">{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4 uppercase">Core Services</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/services/driving-training', label: 'Driving Training' },
                                { to: '/services/driving-license', label: 'Driving Licence' },
                                { to: '/services/car-buying', label: 'Car Buying Consultant' },
                                { to: '/services/rto-services', label: 'RTO Service' },
                                { to: '/#fees-section', label: 'Packages & Fees' },
                            ].map(item => (
                                <li key={item.to}><Link to={item.to} className="text-gray-400 hover:text-broto-yellow transition">{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 & 5: Contact & Branding */}
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-bold text-white mb-4 uppercase">Contact Us</h4>
                                <p className="text-gray-400 text-sm mb-2">Office: C-3/12, Satya Vihar, BBSR - 110045</p>
                                <a href="tel:+919040040165" className="text-broto-yellow hover:text-white font-medium block">+91 9040040165</a>
                                <a href="mailto:goldenhandsdrivingschool@gmail.com" className="text-broto-yellow hover:text-white font-medium block text-sm">goldenhandsdrivingschool@gmail.com</a>
                            </div>
                            <div className="flex flex-col items-center sm:items-end">
                                <h4 className="text-lg font-bold text-white mb-2 uppercase">Quality Focus</h4>
                                <img src="https://placehold.co/150x80/FFC107/000000?text=LEARN+%26+DRIVE" alt="Learn & Drive Logo" className="w-36 h-auto" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center py-4 text-xs text-gray-500">
                    <p className="order-2 md:order-1 mt-2 md:mt-0">&copy; 2024 GOLDEN HANDS Driving School. All rights reserved.</p>
                    <div className="flex space-x-4 order-1 md:order-2">
                        <a href="#" className="hover:text-broto-yellow transition">Privacy Policy</a>
                        <a href="#" className="hover:text-broto-yellow transition">Terms and Conditions</a>
                        <a href="#" className="hover:text-broto-yellow transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

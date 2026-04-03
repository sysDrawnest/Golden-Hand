import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, Search, User, Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar() {
    const { user, logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authTab, setAuthTab] = useState('login')
    const searchInputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchOpen) searchInputRef.current?.focus()
    }, [searchOpen])

    // Close mobile menu on route change
    const handleNavClick = () => {
        setMobileOpen(false)
        setMobileServicesOpen(false)
    }

    const openLogin = () => { setAuthTab('login'); setAuthModalOpen(true); setMobileOpen(false) }
    const openRegister = () => { setAuthTab('register'); setAuthModalOpen(true); setMobileOpen(false) }

    return (
        <>
            {/* Top Contact Bar */}
            <div className="bg-broto-black text-white text-sm py-2 border-b border-broto-grey hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <a href="tel:+919040040165" className="flex items-center hover:text-broto-yellow transition duration-300">
                            <Phone className="w-4 h-4 mr-2" /> +91 9040040165
                        </a>
                        <a href="mailto:goldenhandsdrivingschool@gmail.com" className="flex items-center hover:text-broto-yellow transition duration-300">
                            <Mail className="w-4 h-4 mr-2" /> goldenhandsdrivingschool@gmail.com
                        </a>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <button onClick={() => setSearchOpen(p => !p)} className="hover:text-broto-yellow transition duration-300">
                            <Search className="w-5 h-5" />
                        </button>
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-broto-yellow hover:text-white transition duration-300 text-xs font-semibold">Admin Panel</Link>
                                )}
                                <Link to="/profile" className="flex items-center space-x-1 text-broto-yellow hover:text-white transition duration-300">
                                    <User className="w-4 h-4" />
                                    <span className="text-xs font-semibold">Profile</span>
                                </Link>
                                <button onClick={logout} className="border border-broto-yellow text-broto-yellow text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-broto-yellow hover:text-broto-black transition duration-300">Logout</button>
                            </div>
                        ) : (
                            <>
                                <button onClick={openRegister} className="bg-broto-yellow text-broto-black text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-yellow-400 transition duration-300">Register</button>
                                <button onClick={openLogin} className="border border-broto-yellow text-broto-yellow text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-broto-yellow hover:text-broto-black transition duration-300">Login</button>
                            </>
                        )}
                        <Link to="/#book-lesson" className="bg-broto-yellow text-broto-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition duration-300">Book Lesson</Link>
                    </div>
                </div>
            </div>

            {/* Search Panel */}
            {searchOpen && (
                <div className="bg-broto-dark border-b border-broto-yellow py-3 z-30">
                    <div className="max-w-7xl mx-auto px-4 flex">
                        <input ref={searchInputRef} type="text" placeholder="Search courses, locations, or instructors..."
                            className="w-full bg-broto-black text-white p-2 rounded-lg border border-broto-grey focus:ring-broto-yellow focus:border-broto-yellow outline-none" />
                    </div>
                </div>
            )}

            {/* Main Nav */}
            <nav className="bg-broto-black border-b border-broto-grey sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Mobile Menu Button */}
                        <button onClick={() => setMobileOpen(p => !p)} className="inline-flex items-center justify-center p-2 rounded-md text-broto-yellow lg:hidden order-3">
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Logo */}
                        <div className="flex items-center justify-center lg:justify-start order-2 lg:order-none flex-1 lg:flex-none">
                            <img src="/logo.png" alt="Golden Hands Logo" className="w-14 h-14 lg:w-16 lg:h-16 mr-2 lg:mr-3 object-contain" />
                            <Link to="/" className="text-xl lg:text-2xl font-extrabold tracking-widest">
                                <span className="text-white">GOLDEN</span>
                                <span className="text-broto-yellow">HANDS</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex space-x-6 xl:space-x-8 text-sm font-medium order-3">
                            <Link to="/" className="hover:text-broto-yellow transition duration-300">Home</Link>

                            {/* Services Dropdown */}
                            <div className="relative group">
                                <button
                                    onClick={() => setServicesOpen(p => !p)}
                                    onBlur={() => setTimeout(() => setServicesOpen(false), 200)}
                                    className="flex items-center hover:text-broto-yellow transition duration-300"
                                >
                                    Services <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`dropdown-menu absolute left-0 mt-4 w-64 bg-broto-grey rounded-lg shadow-xl z-50 ${servicesOpen ? 'active' : ''}`}>
                                    <div className="py-2">
                                        {[
                                            { to: '/services/driving-training', label: 'Driving Training' },
                                            { to: '/services/driving-license', label: 'Driving Licence' },
                                            { to: '/services/car-buying', label: 'Car Buying Consultant' },
                                            { to: '/services/pdi', label: 'Pre-Delivery Inspection (PDI)' },
                                            { to: '/services/rto-services', label: 'RTO Service' },
                                        ].map(item => (
                                            <Link key={item.to} to={item.to} onClick={() => setServicesOpen(false)}
                                                className="block px-4 py-2 text-sm hover:bg-broto-dark hover:text-broto-yellow transition duration-200">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link to="/about" className="hover:text-broto-yellow transition duration-300">About</Link>
                            <Link to="/gallery" className="hover:text-broto-yellow transition duration-300">Gallery</Link>
                            <Link to="/contact" className="hover:text-broto-yellow transition duration-300">Contact</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="text-broto-yellow font-bold hover:text-white transition duration-300">Admin Panel</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div id="mobile-menu-drawer" className={`fixed top-0 right-0 w-64 h-full bg-broto-dark p-6 z-50 shadow-2xl lg:hidden ${mobileOpen ? 'active' : ''}`}>
                <div className="flex justify-end mb-8">
                    <button onClick={() => setMobileOpen(false)} className="text-broto-yellow hover:text-white">
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <div className="flex items-center mb-8">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-3 object-contain" />
                    <Link to="/" onClick={handleNavClick} className="text-xl font-extrabold tracking-widest">
                        <span className="text-white">GOLDEN</span>
                        <span className="text-broto-yellow">HANDS</span>
                    </Link>
                </div>
                <div className="space-y-4 text-lg font-medium">
                    <Link to="/" onClick={handleNavClick} className="block hover:text-broto-yellow transition duration-300">Home</Link>
                    <div className="relative">
                        <button onClick={() => setMobileServicesOpen(p => !p)} className="flex items-center justify-between w-full hover:text-broto-yellow transition duration-300">
                            <span>Services</span>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div id="mobile-services-dropdown" className={`dropdown-menu pl-4 mt-2 space-y-3 ${mobileServicesOpen ? 'active' : ''}`}>
                            {[
                                { to: '/services/driving-training', label: 'Driving Training' },
                                { to: '/services/driving-license', label: 'Driving Licence' },
                                { to: '/services/car-buying', label: 'Car Buying Consultant' },
                                { to: '/services/pdi', label: 'Pre-Delivery Inspection (PDI)' },
                                { to: '/services/rto-services', label: 'RTO Service' },
                            ].map(item => (
                                <Link key={item.to} to={item.to} onClick={handleNavClick}
                                    className="block text-gray-400 hover:text-broto-yellow transition duration-300">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link to="/about" onClick={handleNavClick} className="block hover:text-broto-yellow transition duration-300">About</Link>
                    <Link to="/gallery" onClick={handleNavClick} className="block hover:text-broto-yellow transition duration-300">Gallery</Link>
                    <Link to="/contact" onClick={handleNavClick} className="block hover:text-broto-yellow transition duration-300">Contact</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" onClick={handleNavClick} className="block text-broto-yellow font-bold border-t border-broto-grey pt-4">Admin Dashboard</Link>
                    )}
                    <div className="pt-4 border-t border-broto-grey space-y-2">
                        {user ? (
                            <>
                                <p className="text-broto-yellow text-sm">Signed in as {user.name}</p>
                                <button onClick={() => { logout(); setMobileOpen(false) }} className="w-full text-left text-broto-yellow hover:text-white">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={openLogin} className="w-full text-left text-broto-yellow hover:text-white">Login</button>
                                <button onClick={openRegister} className="w-full text-left text-broto-yellow hover:text-white">Register</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile overlay */}
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

            {/* Auth Modal */}
            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authTab} />
        </>
    )
}

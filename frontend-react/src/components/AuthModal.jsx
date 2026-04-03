import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }) {
    const [tab, setTab] = useState(defaultTab)
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [regData, setRegData] = useState({ name: '', email: '', phone: '', password: '' })
    const { login, register } = useAuth()

    if (!isOpen) return null

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(loginData.email, loginData.password)
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register(regData)
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-broto-dark border border-broto-grey rounded-2xl p-8 w-full max-w-md shadow-2xl z-10">
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-broto-yellow transition">
                    <X className="w-6 h-6" />
                </button>

                {/* Logo */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold tracking-widest">
                        <span className="text-white">GOLDEN</span>
                        <span className="text-broto-yellow">HANDS</span>
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex mb-6 bg-broto-black rounded-xl p-1">
                    <button onClick={() => { setTab('login'); setError('') }}
                        className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tab === 'login' ? 'bg-broto-yellow text-broto-black' : 'text-gray-400 hover:text-white'}`}>
                        Login
                    </button>
                    <button onClick={() => { setTab('register'); setError('') }}
                        className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tab === 'register' ? 'bg-broto-yellow text-broto-black' : 'text-gray-400 hover:text-white'}`}>
                        Register
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                {tab === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input type="email" required value={loginData.email}
                                onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition"
                                placeholder="you@example.com" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input type={showPass ? 'text' : 'password'} required value={loginData.password}
                                onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition pr-12"
                                placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-9 text-gray-400 hover:text-broto-yellow">
                                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-broto-yellow text-broto-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                )}

                {/* Register Form */}
                {tab === 'register' && (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input type="text" required value={regData.name}
                                onChange={e => setRegData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition"
                                placeholder="Your Full Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input type="email" required value={regData.email}
                                onChange={e => setRegData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition"
                                placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                            <input type="tel" required value={regData.phone}
                                onChange={e => setRegData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition"
                                placeholder="10-digit mobile number" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input type={showPass ? 'text' : 'password'} required minLength={6} value={regData.password}
                                onChange={e => setRegData(p => ({ ...p, password: e.target.value }))}
                                className="w-full bg-broto-black text-white p-3 rounded-xl border border-broto-grey focus:border-broto-yellow focus:outline-none transition pr-12"
                                placeholder="Min. 6 characters" />
                            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-9 text-gray-400 hover:text-broto-yellow">
                                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-broto-yellow text-broto-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

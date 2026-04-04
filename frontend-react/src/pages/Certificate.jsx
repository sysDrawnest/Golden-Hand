import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Printer, ArrowLeft } from 'lucide-react'
import api from '../services/api'

export default function Certificate() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me')
                setUserData(res.data.user)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-broto-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!userData || userData.trainingProgress < 14) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Certificate Not Available</h1>
                <p className="text-gray-700 mb-6">You must complete the 14-day practical training to unlock your certificate.</p>
                <button onClick={() => navigate('/profile')} className="px-6 py-2 bg-broto-black text-white rounded hover:bg-gray-800 transition">
                    Return to Profile
                </button>
            </div>
        )
    }

    const handlePrint = () => {
        window.print()
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen bg-gray-200 py-10 flex flex-col items-center justify-center">
            {/* Actions Toolbar - Hidden when printing */}
            <div className="max-w-5xl w-full flex justify-between items-center mb-6 px-4 print:hidden">
                <button onClick={() => navigate('/profile')} className="flex items-center text-gray-700 hover:text-black transition">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
                </button>
                <button onClick={handlePrint} className="flex items-center bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 shadow transition">
                    <Printer className="w-5 h-5 mr-2" /> Print / Save as PDF
                </button>
            </div>

            {/* Certificate Container */}
            <div className="w-full max-w-[1100px] overflow-auto px-4 print:p-0 print:overflow-visible">
                <div className="bg-white p-2 min-w-[800px] mx-auto shadow-2xl print:shadow-none" style={{ aspectRatio: '1.414/1' /* A4 landscape approx */ }}>
                    {/* Inner Border */}
                    <div className="w-full h-full border-[15px] border-double border-[#d4af37] p-8 relative flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">

                        {/* Corner Ornaments */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#d4af37]"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#d4af37]"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#d4af37]"></div>
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#d4af37]"></div>

                        {/* Logo & Header */}
                        <div className="text-center mb-8">
                            <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
                            <h1 className="text-5xl font-black text-gray-900 tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>Certificate</h1>
                            <h2 className="text-2xl font-light text-gray-600 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: 'Georgia, serif' }}>of Completion</h2>
                        </div>

                        {/* Presentation Text */}
                        <div className="text-center mb-10">
                            <p className="text-xl text-gray-500 italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>This is to certify that</p>
                            <h3 className="text-6xl font-bold text-[#d4af37] border-b-2 border-gray-300 pb-2 px-12 inline-block" style={{ fontFamily: '"Great Vibes", cursive, Georgia, serif' }}>
                                {userData.name}
                            </h3>
                        </div>

                        {/* Description */}
                        <div className="text-center max-w-3xl mb-16">
                            <p className="text-xl text-gray-800 leading-relaxed font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                                Has successfully completed the comprehensive <strong className="text-gray-900">14-Day Practical Driving Training Program</strong> at Golden Hands Driving School.
                                The bearer has demonstrated exceptional skill, road safety awareness, and technical control in compliance with all instructional requirements.
                            </p>
                        </div>

                        {/* Signatures & Seal */}
                        <div className="w-full flex justify-between items-end px-16 mt-auto">
                            <div className="text-center w-64 border-t border-gray-400 pt-2">
                                <p className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>{currentDate}</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Date of Issue</p>
                            </div>

                            {/* Seal */}
                            <div className="w-32 h-32 rounded-full border-4 border-[#d4af37] bg-yellow-50 flex items-center justify-center p-2 relative -top-6 transform shadow-lg">
                                <div className="w-full h-full rounded-full border border-dashed border-[#d4af37] flex flex-col items-center justify-center space-y-1">
                                    <span className="text-xs font-bold text-[#d4af37] tracking-widest">GOLDEN</span>
                                    <img src="/logo.png" className="w-8 h-8 opacity-80" alt="Seal" />
                                    <span className="text-xs font-bold text-[#d4af37] tracking-widest">HANDS</span>
                                </div>
                            </div>

                            <div className="text-center w-64 border-t border-gray-400 pt-2 relative">
                                {/* Simulated signature */}
                                <div className="absolute -top-12 left-0 w-full text-4xl text-gray-700 opacity-80" style={{ fontFamily: '"Kristi", cursive, Georgia, serif' }}>
                                    Chief Instructor
                                </div>
                                <p className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>Head Instructor</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Golden Hands</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Import cursive font for certificate effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
            @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Kristi&display=swap');

            @media print {
                @page {size: landscape; margin: 0; }
            body {background: white !important; margin: 0; padding: 0; }
            ::-webkit-scrollbar {display: none; }
                }
            `}} />
        </div>
    )
}

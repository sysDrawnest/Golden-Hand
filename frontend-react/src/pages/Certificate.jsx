// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Printer, ArrowLeft } from 'lucide-react'
// import api from '../services/api'

// export default function Certificate() {
//     const navigate = useNavigate()
//     const [userData, setUserData] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const res = await api.get('/auth/me')
//                 setUserData(res.data.user)
//             } catch (err) {
//                 console.error(err)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchProfile()
//     }, [])

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <div className="w-16 h-16 border-4 border-broto-yellow border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         )
//     }

//     if (!userData || userData.trainingProgress < 14) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
//                 <h1 className="text-3xl font-bold text-red-600 mb-4">Certificate Not Available</h1>
//                 <p className="text-gray-700 mb-6">You must complete the 14-day practical training to unlock your certificate.</p>
//                 <button onClick={() => navigate('/profile')} className="px-6 py-2 bg-broto-black text-white rounded hover:bg-gray-800 transition">
//                     Return to Profile
//                 </button>
//             </div>
//         )
//     }

//     const handlePrint = () => {
//         window.print()
//     }

//     const currentDate = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     })

//     return (
//         <div className="min-h-screen bg-gray-200 py-10 flex flex-col items-center justify-center">
//             {/* Actions Toolbar - Hidden when printing */}
//             <div className="max-w-5xl w-full flex justify-between items-center mb-6 px-4 print:hidden">
//                 <button onClick={() => navigate('/profile')} className="flex items-center text-gray-700 hover:text-black transition">
//                     <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
//                 </button>
//                 <button onClick={handlePrint} className="flex items-center bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 shadow transition">
//                     <Printer className="w-5 h-5 mr-2" /> Print / Save as PDF
//                 </button>
//             </div>

//             {/* Certificate Container */}
//             <div className="w-full max-w-[1100px] overflow-auto px-4 print:p-0 print:overflow-visible">
//                 <div className="bg-white p-2 min-w-[800px] mx-auto shadow-2xl print:shadow-none" style={{ aspectRatio: '1.414/1' /* A4 landscape approx */ }}>
//                     {/* Inner Border */}
//                     <div className="w-full h-full border-[15px] border-double border-[#d4af37] p-8 relative flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">

//                         {/* Corner Ornaments */}
//                         <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#d4af37]"></div>
//                         <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#d4af37]"></div>
//                         <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#d4af37]"></div>
//                         <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#d4af37]"></div>

//                         {/* Logo & Header */}
//                         <div className="text-center mb-8">
//                             <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
//                             <h1 className="text-5xl font-black text-gray-900 tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>Certificate</h1>
//                             <h2 className="text-2xl font-light text-gray-600 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: 'Georgia, serif' }}>of Completion</h2>
//                         </div>

//                         {/* Presentation Text */}
//                         <div className="text-center mb-10">
//                             <p className="text-xl text-gray-500 italic mb-6" style={{ fontFamily: 'Georgia, serif' }}>This is to certify that</p>
//                             <h3 className="text-6xl font-bold text-[#d4af37] border-b-2 border-gray-300 pb-2 px-12 inline-block" style={{ fontFamily: '"Great Vibes", cursive, Georgia, serif' }}>
//                                 {userData.name}
//                             </h3>
//                         </div>

//                         {/* Description */}
//                         <div className="text-center max-w-3xl mb-16">
//                             <p className="text-xl text-gray-800 leading-relaxed font-medium" style={{ fontFamily: 'Georgia, serif' }}>
//                                 Has successfully completed the comprehensive <strong className="text-gray-900">14-Day Practical Driving Training Program</strong> at Golden Hands Driving School.
//                                 The bearer has demonstrated exceptional skill, road safety awareness, and technical control in compliance with all instructional requirements.
//                             </p>
//                         </div>

//                         {/* Signatures & Seal */}
//                         <div className="w-full flex justify-between items-end px-16 mt-auto">
//                             <div className="text-center w-64 border-t border-gray-400 pt-2">
//                                 <p className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>{currentDate}</p>
//                                 <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Date of Issue</p>
//                             </div>

//                             {/* Seal */}
//                             <div className="w-32 h-32 rounded-full border-4 border-[#d4af37] bg-yellow-50 flex items-center justify-center p-2 relative -top-6 transform shadow-lg">
//                                 <div className="w-full h-full rounded-full border border-dashed border-[#d4af37] flex flex-col items-center justify-center space-y-1">
//                                     <span className="text-xs font-bold text-[#d4af37] tracking-widest">GOLDEN</span>
//                                     <img src="/logo.png" className="w-8 h-8 opacity-80" alt="Seal" />
//                                     <span className="text-xs font-bold text-[#d4af37] tracking-widest">HANDS</span>
//                                 </div>
//                             </div>

//                             <div className="text-center w-64 border-t border-gray-400 pt-2 relative">
//                                 {/* Simulated signature */}
//                                 <div className="absolute -top-12 left-0 w-full text-4xl text-gray-700 opacity-80" style={{ fontFamily: '"Kristi", cursive, Georgia, serif' }}>
//                                     Chief Instructor
//                                 </div>
//                                 <p className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>Head Instructor</p>
//                                 <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Golden Hands</p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* Import cursive font for certificate effect */}
//             <style dangerouslySetInnerHTML={{
//                 __html: `
//             @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Kristi&display=swap');

//             @media print {
//                 @page {size: landscape; margin: 0; }
//             body {background: white !important; margin: 0; padding: 0; }
//             ::-webkit-scrollbar {display: none; }
//                 }
//             `}} />
//         </div>
//     )
// }

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Printer, ArrowLeft, Download, Award, Calendar, User, BookOpen, CheckCircle } from 'lucide-react'
import api from '../services/api'

export default function Certificate() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [certificateId, setCertificateId] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me')
                setUserData(res.data.user)
                // Generate a unique certificate ID
                const id = `GH-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
                setCertificateId(id)
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!userData || userData.trainingProgress < 14) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Certificate Not Available</h1>
                    <p className="text-gray-600 mb-6">
                        You must complete the 14-day practical training to unlock your certificate.
                        <br />
                        <span className="text-sm text-gray-500 mt-2 block">
                            Current Progress: {userData?.trainingProgress || 0}/14 days
                        </span>
                    </p>
                    <button
                        onClick={() => navigate('/profile')}
                        className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Return to Profile
                    </button>
                </div>
            </div>
        )
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        // Trigger print which can be saved as PDF
        window.print()
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-8 flex flex-col items-center justify-center">
            {/* Actions Toolbar - Hidden when printing */}
            <div className="max-w-5xl w-full flex justify-between items-center mb-6 px-4 print:hidden">
                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Profile
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Printer className="w-5 h-5" /> Print Certificate
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8960c] text-white rounded-lg hover:from-[#c4a234] hover:to-[#a07e0a] shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Download className="w-5 h-5" /> Save as PDF
                    </button>
                </div>
            </div>

            {/* Certificate Container - A4 Landscape */}
            <div className="certificate-container">
                <div className="certificate print:shadow-none">
                    {/* Decorative Border */}
                    <div className="certificate-border">
                        {/* Outer decorative border */}
                        <div className="absolute inset-3 border border-[#d4af37]/30 rounded-lg pointer-events-none"></div>

                        {/* Corner Ornaments */}
                        <div className="absolute top-6 left-6 w-16 h-16">
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#d4af37] rounded-tl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#d4af37] rounded-br-lg"></div>
                            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/50"></div>
                        </div>
                        <div className="absolute top-6 right-6 w-16 h-16">
                            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#d4af37] rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#d4af37] rounded-bl-lg"></div>
                            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/50"></div>
                        </div>
                        <div className="absolute bottom-6 left-6 w-16 h-16">
                            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#d4af37] rounded-bl-lg"></div>
                            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#d4af37] rounded-tr-lg"></div>
                            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/50"></div>
                        </div>
                        <div className="absolute bottom-6 right-6 w-16 h-16">
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#d4af37] rounded-br-lg"></div>
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#d4af37] rounded-tl-lg"></div>
                            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/50"></div>
                        </div>

                        {/* Decorative top bar */}
                        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

                        {/* Logo & Header */}
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl"></div>
                                <img src="/logo.png" alt="Golden Hands Logo" className="relative w-20 h-20 mx-auto mb-3 object-contain" />
                            </div>
                            <h1 className="certificate-title">Certificate</h1>
                            <h2 className="certificate-subtitle">of Completion</h2>
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3"></div>
                        </div>

                        {/* Certificate Body */}
                        <div className="certificate-body">
                            <p className="presentation-text">This is to certify that</p>

                            <div className="recipient-name-container">
                                <div className="recipient-decoration-left"></div>
                                <h3 className="recipient-name">{userData.name}</h3>
                                <div className="recipient-decoration-right"></div>
                            </div>

                            {/* Achievement Icons */}
                            <div className="flex justify-center gap-6 my-4">
                                <div className="flex items-center gap-1 text-[#d4af37] text-sm">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>14 Days Training</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#d4af37] text-sm">
                                    <Award className="w-4 h-4" />
                                    <span>Practical Exam</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#d4af37] text-sm">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Road Safety</span>
                                </div>
                            </div>

                            <div className="description-text">
                                <p>
                                    Has successfully completed the comprehensive <strong>14-Day Practical Driving Training Program</strong> at
                                    <span className="school-name"> Golden Hands Driving School</span>.
                                </p>
                                <p className="mt-3">
                                    Throughout this intensive program, the bearer has demonstrated exceptional skill in vehicle control,
                                    <strong> road safety awareness</strong>, defensive driving techniques, and compliance with all
                                    instructional requirements. The candidate has passed both theoretical knowledge assessments
                                    and practical driving examinations with distinction.
                                </p>
                            </div>

                            {/* Skills Badges */}
                            <div className="skills-section">
                                <span className="skill-badge">Vehicle Control</span>
                                <span className="skill-badge">Traffic Rules</span>
                                <span className="skill-badge">Parking Mastery</span>
                                <span className="skill-badge">Highway Driving</span>
                                <span className="skill-badge">Emergency Handling</span>
                                <span className="skill-badge">Night Driving</span>
                            </div>
                        </div>

                        {/* Footer with Signatures & Seal */}
                        <div className="certificate-footer">
                            <div className="footer-left">
                                <div className="date-box">
                                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                                    <p className="date-value">{currentDate}</p>
                                    <p className="date-label">Date of Issue</p>
                                </div>
                                <div className="certificate-id">
                                    <span>Certificate ID: </span>
                                    <span className="font-mono text-xs">{certificateId}</span>
                                </div>
                            </div>

                            {/* Official Seal */}
                            <div className="seal-container">
                                <div className="seal-outer">
                                    <div className="seal-inner">
                                        <span className="seal-text-top">GOLDEN</span>
                                        <div className="seal-icon">★</div>
                                        <span className="seal-text-bottom">HANDS</span>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-right">
                                <div className="signature-area">
                                    <div className="signature-line"></div>
                                    <div className="signature-name">Michael Rodriguez</div>
                                    <p className="signature-title">Chief Instructor</p>
                                </div>
                                <div className="signature-area">
                                    <div className="signature-line"></div>
                                    <div className="signature-name">Sarah Chen</div>
                                    <p className="signature-title">Director of Training</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer text */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <p className="text-[8px] text-gray-400 tracking-wider">Golden Hands Driving School • Est. 2010 • Accredited Driving Institution</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinema&family=Playfair+Display:wght@400;600;700;900&display=swap');

                    .certificate-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }

                    .certificate {
                        width: 1100px;
                        background: white;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                        border-radius: 4px;
                        position: relative;
                    }

                    .certificate-border {
                        background: linear-gradient(135deg, #fffef7 0%, #fff9e8 100%);
                        padding: 40px 50px 50px 50px;
                        position: relative;
                        border-radius: 4px;
                    }

                    .certificate-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 56px;
                        font-weight: 900;
                        letter-spacing: 8px;
                        color: #1a1a1a;
                        text-transform: uppercase;
                        margin: 0;
                        background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .certificate-subtitle {
                        font-family: 'Playfair Display', serif;
                        font-size: 22px;
                        font-weight: 300;
                        letter-spacing: 6px;
                        color: #d4af37;
                        text-transform: uppercase;
                        margin-top: -5px;
                    }

                    .presentation-text {
                        font-family: 'Playfair Display', serif;
                        font-size: 20px;
                        color: #666;
                        font-style: italic;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .recipient-name-container {
                        position: relative;
                        text-align: center;
                        margin: 20px 0 15px 0;
                    }

                    .recipient-name {
                        font-family: 'Great Vibes', cursive;
                        font-size: 64px;
                        font-weight: 600;
                        color: #d4af37;
                        display: inline-block;
                        padding: 0 30px;
                        margin: 0;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                    }

                    .recipient-decoration-left,
                    .recipient-decoration-right {
                        position: absolute;
                        top: 50%;
                        width: 80px;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #d4af37, transparent);
                    }

                    .recipient-decoration-left {
                        left: 0;
                        transform: translateY(-50%);
                    }

                    .recipient-decoration-right {
                        right: 0;
                        transform: translateY(-50%);
                    }

                    .description-text {
                        font-family: 'Playfair Display', serif;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #444;
                        text-align: center;
                        max-width: 85%;
                        margin: 20px auto;
                    }

                    .school-name {
                        color: #d4af37;
                        font-weight: bold;
                    }

                    .skills-section {
                        display: flex;
                        justify-content: center;
                        gap: 12px;
                        flex-wrap: wrap;
                        margin: 25px 0 15px 0;
                    }

                    .skill-badge {
                        background: linear-gradient(135deg, #f5f0e0 0%, #ede5d0 100%);
                        color: #8B7355;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 11px;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                        border: 1px solid #d4af37/30;
                    }

                    .certificate-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #f0e6d0;
                        position: relative;
                    }

                    .footer-left {
                        text-align: center;
                        width: 200px;
                    }

                    .date-box {
                        background: #faf8f0;
                        padding: 8px 15px;
                        border-radius: 12px;
                        border: 1px solid #e8dcc8;
                    }

                    .date-value {
                        font-family: 'Playfair Display', serif;
                        font-size: 14px;
                        font-weight: 600;
                        color: #333;
                        margin: 4px 0;
                    }

                    .date-label {
                        font-size: 9px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        color: #999;
                    }

                    .certificate-id {
                        font-size: 9px;
                        color: #999;
                        margin-top: 10px;
                        letter-spacing: 0.5px;
                    }

                    .seal-container {
                        width: 100px;
                        height: 100px;
                        position: relative;
                        margin-bottom: -15px;
                    }

                    .seal-outer {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        border: 3px solid #d4af37;
                        background: linear-gradient(135deg, #fff9e8 0%, #fff4e0 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }

                    .seal-inner {
                        width: 88%;
                        height: 88%;
                        border-radius: 50%;
                        border: 1px dashed #d4af37;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }

                    .seal-text-top, .seal-text-bottom {
                        font-size: 9px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        color: #d4af37;
                    }

                    .seal-icon {
                        font-size: 24px;
                        color: #d4af37;
                        margin: 4px 0;
                    }

                    .footer-right {
                        display: flex;
                        gap: 40px;
                        width: 280px;
                    }

                    .signature-area {
                        text-align: center;
                        width: 120px;
                    }

                    .signature-line {
                        width: 100%;
                        height: 1px;
                        background: #333;
                        margin-bottom: 6px;
                    }

                    .signature-name {
                        font-family: 'Great Vibes', cursive;
                        font-size: 18px;
                        color: #333;
                    }

                    .signature-title {
                        font-size: 9px;
                        color: #999;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-top: 2px;
                    }

                    /* Print Styles */
                    @media print {
                        body {
                            background: white !important;
                            margin: 0;
                            padding: 0;
                        }
                        
                        .certificate-container {
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        }
                        
                        .certificate {
                            width: 100%;
                            height: auto;
                            box-shadow: none;
                            margin: 0;
                            padding: 0;
                        }
                        
                        .certificate-border {
                            padding: 30px 40px 40px 40px;
                        }
                        
                        @page {
                            size: A4 landscape;
                            margin: 0.5cm;
                        }
                        
                        .print\\:hidden {
                            display: none !important;
                        }
                        
                        .skill-badge {
                            print-color-adjust: exact;
                            -webkit-print-color-adjust: exact;
                        }
                        
                        .seal-outer, .seal-inner {
                            print-color-adjust: exact;
                            -webkit-print-color-adjust: exact;
                        }
                    }

                    @media (max-width: 1200px) {
                        .certificate {
                            transform: scale(0.9);
                            transform-origin: center;
                        }
                    }

                    @media (max-width: 1000px) {
                        .certificate {
                            transform: scale(0.8);
                        }
                    }
                `
            }} />
        </div>
    )
}
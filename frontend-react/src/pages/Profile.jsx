import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, Clock, FileCheck, LogOut, CheckCircle2, Edit2, Save, X } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
    const { logout } = useAuth()
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({ name: '', phone: '' })
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/me')
                setProfileData(res.data.user)
                setEditForm({ name: res.data.user.name, phone: res.data.user.phone })
            } catch (err) {
                setError('Failed to load profile data.')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleSave = async () => {
        setSaveLoading(true)
        setError('')
        try {
            const res = await api.put('/auth/me', editForm)
            setProfileData(res.data.user)
            setIsEditing(false)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.')
        } finally {
            setSaveLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="pt-24 pb-12 min-h-screen bg-broto-dark text-white flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-broto-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!profileData) {
        return (
            <div className="pt-24 pb-12 min-h-screen bg-broto-dark text-white flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'User not found'}</h2>
                <button onClick={logout} className="text-broto-yellow hover:underline">Return to Home</button>
            </div>
        )
    }

    const { name, email, phone, trainingProgress = 0, trainingStatus = 'pending', certificateIssued = false } = profileData
    const progressPercentage = Math.min((trainingProgress / 14) * 100, 100)

    return (
        <div className="pt-24 pb-16 min-h-screen bg-broto-dark text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Profile Info */}
                <div className="bg-broto-black border border-broto-grey rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-auto">
                        <div className="w-24 h-24 bg-broto-yellow text-broto-black rounded-full flex items-center justify-center text-4xl font-black mb-4 shadow-[0_0_15px_rgba(255,193,7,0.4)]">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        {isEditing ? (
                            <div className="flex flex-col w-full space-y-3 mt-2">
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="bg-broto-dark border border-broto-grey rounded p-2 text-white focus:outline-none focus:border-broto-yellow"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={e => setEditForm({ ...editForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                    className="bg-broto-dark border border-broto-grey rounded p-2 text-white focus:outline-none focus:border-broto-yellow"
                                    placeholder="Phone Number"
                                />
                                <p className="text-gray-500 text-sm">{email} (Email cannot be changed)</p>
                                <div className="flex space-x-3 pt-2">
                                    <button onClick={handleSave} disabled={saveLoading} className="flex-1 bg-broto-yellow text-black font-bold py-2 rounded flex justify-center items-center">
                                        {saveLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save</>}
                                    </button>
                                    <button onClick={() => { setIsEditing(false); setError(''); setEditForm({ name, phone }) }} className="flex-1 border border-gray-500 text-gray-300 py-2 rounded flex justify-center items-center">
                                        <X className="w-4 h-4 mr-2" /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center">
                                    <h1 className="text-3xl font-extrabold tracking-wider mr-3">{name}</h1>
                                    <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-broto-yellow transition">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-gray-400 mt-1">{email}</p>
                                <p className="text-gray-400">{phone}</p>
                            </>
                        )}
                    </div>
                    {!isEditing && (
                        <button onClick={logout} className="flex items-center text-broto-yellow border border-broto-yellow px-4 py-2 rounded-lg hover:bg-broto-yellow hover:text-broto-black transition-all">
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                    )}
                </div>

                {/* Training Status Card */}
                <div className="bg-broto-black border border-broto-grey rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-broto-yellow">
                        <Award className="w-6 h-6 mr-2" /> Training Progress Tracker
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-broto-grey">
                            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">Status</p>
                            <p className="font-bold text-lg capitalize">{trainingStatus.replace('_', ' ')}</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[rgba(255,193,7,0.3)] shadow-[0_0_15px_rgba(255,193,7,0.1)]">
                            <CheckCircle2 className="w-8 h-8 text-broto-yellow mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">Days Completed</p>
                            <p className="font-bold text-3xl text-broto-yellow">{trainingProgress} <span className="text-lg text-gray-400">/ 14</span></p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-broto-grey">
                            <FileCheck className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">Certificate</p>
                            <p className="font-bold text-lg">{certificateIssued ? 'Issued' : 'Pending'}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-gray-300 font-medium">14-Day Practical Course</p>
                            <p className="text-broto-yellow font-bold text-xl">{Math.round(progressPercentage)}%</p>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-4 relative overflow-hidden">
                            <div
                                className="bg-broto-yellow h-4 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progressStripes_1s_linear_infinite]"></div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-3">
                            {trainingProgress === 14
                                ? "Training completed! You are ready for the road."
                                : `${14 - trainingProgress} days remaining until completion. Keep up the good work!`}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="text-center bg-[#1a1a1a] rounded-xl p-8 border border-broto-grey">
                        {trainingProgress === 14 ? (
                            <>
                                <h3 className="text-xl font-bold text-green-400 mb-2">Congratulations!</h3>
                                <p className="text-gray-400 mb-6 max-w-lg mx-auto">You have successfully completed your 14 days of practical driving training. Your road to independence starts now.</p>
                                <Link to="/certificate" className="inline-flex items-center justify-center bg-broto-yellow text-broto-black font-bold text-lg px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                                    <FileCheck className="w-5 h-5 mr-2" /> Download Certificate
                                </Link>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-white mb-2">Keep Learning!</h3>
                                <p className="text-gray-400 mb-6 max-w-lg mx-auto">Your instructor will update your progress after each day's lesson. Check back here to track your journey.</p>
                                <button disabled className="inline-flex items-center justify-center bg-gray-800 text-gray-500 font-bold px-8 py-3 rounded-lg cursor-not-allowed border border-gray-700">
                                    Certificate Locked
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes progressStripes {
                    0% { background-position: 1rem 0; }
                    100% { background-position: 0 0; }
                }
            `}} />
        </div>
    )
}

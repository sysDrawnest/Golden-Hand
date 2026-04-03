import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, BookOpen, DollarSign, MessageSquare, LogOut, CheckCircle, XCircle, Clock, Eye } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-broto-dark p-6 rounded-2xl border border-broto-grey flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-white font-black text-3xl">{value ?? '—'}</p>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    const { user, logout } = useAuth()
    const [tab, setTab] = useState('overview')
    const [stats, setStats] = useState(null)
    const [bookings, setBookings] = useState([])
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    const fetchData = async () => {
        api.get('/admin/stats').then(r => setStats(r.data)).catch(() => { })
        api.get('/bookings/all').then(r => setBookings(r.data)).catch(() => { })
        api.get('/contact/all').then(r => setMessages(r.data)).catch(() => { })
        api.get('/admin/users').then(r => setUsers(r.data)).catch(() => { })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleUpdateBookingStatus = async (bookingId, status) => {
        if (!window.confirm(`Mark this booking as ${status}?`)) return
        try {
            await api.put('/bookings/update-status', { bookingId, status })
            fetchData()
        } catch (err) { alert('Failed to update status') }
    }

    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Delete this booking permanently?')) return
        try {
            await api.delete(`/bookings/${id}`)
            fetchData()
        } catch (err) { alert('Failed to delete booking') }
    }

    const handleToggleUserStatus = async (id) => {
        try {
            await api.patch(`/admin/users/${id}/status`)
            fetchData()
        } catch (err) { alert('Failed to update user status') }
    }

    const handleUpdateProgress = async (id, currentProgress, change) => {
        let newProgress = currentProgress + change;
        if (newProgress < 0) newProgress = 0;
        if (newProgress > 14) newProgress = 14;

        let status = 'in_progress';
        let certificateIssued = false;

        if (newProgress === 0) status = 'pending';
        if (newProgress === 14) {
            status = 'completed';
            certificateIssued = true;
        }

        try {
            await api.put(`/admin/users/${id}/progress`, { trainingProgress: newProgress, trainingStatus: status, certificateIssued });
            fetchData();
        } catch (err) { alert('Failed to update progress') }
    }

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Delete this user permanently? All their data will be removed.')) return
        try {
            await api.delete(`/admin/users/${id}`)
            fetchData()
        } catch (err) { alert('Failed to delete user') }
    }

    const handleMarkAsRead = async (id) => {
        try {
            await api.patch(`/admin/messages/${id}/read`)
            fetchData()
        } catch (err) { }
    }

    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Remove this message?')) return
        try {
            await api.delete(`/admin/messages/${id}`)
            fetchData()
        } catch (err) { alert('Failed to delete message') }
    }

    const statusBadge = (status) => {
        const map = {
            pending: 'bg-yellow-900/30 text-yellow-400 border-yellow-400',
            confirmed: 'bg-green-900/30 text-green-400 border-green-400',
            cancelled: 'bg-red-900/30 text-red-400 border-red-400',
        }
        return <span className={`text-xs px-2 py-1 rounded-full border ${map[status] || 'bg-gray-700 text-gray-400'}`}>{status}</span>
    }

    return (
        <div className="min-h-screen bg-broto-black text-white">
            {/* Admin Nav */}
            <nav className="bg-broto-dark border-b border-broto-grey px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-black tracking-widest"><span className="text-white">GOLDEN</span><span className="text-broto-yellow">HANDS</span> <span className="text-gray-400 font-normal text-sm ml-2">Admin Dashboard</span></Link>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">Hi, {user?.name}</span>
                    <button onClick={logout} className="flex items-center text-sm text-broto-yellow hover:text-white transition">
                        <LogOut className="w-4 h-4 mr-1" /> Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Tab switcher */}
                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {['overview', 'bookings', 'users', 'messages'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm capitalize whitespace-nowrap transition ${tab === t ? 'bg-broto-yellow text-broto-black' : 'bg-broto-dark text-gray-300 hover:text-white'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {tab === 'overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard icon={Users} label="Total Users" value={stats?.totalUsers} color="bg-blue-900/30 text-blue-400" />
                            <StatCard icon={BookOpen} label="Total Bookings" value={stats?.totalBookings} color="bg-broto-yellow/20 text-broto-yellow" />
                            <StatCard icon={DollarSign} label="Total Revenue" value={stats?.totalRevenue ? `₹${stats.totalRevenue}` : '₹0'} color="bg-green-900/30 text-green-400" />
                            <StatCard icon={MessageSquare} label="New Messages" value={stats?.newMessages} color="bg-purple-900/30 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-broto-yellow">Recent Bookings</h2>
                            <BookingsTable bookings={bookings.slice(0, 5)} statusBadge={statusBadge} onUpdateStatus={handleUpdateBookingStatus} onDelete={handleDeleteBooking} />
                        </div>
                    </div>
                )}

                {/* Bookings */}
                {tab === 'bookings' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-broto-yellow">All Bookings <span className="text-gray-400 text-sm font-normal">({bookings.length})</span></h2>
                        <BookingsTable bookings={bookings} statusBadge={statusBadge} onUpdateStatus={handleUpdateBookingStatus} onDelete={handleDeleteBooking} />
                    </div>
                )}

                {/* Users */}
                {tab === 'users' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-broto-yellow">All Users <span className="text-gray-400 text-sm font-normal">({users.length})</span></h2>
                        <div className="overflow-x-auto rounded-xl">
                            <table className="w-full text-sm bg-broto-dark">
                                <thead className="bg-broto-grey text-broto-yellow uppercase text-xs">
                                    <tr>
                                        {['Name', 'Email', 'Phone', 'Status', 'Progress', 'Joined', 'Actions'].map(h => <th key={h} className="p-4 text-left">{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-broto-grey">
                                    {users.map((u, i) => (
                                        <tr key={i} className="hover:bg-broto-grey/30 transition">
                                            <td className="p-4 font-medium">{u.name} {u.role === 'admin' && <span className="ml-2 text-[10px] bg-broto-yellow text-broto-black px-1 rounded">ADMIN</span>}</td>
                                            <td className="p-4 text-gray-400">{u.email}</td>
                                            <td className="p-4 text-gray-400">{u.phone}</td>
                                            <td className="p-4">
                                                <button onClick={() => handleToggleUserStatus(u._id)} className={`text-xs px-2 py-1 rounded-full border ${u.isActive ? 'border-green-500 text-green-500 hover:bg-green-500/10' : 'border-red-500 text-red-500 hover:bg-red-500/10'}`}>
                                                    {u.isActive ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {u.role === 'user' ? (
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleUpdateProgress(u._id, u.trainingProgress || 0, -1)}
                                                            className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-bold"
                                                        >-</button>
                                                        <span className="w-8 text-center text-white">{u.trainingProgress || 0}/14</span>
                                                        <button
                                                            onClick={() => handleUpdateProgress(u._id, u.trainingProgress || 0, 1)}
                                                            className="w-6 h-6 rounded-full bg-broto-yellow text-black hover:bg-yellow-400 flex items-center justify-center font-bold"
                                                        >+</button>
                                                    </div>
                                                ) : '—'}
                                            </td>
                                            <td className="p-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <button onClick={() => handleDeleteUser(u._id)} disabled={u.role === 'admin'} className="text-red-500 hover:text-white p-1 disabled:opacity-30">
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Messages */}
                {tab === 'messages' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-broto-yellow">Contact Messages <span className="text-gray-400 text-sm font-normal">({messages.length})</span></h2>
                        <div className="space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`bg-broto-dark p-6 rounded-2xl border ${msg.status === 'new' ? 'border-broto-yellow' : 'border-broto-grey'}`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-white">{msg.name} <span className="text-gray-400 font-normal text-sm">— {msg.email}</span></h3>
                                            <p className="text-broto-yellow text-sm font-medium">{msg.subject}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {msg.status === 'new' ? (
                                                <button onClick={() => handleMarkAsRead(msg._id)} className="text-xs px-2 py-1 rounded-full bg-broto-yellow text-broto-black font-bold">Mark Read</button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Read</span>
                                            )}
                                            <button onClick={() => handleDeleteMessage(msg._id)} className="text-gray-500 hover:text-red-500 transition">
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm">{msg.message}</p>
                                    <div className="mt-3 text-right">
                                        <span className="text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                            {messages.length === 0 && <p className="text-gray-400 text-center py-8">No messages yet.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function BookingsTable({ bookings, statusBadge, onUpdateStatus, onDelete }) {
    return (
        <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-sm bg-broto-dark">
                <thead className="bg-broto-grey text-broto-yellow uppercase text-xs">
                    <tr>
                        {['Name', 'Service', 'Date/Slot', 'Status', 'Actions'].map(h => <th key={h} className="p-4 text-left">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-broto-grey">
                    {bookings.map((b, i) => (
                        <tr key={i} className="hover:bg-broto-grey/30 transition">
                            <td className="p-4">
                                <p className="font-medium">{b.name}</p>
                                <p className="text-xs text-gray-400">{b.phone}</p>
                            </td>
                            <td className="p-4">
                                <p className="text-gray-300">{b.service}</p>
                                <p className="text-[10px] text-gray-500">{b.packageType}</p>
                            </td>
                            <td className="p-4 text-gray-400">
                                {b.date ? new Date(b.date).toLocaleDateString() : '—'}
                                <br />
                                {b.timeSlot}
                            </td>
                            <td className="p-4">{statusBadge(b.status)}</td>
                            <td className="p-4">
                                <div className="flex space-x-2">
                                    {b.status === 'pending' && (
                                        <>
                                            <button onClick={() => onUpdateStatus(b._id, 'confirmed')} className="text-green-500 hover:text-white" title="Confirm"><CheckCircle className="w-5 h-5" /></button>
                                            <button onClick={() => onUpdateStatus(b._id, 'cancelled')} className="text-red-500 hover:text-white" title="Cancel"><XCircle className="w-5 h-5" /></button>
                                        </>
                                    )}
                                    <button onClick={() => onDelete(b._id)} className="text-gray-500 hover:text-white pl-2 border-l border-broto-grey" title="Delete"><XCircle className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-400">No bookings yet.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

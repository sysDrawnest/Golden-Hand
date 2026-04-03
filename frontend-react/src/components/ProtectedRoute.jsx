import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, loading } = useAuth()

    if (loading) return (
        <div className="min-h-screen bg-broto-black flex items-center justify-center">
            <div className="text-broto-yellow text-2xl font-bold animate-pulse">Loading...</div>
        </div>
    )

    if (!user) return <Navigate to="/" replace />
    if (requireAdmin && user.role !== 'admin') return <Navigate to="/" replace />

    return children
}

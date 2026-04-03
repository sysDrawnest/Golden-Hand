import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-broto-black text-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-[10rem] font-black text-broto-yellow leading-none">404</h1>
            <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">Looks like you took a wrong turn. Let us guide you back on the right road.</p>
            <Link to="/" className="bg-broto-yellow text-broto-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
                Back to Home
            </Link>
        </div>
    )
}

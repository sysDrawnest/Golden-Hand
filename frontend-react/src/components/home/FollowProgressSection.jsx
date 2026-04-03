import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { PlayCircle } from 'lucide-react'

export default function FollowProgressSection() {
    return (
        <section className="py-16 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-broto-yellow text-center mb-12 uppercase tracking-wider">
                    Follow Our Progress
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-broto-black p-6 rounded-xl shadow-2xl">
                        <div className="flex items-center mb-4">
                            <FaInstagram className="w-8 h-8 text-pink-500 mr-3" />
                            <h3 className="text-xl font-bold text-white">Latest from Instagram</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <img src="https://placehold.co/200x200/444444/ffffff?text=Insta+Post+1" alt="Instagram Post 1" className="w-full h-auto object-cover rounded-lg" />
                            <img src="https://placehold.co/200x200/444444/ffffff?text=Insta+Post+2" alt="Instagram Post 2" className="w-full h-auto object-cover rounded-lg" />
                            <img src="https://placehold.co/200x200/444444/ffffff?text=Insta+Post+3" alt="Instagram Post 3" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                        <p className="text-center mt-6 text-sm text-gray-400">Posts are typically fetched here automatically via API.</p>
                    </div>

                    <div className="bg-broto-black p-6 rounded-xl shadow-2xl">
                        <div className="flex items-center mb-4">
                            <FaYoutube className="w-8 h-8 text-red-600 mr-3" />
                            <h3 className="text-xl font-bold text-white">Featured YouTube Video</h3>
                        </div>
                        <a href="https://youtu.be/XZhXFbFCOu4" target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-lg aspect-video bg-broto-dark flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=450&fit=crop" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                            <PlayCircle className="w-16 h-16 text-red-600 opacity-80 z-10 group-hover:scale-110 transition-transform" />
                            <span className="absolute text-white text-lg font-bold z-10 drop-shadow-md text-center px-4">Race Highlights | 2025 Singapore Grand Prix</span>
                        </a>
                        <p className="text-center mt-4 text-sm text-gray-400">Subscribe to our channel for weekly videos!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

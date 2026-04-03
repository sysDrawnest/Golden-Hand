import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1544627836-5c6cb5779451?auto=format&fit=crop&w=800&q=80', caption: 'Professional Training Session' },
    { src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80', caption: 'City Driving Practice' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?auto=format&fit=crop&w=800&q=80', caption: 'Flexible Scheduling' },
    { src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80', caption: 'Expert Instructor Guidance' },
    { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', caption: 'Modern Training Vehicles' },
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', caption: 'Highway Driving Skills' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', caption: 'RTO Test Preparation' },
    { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80', caption: 'Parking Mastery' },
    { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80', caption: 'Night Driving Lessons' },
]

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null)

    const prev = () => setLightbox(l => (l - 1 + galleryImages.length) % galleryImages.length)
    const next = () => setLightbox(l => (l + 1) % galleryImages.length)

    return (
        <div className="bg-broto-black text-white">
            {/* Hero */}
            <section className="py-20 bg-broto-dark relative">
                <div className="absolute top-10 right-10 w-20 h-20 bg-broto-yellow/10 rounded-full floating" />
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-white text-md mb-2 uppercase tracking-widest font-light">Home / Gallery</p>
                    <h1 className="text-6xl font-black text-white">Our <span className="text-broto-yellow">Gallery</span></h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">A glimpse into life at Golden Hands Driving School — our vehicles, instructors, and proud students.</p>
                </div>
            </section>

            {/* Grid Gallery */}
            <section className="py-16 bg-broto-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.map((img, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer border border-broto-grey hover:border-broto-yellow transition-all duration-300"
                                onClick={() => setLightbox(i)}>
                                <img src={img.src} alt={img.caption} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white font-semibold">{img.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].caption} className="w-full max-h-[80vh] object-contain rounded-xl" />
                        <p className="text-center text-white mt-4 font-semibold">{galleryImages[lightbox].caption}</p>
                        <button onClick={() => setLightbox(null)} className="absolute -top-4 -right-4 bg-broto-yellow text-broto-black w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center">×</button>
                        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-broto-grey hover:bg-broto-yellow text-white hover:text-black p-3 rounded-full transition">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-broto-grey hover:bg-broto-yellow text-white hover:text-black p-3 rounded-full transition">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

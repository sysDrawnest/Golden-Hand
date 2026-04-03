import { useState, useEffect, useRef } from 'react'

const galleryImages = [
    'car-pc-desktop-4k.jpg',
    'https://placehold.co/800x400/444444/ffffff?text=Gallery+Image+2+(Parking+Practice)',
    'https://placehold.co/800x400/555555/ffffff?text=Gallery+Image+3+(Theory+Class)',
    'https://placehold.co/800x400/666666/ffffff?text=Gallery+Image+4+(RTO+Mock+Test)'
]

export default function OurGallerySection() {
    const [slideIndex, setSlideIndex] = useState(0)
    const timeoutRef = useRef(null)

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(() => {
            setSlideIndex((prev) => (prev + 1) % galleryImages.length)
        }, 3000)

        return () => { resetTimeout() }
    }, [slideIndex])

    const goToSlide = (index) => {
        setSlideIndex(index)
    }

    return (
        <section id="gallery-section" className="py-16 bg-broto-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wider uppercase">
                    OUR GALLERY
                </h2>

                <div className="slideshow-container relative mx-auto rounded-xl shadow-2xl h-[400px] overflow-hidden">
                    <div id="slideshow-content" className="h-full relative w-full">
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                className={`slide absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${i === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery Image ${i + 1}`}
                                    className="w-full h-full object-cover rounded-xl"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop" }}
                                />
                            </div>
                        ))}
                    </div>

                    <div id="slideshow-dots" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {galleryImages.map((_, i) => (
                            <span
                                key={i}
                                className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${i === slideIndex ? 'bg-broto-yellow' : 'bg-broto-grey'}`}
                                onClick={() => goToSlide(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

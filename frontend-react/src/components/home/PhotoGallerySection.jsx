import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const drivingGalleryData = [
    { img: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Professional Driving Instruction', sub: 'Learn from experienced trainers with years of expertise' },
    { img: 'https://images.unsplash.com/photo-1603712610494-7ce56b292826?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Road Safety Techniques', sub: 'Master defensive driving in various conditions' },
    { img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Vehicle Control Exercises', sub: 'Practice in controlled environments with modern vehicles' },
    { img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Practical Road Lessons', sub: 'Real-world driving experience with personalized feedback' },
    { img: 'https://images.unsplash.com/photo-1563720223485-744d442c91e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Advanced Driving Skills', sub: 'Learn advanced techniques for challenging road conditions' }
]

const rtoServices = [
    { img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Vehicle registration' },
    { img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'License assistance' },
    { img: 'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Document verification' },
    { img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Permit processing' },
]

const pdiServices = [
    { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Pre-delivery inspection' },
    { img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Quality check' },
    { img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Testing' },
    { img: 'https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Final prep' },
]

const consultantServices = [
    { img: 'https://images.unsplash.com/photo-1563720223485-744d442c91e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Consultation' },
    { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Recommendations' },
    { img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Market analysis' },
    { img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', text: 'Guidance' },
]

function ServiceGalleryRow({ title, items }) {
    return (
        <div className="flex-1 flex flex-col justify-center bg-broto-black rounded-xl shadow-lg p-5 relative overflow-hidden group border border-broto-yellow/10">
            <h2 className="text-lg font-bold mb-3 text-center text-broto-yellow uppercase tracking-wider">{title}</h2>
            <div className="services-gallery h-[110px] overflow-hidden relative w-full">
                {/* 
                    Using two identical flex containers stacked horizontally to create a seamless infinite scroll loop.
                    The CSS must have `animation: scrollLeft 20s linear infinite` and `.group-hover:pause` behavior. 
                */}
                <div className="flex absolute left-0 w-[200%] h-full animate-[scrollLeft_20s_linear_infinite] group-hover:[animation-play-state:paused]">
                    {[...items, ...items, ...items, ...items].map((item, idx) => (
                        <div key={idx} className="photo-card rounded-lg overflow-hidden mr-2 shrink-0">
                            <img src={item.img} alt={item.text} className="service-img w-[200px] h-[100px] object-cover block" />
                            <div className="p-1"><p className="text-xs text-gray-300">{item.text}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function PhotoGallerySection() {
    const [currentStep, setCurrentStep] = useState(0)
    // progressKey is used to force unmount-remount of the progress bar div to restart its CSS transition reliably
    const [progressKey, setProgressKey] = useState(0)
    const intervalRef = useRef(null)

    const resetTimer = () => {
        clearInterval(intervalRef.current)
        setProgressKey(k => k + 1) // Restart progress bar
        intervalRef.current = setInterval(() => {
            setCurrentStep(c => {
                setProgressKey(k => k + 1); // Reset progress on interval trigger too
                return (c + 1) % drivingGalleryData.length
            })
        }, 5000)
    }

    const next = () => {
        setCurrentStep(c => (c + 1) % drivingGalleryData.length)
        resetTimer()
    }

    const prev = () => {
        setCurrentStep(c => (c - 1 + drivingGalleryData.length) % drivingGalleryData.length)
        resetTimer()
    }

    const goTo = (idx) => {
        setCurrentStep(idx)
        resetTimer()
    }

    useEffect(() => {
        // Start initial timer
        resetTimer()
        return () => clearInterval(intervalRef.current)
    }, [])

    return (
        <section className="py-8 bg-broto-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold mb-2 text-white">
                        Our <span className="text-broto-yellow">Photo Gallery</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        Explore our training programs and services through our photo gallery.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 gallery-container">
                    {/* Left: Driving Gallery */}
                    <div className="lg:flex-1 driving-gallery-container bg-black rounded-xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col border border-broto-yellow/10">
                        <h2 className="text-lg font-bold mb-4 text-center text-broto-yellow uppercase tracking-wider">Driving Training</h2>

                        <div className="driving-gallery flex-1 relative overflow-hidden rounded-lg bg-black min-h-[300px] lg:min-h-[400px]">
                            {/* Resetting Progress Bar using key, with an inline style for transition */}
                            <div
                                key={`progress-${progressKey}`}
                                className="progress-bar absolute bottom-0 left-0 h-[3px] bg-broto-yellow z-20 w-0"
                                style={{
                                    animation: 'fillProgress 5s linear forwards'
                                }}
                            />
                            {/* Global CSS for this animation: @keyframes fillProgress { 0% { width: 0%; } 100% { width: 100%; } } */}

                            {drivingGalleryData.map((slide, idx) => {
                                const isActive = idx === currentStep;
                                return (
                                    <div key={idx} className={`driving-slide absolute top-0 left-0 w-full h-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}>
                                        <div className="driving-slide-img-wrapper relative w-full h-full">
                                            <img src={slide.img} alt={slide.title} className="driving-img w-full h-full object-cover block" />
                                            <div className={`driving-caption absolute bottom-0 left-0 right-0 p-6 pt-10 bg-gradient-to-t from-black/90 to-transparent transition-transform duration-400 ease-out ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                                                <p className="text-sm font-semibold text-broto-yellow">{slide.title}</p>
                                                <p className="text-xs text-gray-300">{slide.sub}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <button
                                aria-label="Previous slide"
                                className="nav-btn absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/70 border-2 border-broto-yellow/50 hover:bg-broto-yellow/20 hover:border-broto-yellow/80 hover:scale-110 transition-all z-30"
                                onClick={prev}
                            >
                                <ChevronLeft className="w-5 h-5 text-broto-yellow" />
                            </button>
                            <button
                                aria-label="Next slide"
                                className="nav-btn absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/70 border-2 border-broto-yellow/50 hover:bg-broto-yellow/20 hover:border-broto-yellow/80 hover:scale-110 transition-all z-30"
                                onClick={next}
                            >
                                <ChevronRight className="w-5 h-5 text-broto-yellow" />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="thumbnail-container flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-broto-yellow">
                            {drivingGalleryData.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`thumbnail w-[70px] md:w-[80px] h-[50px] md:h-[60px] shrink-0 rounded overflow-hidden cursor-pointer transition-all duration-300 border-2 ${idx === currentStep ? 'opacity-100 border-broto-yellow' : 'opacity-60 border-transparent hover:opacity-80'}`}
                                    onClick={() => goTo(idx)}
                                >
                                    <img src={slide.img} alt={slide.title} className="thumbnail-img w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Services Galleries */}
                    <div className="lg:flex-1 flex flex-col gap-4">
                        <ServiceGalleryRow title="RTO Services" items={rtoServices} />
                        <ServiceGalleryRow title="PDI Services" items={pdiServices} />
                        <ServiceGalleryRow title="Car Consultant" items={consultantServices} />
                    </div>
                </div>
            </div>
            {/* Inline styles for local specific animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fillProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
            `}} />
        </section>
    )
}

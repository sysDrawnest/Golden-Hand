import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroSlides = [
    { bg: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Master the Road' },
    { bg: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Experienced & Patient' },
    { bg: 'https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Learn in Comfort' },
    { bg: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Hassle-Free Licensing' },
]

export default function HeroSection() {
    const [current, setCurrent] = useState(0)
    const intervalRef = useRef(null)
    const touchStartX = useRef(0)

    const next = useCallback(() => setCurrent(c => (c + 1) % heroSlides.length), [])
    const prev = () => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length)
    const goTo = (i) => { setCurrent(i); resetInterval() }

    const resetInterval = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(next, 5000)
    }

    useEffect(() => {
        intervalRef.current = setInterval(next, 5000)
        return () => clearInterval(intervalRef.current)
    }, [next])

    const handleTouchStart = e => { touchStartX.current = e.changedTouches[0].screenX }
    const handleTouchEnd = e => {
        const diff = touchStartX.current - e.changedTouches[0].screenX
        if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetInterval() }
    }

    return (
        <section className="h-[70vh] relative overflow-hidden bg-broto-black">
            <div className="hero-slides-container w-full h-full relative" id="hero-slides-container">
                <div className="hero-slides-wrapper flex w-[400%] h-full transition-transform duration-1000 ease-in-out" id="hero-slides-wrapper" style={{ transform: `translateX(-${current * 25}%)` }}>
                    {heroSlides.map((slide, i) => (
                        <div key={i} className="hero-slide w-1/4 h-full bg-cover bg-center bg-no-repeat shrink-0" style={{ backgroundImage: `url(${slide.bg})` }}>
                            <div className="hero-overlay bg-black/70 w-full h-full flex items-center justify-center">
                                <h1 className="text-white text-4xl md:text-5xl font-black text-center">{slide.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Touch area */}
                <div className="touch-area absolute top-0 left-0 w-full h-full z-[5]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />

                {/* Slide Indicators */}
                <div className="slide-indicators absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
                    {heroSlides.map((_, i) => (
                        <div key={i} className={`slide-indicator w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${i === current ? 'bg-broto-yellow' : 'bg-white/50'}`} onClick={() => goTo(i)}></div>
                    ))}
                </div>
            </div>
        </section>
    )
}

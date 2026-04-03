import React from 'react'

// Import all sections
import HeroSection from '../components/home/HeroSection'
import ParticleCanvas from '../components/home/ParticleCanvas'
import PhotoGallerySection from '../components/home/PhotoGallerySection'
import WhatWeDoSection from '../components/home/WhatWeDoSection'
import FeesSection from '../components/home/FeesSection'
import UrgentCTASection from '../components/home/UrgentCTASection'
import ReadyToLearnSection from '../components/home/ReadyToLearnSection'
import MeetInstructorsSection from '../components/home/MeetInstructorsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import OurGallerySection from '../components/home/OurGallerySection'
import FollowProgressSection from '../components/home/FollowProgressSection'
import FAQSection from '../components/home/FAQSection'
import EnrollmentProcessSection from '../components/home/EnrollmentProcessSection'
import WhyChooseUsSection from '../components/home/WhyChooseUsSection'
import ContactSection from '../components/home/ContactSection'
import BookLessonBanner from '../components/home/BookLessonBanner'
import BookLessonFormSection from '../components/home/BookLessonFormSection'

export default function Home() {
    return (
        <div className="bg-broto-dark overflow-x-hidden pt-20">
            <HeroSection />
            <ParticleCanvas />
            <PhotoGallerySection />
            <WhatWeDoSection />
            <FeesSection />
            <UrgentCTASection />
            <ReadyToLearnSection />
            <MeetInstructorsSection />
            <TestimonialsSection />
            <OurGallerySection />
            <FollowProgressSection />
            <FAQSection />
            <EnrollmentProcessSection />
            <WhyChooseUsSection />
            <ContactSection />
            <BookLessonBanner />
            <BookLessonFormSection />
        </div>
    )
}

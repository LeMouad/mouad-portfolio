'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import Timeline from '@/components/sections/Timeline'
import Academic from '@/components/sections/Academic'
import SkillsGrid from '@/components/sections/SkillsGrid'
import Tools from '@/components/sections/Tools'
import WhyHospitality from '@/components/sections/WhyHospitality'
import Savignac from '@/components/sections/Savignac'
import ContactInfo from '@/components/sections/ContactInfo'
import Contact from '@/components/sections/Contact'
import ContactModal from '@/components/ContactModal'
import FloatingButtons from '@/components/FloatingButtons'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import SectionIndicators from '@/components/SectionIndicators'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import contentEn from '@/content/en.json'

export default function EnPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Enable keyboard navigation
    useKeyboardNavigation()

    return (
        <>
            <ScrollProgress />
            <SectionIndicators />
            <BackToTop />
            <Navigation content={contentEn} lang="en" />

            <FloatingButtons
                onContactClick={() => setIsModalOpen(true)}
                content={contentEn}
            />

            <main>
                <Hero content={contentEn} onContactClick={() => setIsModalOpen(true)} />
                <Timeline content={contentEn} />
                <Academic content={contentEn} />
                <SkillsGrid content={contentEn} />
                <Tools content={contentEn} />
                <WhyHospitality content={contentEn} />
                <Savignac content={contentEn} />
                <ContactInfo content={contentEn} />
                <Contact content={contentEn} onContactClick={() => setIsModalOpen(true)} />
            </main>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={contentEn}
            />
        </>
    )
}

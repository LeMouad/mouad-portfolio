'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'timeline', label: 'Experience' },
    { id: 'academic', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'tools', label: 'Tools' },
    { id: 'whyHospitality', label: 'Why Hospitality' },
    { id: 'savignac', label: 'Savignac' },
    { id: 'contact-info', label: 'Info' },
    { id: 'contact', label: 'Contact' }
]

export default function SectionIndicators() {
    const [activeSection, setActiveSection] = useState('home')
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show indicators after scrolling past hero
            setIsVisible(window.scrollY > window.innerHeight * 0.5)

            // Find current section
            for (const section of sections) {
                const element = document.getElementById(section.id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    if (!isVisible) return null

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex flex-col transition-all duration-500 ease-out ${isHovered ? 'gap-4' : 'gap-3'
                    }`}
            >
                {sections.map((section) => {
                    const isActive = activeSection === section.id

                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative flex items-center justify-end"
                            aria-label={`Go to ${section.label}`}
                        >
                            {/* Label - slides in from right on hover */}
                            <motion.span
                                className={`absolute right-full mr-3 whitespace-nowrap transition-all duration-300 ease-out ${isHovered
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 translate-x-4 pointer-events-none'
                                    } ${isActive
                                        ? 'text-black font-medium'
                                        : 'text-gray-400 group-hover:text-gray-600'
                                    }`}
                                style={{
                                    fontSize: isHovered ? (isActive ? '14px' : '12px') : '11px',
                                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                                }}
                            >
                                {section.label}
                            </motion.span>

                            {/* Dot - grows on hover */}
                            <motion.div
                                className={`rounded-full transition-all duration-400 ease-out ${isActive
                                        ? 'bg-black'
                                        : 'bg-gray-300 group-hover:bg-gray-400'
                                    }`}
                                style={{
                                    width: isHovered
                                        ? (isActive ? '14px' : '10px')
                                        : (isActive ? '10px' : '8px'),
                                    height: isHovered
                                        ? (isActive ? '14px' : '10px')
                                        : (isActive ? '10px' : '8px'),
                                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                                }}
                            />
                        </button>
                    )
                })}
            </div>
        </motion.div>
    )
}

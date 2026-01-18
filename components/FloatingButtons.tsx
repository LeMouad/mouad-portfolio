'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingButtonsProps {
    onContactClick: () => void
    content: any
}

export default function FloatingButtons({ onContactClick, content }: FloatingButtonsProps) {
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const heroHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const viewportHeight = window.innerHeight

            // Show buttons after scrolling past hero (100vh)
            // Hide buttons when reaching the contact section
            const isAfterHero = scrollY > heroHeight * 0.85
            const isNearBottom = scrollY > documentHeight - viewportHeight * 2.2

            setShowButtons(isAfterHero && !isNearBottom)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check on mount

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {showButtons && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 left-8 lg:left-12 z-40 flex gap-3"
                >
                    <a
                        href="https://publuu.com/flip-book/1045713/2317842"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white text-[11px] lg:text-[12px] px-5 lg:px-6 py-2.5 lg:py-3 tracking-[0.1em] hover:opacity-70 transition-opacity uppercase font-medium"
                    >
                        CV ↓
                    </a>
                    <button
                        onClick={onContactClick}
                        className="border border-black text-[11px] lg:text-[12px] px-5 lg:px-6 py-2.5 lg:py-3 tracking-[0.1em] hover:bg-black hover:text-white transition-all uppercase font-medium"
                    >
                        Contact
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

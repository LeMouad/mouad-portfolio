'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
    content: any
    lang: 'fr' | 'en'
}

export default function Navigation({ content, lang }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showLogo, setShowLogo] = useState(false)

    const navItems = [
        { label: content.nav.home, href: '#home' },
        { label: content.nav.timeline, href: '#timeline' },
        { label: content.nav.academic || 'Parcours Académique', href: '#academic' },
        { label: content.nav.skills, href: '#skills' },
        { label: content.nav.tools || 'Outils', href: '#tools' },
        { label: content.nav.whyHospitality, href: '#why-hospitality' },
        { label: content.nav.savignac, href: '#savignac' },
        { label: content.nav.contactInfo || 'Informations', href: '#contact-info' },
        { label: content.nav.contact, href: '#contact' },
    ]

    const toggleLanguage = () => {
        window.location.href = lang === 'fr' ? '/en' : '/'
    }

    // Show logo after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setShowLogo(window.scrollY > window.innerHeight * 0.85)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <>
            {/* Fixed Header - Minimal like Lorian */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 lg:p-10 flex justify-between items-start pointer-events-none">
                {/* Stacked Logo - Top Left - Hidden on hero, appears after scroll */}
                <AnimatePresence>
                    {showLogo && (
                        <motion.a
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            href="#home"
                            className="text-[12px] lg:text-[13px] leading-[1.4] tracking-[0.02em] pointer-events-auto hover:opacity-50 transition-opacity"
                        >
                            <span className="block font-medium">Mouad</span>
                            <span className="block uppercase">EL HYANI</span>
                        </motion.a>
                    )}
                </AnimatePresence>

                {/* Spacer when logo is hidden */}
                {!showLogo && <div />}

                {/* Right side: Language Toggle + Menu Button */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    {/* Language Toggle - Always visible */}
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={toggleLanguage}
                        className="text-[11px] lg:text-[12px] tracking-[0.15em] uppercase font-medium hover:opacity-50 transition-opacity border border-current px-3 py-1.5 rounded-full"
                    >
                        {lang === 'fr' ? 'EN' : 'FR'}
                    </motion.button>

                    {/* Menu Button - Top Right - Bigger + icon */}
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setIsOpen(true)}
                        className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity"
                        aria-label="Open menu"
                    >
                        <Plus size={26} strokeWidth={1.5} />
                    </motion.button>
                </div>
            </header>

            {/* Full Screen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col"
                    >
                        {/* Close Button - Same position as + */}
                        <div className="p-6 lg:p-10 flex justify-end">
                            <motion.button
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity"
                                aria-label="Close menu"
                            >
                                <X size={26} strokeWidth={1.5} />
                            </motion.button>
                        </div>

                        {/* Menu Content - Centered */}
                        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto py-8">
                            <nav className="space-y-4 text-center">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.1 + index * 0.05,
                                            duration: 0.7,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="block text-[28px] lg:text-[36px] font-medium tracking-[-0.02em] hover:opacity-40 transition-opacity"
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Language Toggle in menu */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                onClick={toggleLanguage}
                                className="mt-12 text-[12px] lg:text-[14px] tracking-[0.2em] uppercase hover:opacity-40 transition-opacity"
                            >
                                {lang === 'fr' ? 'English' : 'Français'}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

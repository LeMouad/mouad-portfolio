'use client'

import { useEffect, useCallback } from 'react'

const sections = [
    'home',
    'timeline',
    'academic',
    'skills',
    'tools',
    'whyHospitality',
    'savignac',
    'contact-info',
    'contact'
]

export function useKeyboardNavigation() {
    const getCurrentSectionIndex = useCallback(() => {
        const scrollY = window.scrollY + window.innerHeight / 2

        for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i])
            if (element && element.offsetTop <= scrollY) {
                return i
            }
        }
        return 0
    }, [])

    const scrollToSection = useCallback((index: number) => {
        const clampedIndex = Math.max(0, Math.min(index, sections.length - 1))
        const element = document.getElementById(sections[clampedIndex])
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't capture keys if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return
            }

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault()
                    const nextIndex = getCurrentSectionIndex() + 1
                    scrollToSection(nextIndex)
                    break
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault()
                    const prevIndex = getCurrentSectionIndex() - 1
                    scrollToSection(prevIndex)
                    break
                case 'Home':
                    e.preventDefault()
                    scrollToSection(0)
                    break
                case 'End':
                    e.preventDefault()
                    scrollToSection(sections.length - 1)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [getCurrentSectionIndex, scrollToSection])
}

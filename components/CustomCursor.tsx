'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const [isOnModal, setIsOnModal] = useState(false)

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
        }
        checkTouch()

        if (isTouchDevice) return

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        // Detect hoverable elements and if we're on a modal
        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                target.closest('[role="button"]')

            setIsHovering(!!isInteractive)

            // Only check for modal - the white dialog box
            const modal = target.closest('[role="dialog"]')
            setIsOnModal(modal !== null)
        }

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mousemove', handleElementHover)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mousemove', handleElementHover)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [isTouchDevice])

    // Don't render on touch devices
    if (isTouchDevice) return null

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className={`fixed top-0 left-0 pointer-events-none z-[999] ${!isOnModal ? 'mix-blend-difference' : ''}`}
                animate={{
                    x: position.x - (isHovering ? 20 : 4),
                    y: position.y - (isHovering ? 20 : 4),
                    width: isHovering ? 40 : 8,
                    height: isHovering ? 40 : 8,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                <div
                    className={`w-full h-full rounded-full transition-all duration-200 ${isHovering ? 'opacity-50' : 'opacity-100'
                        } ${isOnModal ? 'bg-black' : 'bg-white'
                        }`}
                />
            </motion.div>
        </>
    )
}

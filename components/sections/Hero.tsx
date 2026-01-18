'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ParallaxImage from '@/components/ParallaxImage'

interface HeroProps {
    content: any
    onContactClick: () => void
}

// Typewriter hook with blur fade-in effect
function useTypewriterBlur(text: string, speed: number = 50, delay: number = 1000) {
    const [displayText, setDisplayText] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const [charIndex, setCharIndex] = useState(0)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let index = 0

        const startTyping = () => {
            timeout = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1))
                    setCharIndex(index + 1)
                    index++
                } else {
                    clearInterval(timeout)
                    setIsComplete(true)
                }
            }, speed)
        }

        const delayTimeout = setTimeout(startTyping, delay)

        return () => {
            clearTimeout(delayTimeout)
            clearInterval(timeout)
        }
    }, [text, speed, delay])

    return { displayText, isComplete, charIndex, totalLength: text.length }
}

export default function Hero({ content, onContactClick }: HeroProps) {
    const { displayText, isComplete, charIndex, totalLength } = useTypewriterBlur(content.hero.headline, 35, 1800)

    // Split text to animate recent characters with blur
    const renderAnimatedText = () => {
        if (!displayText) return null

        return displayText.split('').map((char, index) => {
            // If typing is complete, show all characters sharp
            if (isComplete) {
                return <span key={index}>{char}</span>
            }

            // Calculate how "new" this character is (0 = newest, higher = older)
            const age = charIndex - index - 1
            // Characters fade in over 6 characters
            const fadeProgress = Math.min(age / 6, 1)

            return (
                <span
                    key={index}
                    style={{
                        opacity: 0.4 + (fadeProgress * 0.6),
                        filter: `blur(${(1 - fadeProgress) * 3}px)`,
                        transition: 'opacity 0.2s ease, filter 0.2s ease'
                    }}
                >
                    {char}
                </span>
            )
        })
    }

    return (
        <section id="home" className="h-screen flex relative overflow-hidden">
            {/* Left Half - Name and Info */}
            <div className="w-1/2 flex flex-col h-full px-6 lg:px-12">
                {/* Giant Name - Positioned near top like Lorian */}
                <div className="pt-[6vh] lg:pt-[5vh]">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-[clamp(60px,12vw,160px)] font-semibold leading-[0.9] tracking-[-0.04em]"
                    >
                        {/* First name with letter stagger - SLOWER */}
                        <motion.span
                            className="block overflow-hidden"
                            initial="hidden"
                            animate="visible"
                        >
                            {'Mouad'.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    initial={{ y: 120, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.5 + i * 0.08,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.span>
                        {/* Last name with letter stagger - SLOWER */}
                        <motion.span
                            className="block uppercase overflow-hidden"
                            initial="hidden"
                            animate="visible"
                        >
                            {'El Hyani'.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    initial={{ y: 120, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.9 + i * 0.06,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.span>
                    </motion.h1>
                </div>

                {/* Spacer to push bottom content down */}
                <div className="flex-1" />

                {/* Bottom Row: Tagline + Scroll Indicator */}
                <div className="pb-6 lg:pb-10 flex justify-between items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-[420px]"
                    >
                        {/* Typewriter headline with blur fade-in */}
                        <p className="text-[20px] lg:text-[24px] font-bold leading-snug mb-3 min-h-[3em]">
                            {renderAnimatedText()}
                            {!isComplete && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="inline-block w-[2px] h-[1em] bg-black ml-1 align-middle"
                                />
                            )}
                        </p>
                        {/* Subline with fade in - SLOWER */}
                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[19px] lg:text-[21px] leading-relaxed text-gray-600"
                        >
                            {content.hero.subline}
                        </motion.p>
                    </motion.div>

                    {/* Scroll indicator with bounce animation */}
                    <motion.a
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                        href="#timeline"
                        className="text-[14px] lg:text-[16px] font-bold hover:opacity-50 transition-opacity whitespace-nowrap group"
                    >
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >
                            {content.nav.timeline} ↓
                        </motion.span>
                    </motion.a>
                </div>
            </div>

            {/* Right Half - Portrait with parallax effect - SLOWER */}
            <motion.div
                initial={{ opacity: 0, scale: 1.08, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                }}
                className="w-1/2 p-3 lg:p-4"
            >
                <motion.div
                    className="relative h-full w-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ParallaxImage
                        src="/hero.jpg"
                        alt={content.hero.name}
                        priority
                        grayscale
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

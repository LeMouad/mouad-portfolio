'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ParallaxImage from '@/components/ParallaxImage'

interface SavignacProps {
    content: any
}

// Smooth fade-in animation - left to right for image, then text
const fadeInFromLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const fadeInFromRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

export default function Savignac({ content }: SavignacProps) {
    const [imageError, setImageError] = useState(false)

    return (
        <section id="savignac" className="py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    {/* Left - Image with Parallax */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInFromLeft}
                        className="w-full lg:w-2/5 flex-shrink-0"
                    >
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                            {!imageError ? (
                                <ParallaxImage
                                    src="/savignac.jpg"
                                    alt="École de Savignac"
                                    className="object-cover"
                                />
                            ) : (
                                /* Fallback placeholder if image doesn't exist */
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <p className="text-[13px] text-gray-400">École de Savignac</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right - Text Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInFromRight}
                        className="w-full lg:w-3/5"
                    >
                        <h2 className="text-[24px] lg:text-[32px] font-medium tracking-tight mb-8">
                            {content.savignac.title}
                        </h2>

                        <div className="space-y-6">
                            <p className="text-[20px] lg:text-[26px] font-medium leading-snug">
                                {content.savignac.paragraphs[0]}
                            </p>
                            <p className="text-[15px] lg:text-[17px] text-gray-500 leading-relaxed">
                                {content.savignac.paragraphs[1]}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

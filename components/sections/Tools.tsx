'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ToolsProps {
    content: any
}

// Smooth fade-in animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

export default function Tools({ content }: ToolsProps) {
    const [expanded, setExpanded] = useState(false)

    // Show first 6 by default, rest on expand
    const visibleTools = expanded
        ? content.tools.items
        : content.tools.items.slice(0, 6)

    return (
        <section id="tools" className="py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    custom={0}
                    className="mb-12 lg:mb-16"
                >
                    <h2 className="text-[24px] lg:text-[32px] font-medium tracking-tight">
                        {content.tools.title}
                    </h2>
                </motion.div>

                {/* Tools Grid - 2 columns like Lorian template */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-200">
                    {visibleTools.map((tool: any, index: number) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            custom={index * 0.05}
                            className={`flex items-center gap-5 py-6 lg:py-8 px-4 lg:px-6 border-b border-gray-200 ${index % 2 === 0 ? 'lg:border-r' : ''
                                }`}
                        >
                            {/* Monochrome icon */}
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {tool.iconPath ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tool.iconPath} />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    )}
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[16px] lg:text-[18px] font-medium leading-tight">
                                    {tool.name}
                                </h3>
                                <p className="text-[13px] lg:text-[14px] text-gray-400">
                                    {tool.category}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Expand/Collapse Button */}
                {content.tools.items.length > 6 && (
                    <motion.button
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        onClick={() => setExpanded(!expanded)}
                        className="mt-8 mx-auto flex items-center gap-2 text-[14px] text-gray-400 hover:text-black transition-colors"
                    >
                        <span>{expanded ? 'Show less' : `Show all ${content.tools.items.length} tools`}</span>
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </motion.button>
                )}
            </div>
        </section>
    )
}

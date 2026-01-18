'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SkillsGridProps {
    content: any
}

// Smooth fade-in animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.92,
            delay,
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

export default function SkillsGrid({ content }: SkillsGridProps) {
    const [expanded, setExpanded] = useState(false)

    // Show first 4 by default, rest on expand
    const visibleSkills = expanded
        ? content.skills.items
        : content.skills.items.slice(0, 4)

    return (
        <section id="skills" className="py-24 lg:py-32 bg-neutral-50">
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
                        {content.skills.title}
                    </h2>
                </motion.div>

                {/* Services-style Rows */}
                <div className="border-t border-gray-200">
                    {visibleSkills.map((skill: any, index: number) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            custom={index * 0.08}
                            className="grid grid-cols-12 py-8 lg:py-10 border-b border-gray-200 items-start gap-4 lg:gap-8"
                        >
                            {/* Column 1: Index Number */}
                            <div className="col-span-2 lg:col-span-1">
                                <span className="text-[14px] lg:text-[16px] text-gray-300">
                                    ({index + 1})
                                </span>
                            </div>

                            {/* Column 2: Skill Title */}
                            <div className="col-span-10 lg:col-span-5">
                                <h3 className="text-[20px] lg:text-[24px] font-medium">
                                    {skill.title}
                                </h3>
                            </div>

                            {/* Column 3: Sub-skills */}
                            <div className="col-span-12 lg:col-span-6 lg:text-right">
                                <ul className="space-y-1">
                                    {skill.tags.map((tag: string, tagIndex: number) => (
                                        <li key={tagIndex} className="text-[14px] lg:text-[16px] text-gray-500">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Expand/Collapse Button */}
                {content.skills.items.length > 4 && (
                    <motion.button
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        onClick={() => setExpanded(!expanded)}
                        className="mt-8 mx-auto flex items-center gap-2 text-[14px] text-gray-400 hover:text-black transition-colors"
                    >
                        <span>{expanded ? 'Show less' : `Show all ${content.skills.items.length} skills`}</span>
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </motion.button>
                )}
            </div>
        </section>
    )
}

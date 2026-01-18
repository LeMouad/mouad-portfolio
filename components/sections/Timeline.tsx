'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Minus, Download } from 'lucide-react'
import Image from 'next/image'

interface TimelineProps {
    content: any
}

// Map company names to their logo files
const companyLogos: { [key: string]: string } = {
    'Quercus Alternance': '/logos/quercus-logo.jpg',
    'Royal Mansour Marrakech': '/logos/royal-mansour-logo.jpg',
    'Hôtel Kenzi Club Agdal Medina': '/logos/kenzi-logo.jpg',
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

export default function Timeline({ content }: TimelineProps) {
    const [showOthers, setShowOthers] = useState(false)
    const [expandedExperiences, setExpandedExperiences] = useState<number[]>([])
    const [expandedOtherExperiences, setExpandedOtherExperiences] = useState<number[]>([])

    const featuredExperiences = content.timeline.experiences.filter((exp: any) => exp.featured)
    const otherExperiences = content.timeline.experiences.filter((exp: any) => !exp.featured)

    const toggleExpand = (index: number) => {
        setExpandedExperiences(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const toggleExpandOther = (index: number) => {
        setExpandedOtherExperiences(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    return (
        <section id="timeline" className="py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Section Header with Download CV */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    custom={0}
                    className="flex justify-between items-center mb-12 lg:mb-16"
                >
                    <h2 className="text-[24px] lg:text-[32px] font-medium tracking-tight">
                        {content.timeline.title}
                    </h2>
                    <a
                        href="https://publuu.com/flip-book/1045713/2317842"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] lg:text-[14px] tracking-wide hover:opacity-60 transition-opacity"
                    >
                        <Download size={16} strokeWidth={1.5} />
                        <span>View CV</span>
                    </a>
                </motion.div>

                {/* Featured Experience Rows */}
                <div className="border-t border-gray-200">
                    {featuredExperiences.map((exp: any, index: number) => {
                        const isExpanded = expandedExperiences.includes(index)
                        const hasLogo = companyLogos[exp.company]

                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                                custom={index * 0.1}
                                className="border-b border-gray-200"
                            >
                                {/* Main Row - Clickable */}
                                <div
                                    className="grid grid-cols-12 py-8 lg:py-10 gap-4 lg:gap-8 cursor-pointer group"
                                    onClick={() => toggleExpand(index)}
                                >
                                    {/* Date */}
                                    <div className="col-span-12 lg:col-span-3">
                                        <span className="text-[14px] lg:text-[15px] text-gray-400">{exp.dates}</span>
                                    </div>

                                    {/* Role & Company with optional Logo */}
                                    <div className="col-span-10 lg:col-span-5">
                                        <div className="flex items-start gap-4">
                                            {hasLogo && (
                                                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
                                                    <Image
                                                        src={companyLogos[exp.company]}
                                                        alt={exp.company}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-[22px] lg:text-[26px] font-medium group-hover:opacity-70 transition-opacity leading-tight">
                                                    {exp.company}
                                                </h3>
                                                <p className="text-[14px] lg:text-[16px] text-gray-500 mt-2">{exp.role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location & Expand Button */}
                                    <div className="col-span-2 lg:col-span-4 flex justify-end items-start">
                                        <div className="text-right flex-1 hidden lg:block">
                                            <p className="text-[14px] lg:text-[15px] text-gray-400">{exp.location}</p>
                                        </div>
                                        <button
                                            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            aria-label={isExpanded ? "Collapse" : "Expand"}
                                        >
                                            {isExpanded ? (
                                                <ChevronUp size={20} strokeWidth={1.5} className="text-gray-400" />
                                            ) : (
                                                <ChevronDown size={20} strokeWidth={1.5} className="text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pl-0 lg:pl-[25%]">
                                                {/* Location on mobile */}
                                                <p className="text-[14px] text-gray-400 mb-4 lg:hidden">{exp.location}</p>

                                                {/* Description */}
                                                <p className="text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mb-6">
                                                    {exp.description}
                                                </p>

                                                {/* Missions / Details */}
                                                {exp.missions && exp.missions.length > 0 && (
                                                    <div className="mt-6">
                                                        <p className="text-[13px] tracking-[0.1em] uppercase text-gray-400 mb-4">Missions</p>
                                                        <ul className="space-y-3">
                                                            {exp.missions.map((mission: string, mIndex: number) => (
                                                                <li key={mIndex} className="text-[14px] lg:text-[15px] text-gray-600 flex items-start gap-3">
                                                                    <span className="text-gray-300 mt-1">•</span>
                                                                    <span>{mission}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Skills / Tags */}
                                                {exp.skills && exp.skills.length > 0 && (
                                                    <div className="mt-6 flex flex-wrap gap-2">
                                                        {exp.skills.map((skill: string, sIndex: number) => (
                                                            <span
                                                                key={sIndex}
                                                                className="text-[11px] px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}

                    {/* Other Experiences Toggle */}
                    {otherExperiences.length > 0 && (
                        <>
                            <motion.button
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                onClick={() => setShowOthers(!showOthers)}
                                className="w-full py-6 border-b border-gray-200 flex items-center justify-between text-[14px] lg:text-[16px] text-gray-400 hover:text-black transition-colors"
                            >
                                <span>{content.timeline.otherExperiences}</span>
                                {showOthers ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                            </motion.button>

                            <AnimatePresence>
                                {showOthers && otherExperiences.map((exp: any, index: number) => {
                                    const isExpanded = expandedOtherExperiences.includes(index)

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="border-b border-gray-200"
                                        >
                                            {/* Main Row - Clickable */}
                                            <div
                                                className="grid grid-cols-12 py-6 gap-4 cursor-pointer group"
                                                onClick={() => toggleExpandOther(index)}
                                            >
                                                <div className="col-span-12 lg:col-span-3">
                                                    <span className="text-[14px] text-gray-300">{exp.dates}</span>
                                                </div>
                                                <div className="col-span-10 lg:col-span-5">
                                                    <h3 className="text-[18px] font-medium text-gray-600 group-hover:opacity-70 transition-opacity">{exp.company}</h3>
                                                    <p className="text-[14px] text-gray-400 mt-1">{exp.role}</p>
                                                </div>
                                                <div className="col-span-2 lg:col-span-4 flex justify-end items-start">
                                                    <div className="text-right flex-1 hidden lg:block">
                                                        <p className="text-[14px] text-gray-300">{exp.location}</p>
                                                    </div>
                                                    <button
                                                        className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                        aria-label={isExpanded ? "Collapse" : "Expand"}
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronUp size={18} strokeWidth={1.5} className="text-gray-400" />
                                                        ) : (
                                                            <ChevronDown size={18} strokeWidth={1.5} className="text-gray-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expanded Content for Other Experiences */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-6 pl-0 lg:pl-[25%]">
                                                            {/* Location on mobile */}
                                                            <p className="text-[14px] text-gray-400 mb-4 lg:hidden">{exp.location}</p>

                                                            {/* Description */}
                                                            {exp.description && (
                                                                <p className="text-[14px] lg:text-[15px] text-gray-600 leading-relaxed mb-4">
                                                                    {exp.description}
                                                                </p>
                                                            )}

                                                            {/* Missions / Details */}
                                                            {exp.missions && exp.missions.length > 0 && (
                                                                <div className="mt-4">
                                                                    <p className="text-[12px] tracking-[0.1em] uppercase text-gray-400 mb-3">Missions</p>
                                                                    <ul className="space-y-2">
                                                                        {exp.missions.map((mission: string, mIndex: number) => (
                                                                            <li key={mIndex} className="text-[13px] lg:text-[14px] text-gray-600 flex items-start gap-3">
                                                                                <span className="text-gray-300 mt-1">•</span>
                                                                                <span>{mission}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Skills / Tags */}
                                                            {exp.skills && exp.skills.length > 0 && (
                                                                <div className="mt-4 flex flex-wrap gap-2">
                                                                    {exp.skills.map((skill: string, sIndex: number) => (
                                                                        <span
                                                                            key={sIndex}
                                                                            className="text-[10px] px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

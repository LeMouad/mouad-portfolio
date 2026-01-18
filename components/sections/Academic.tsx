'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AcademicProps {
    content: any
}

// Map school names to their logo files
const schoolLogos: { [key: string]: string } = {
    'École de Savignac': '/logos/savignac-logo.jpg',
    'ESC Clermont Business School': '/logos/esc-clermont-logo.jpg',
    'ENCG Settat': '/logos/encg-settat-logo.jpg',
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

export default function Academic({ content }: AcademicProps) {
    const items = content.academic.items

    return (
        <section id="academic" className="py-24 lg:py-32 bg-neutral-50">
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
                        {content.academic.title}
                    </h2>
                </motion.div>

                {/* Academic Grid - 2 columns for first 2, centered for 3rd */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* First two items in 2-column layout */}
                    {items.slice(0, 2).map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            custom={index * 0.1}
                            className="bg-white p-6 lg:p-8 flex items-start gap-5 hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* School Logo */}
                            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                                <Image
                                    src={schoolLogos[item.school] || '/logos/savignac-logo.jpg'}
                                    alt={item.school}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[18px] lg:text-[20px] font-medium leading-tight mb-1">
                                    {item.school}
                                </h3>
                                <p className="text-[14px] lg:text-[15px] text-gray-500 mb-1">
                                    {item.degree}
                                </p>
                                {item.note && (
                                    <p className="text-[13px] text-gray-500 mb-1">
                                        {item.note}
                                    </p>
                                )}
                                <p className="text-[13px] text-gray-400">
                                    {item.dates} • {item.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Third item centered */}
                {items.length > 2 && (
                    <div className="mt-4 lg:mt-6 flex justify-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            custom={0.2}
                            className="bg-white p-6 lg:p-8 flex items-start gap-5 hover:shadow-lg transition-shadow duration-300 w-full lg:w-1/2"
                        >
                            {/* School Logo */}
                            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                                <Image
                                    src={schoolLogos[items[2].school] || '/logos/encg-settat-logo.jpg'}
                                    alt={items[2].school}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[18px] lg:text-[20px] font-medium leading-tight mb-1">
                                    {items[2].school}
                                </h3>
                                <p className="text-[14px] lg:text-[15px] text-gray-500 mb-1">
                                    {items[2].degree}
                                </p>
                                {items[2].note && (
                                    <p className="text-[13px] text-gray-500 mb-1">
                                        {items[2].note}
                                    </p>
                                )}
                                <p className="text-[13px] text-gray-400">
                                    {items[2].dates} • {items[2].location}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}

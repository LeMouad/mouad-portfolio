'use client'

import { motion } from 'framer-motion'

interface WhyHospitalityProps {
    content: any
}

// Smooth fade-in animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay,
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

export default function WhyHospitality({ content }: WhyHospitalityProps) {
    // Split the statement for two-tone effect
    const statement = content.whyHospitality.paragraphs[0]
    const words = statement.split(' ')
    const midPoint = Math.ceil(words.length * 0.6)
    const firstHalf = words.slice(0, midPoint).join(' ')
    const secondHalf = words.slice(midPoint).join(' ')

    return (
        <section id="why-hospitality" className="py-24 lg:py-32">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                {/* Section Label */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    custom={0}
                    className="mb-12 lg:mb-16"
                >
                    <h2 className="text-[24px] lg:text-[32px] font-medium tracking-tight">
                        {content.whyHospitality.title}
                    </h2>
                </motion.div>

                {/* Large Statement with Two-Tone Effect */}
                <motion.h3
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    custom={0.2}
                    className="text-[28px] lg:text-[42px] xl:text-[52px] font-medium leading-[1.15] tracking-[-0.02em]"
                >
                    <span className="text-black">{firstHalf} </span>
                    <span className="text-gray-400">{secondHalf}</span>
                </motion.h3>

                {/* Second paragraph as supporting text */}
                {content.whyHospitality.paragraphs[1] && (
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        custom={0.4}
                        className="mt-12 lg:mt-16 text-[15px] lg:text-[17px] text-gray-500 max-w-2xl leading-relaxed"
                    >
                        {content.whyHospitality.paragraphs[1]}
                    </motion.p>
                )}
            </div>
        </section>
    )
}

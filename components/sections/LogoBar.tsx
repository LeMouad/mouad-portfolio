'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoBarProps {
    lang: 'fr' | 'en'
}

const schoolLogos = [
    { name: 'École de Savignac', src: '/logos/savignac-logo.jpg' },
    { name: 'ESC Clermont', src: '/logos/esc-clermont-logo.jpg' },
    { name: 'ENCG Settat', src: '/logos/encg-settat-logo.jpg' },
]

const companyLogos = [
    { name: 'Royal Mansour', src: '/logos/royal-mansour-logo.jpg' },
    { name: 'Kenzi Hotels', src: '/logos/kenzi-logo.jpg' },
    { name: 'Quercus', src: '/logos/quercus-logo.jpg' },
]

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

export default function LogoBar({ lang }: LogoBarProps) {
    return (
        <section className="py-16 lg:py-24 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Schools Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    custom={0}
                    className="mb-16"
                >
                    <p className="text-[11px] lg:text-[12px] tracking-[0.2em] uppercase text-gray-400 mb-8 text-center">
                        {lang === 'fr' ? 'Formations' : 'Education'}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                        {schoolLogos.map((logo, index) => (
                            <motion.div
                                key={logo.name}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                custom={index * 0.1}
                                className="relative h-12 lg:h-14 w-auto grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={120}
                                    height={56}
                                    className="h-full w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-16" />

                {/* Companies Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    custom={0.2}
                >
                    <p className="text-[11px] lg:text-[12px] tracking-[0.2em] uppercase text-gray-400 mb-8 text-center">
                        {lang === 'fr' ? 'Expériences' : 'Experience'}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                        {companyLogos.map((logo, index) => (
                            <motion.div
                                key={logo.name}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                custom={0.2 + index * 0.1}
                                className="relative h-10 lg:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={140}
                                    height={48}
                                    className="h-full w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

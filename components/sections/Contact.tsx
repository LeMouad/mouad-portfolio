'use client'

import { motion } from 'framer-motion'
import ParallaxImage from '@/components/ParallaxImage'

interface ContactProps {
    content: any
    onContactClick: () => void
}

// Smooth fade-in animation
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

export default function Contact({ content, onContactClick }: ContactProps) {
    return (
        <section id="contact" className="min-h-screen bg-black text-white">
            <div className="min-h-screen flex">
                {/* Left Half - Portrait with parallax (dark, like Lorian template) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-1/2 relative hidden lg:block"
                >
                    <ParallaxImage
                        src="/end.jpg"
                        alt="Contact"
                        grayscale
                        brightness={0.6}
                    />
                </motion.div>

                {/* Right Half - Content (matching Lorian template exactly) */}
                <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 min-h-screen">
                    {/* Top spacer */}
                    <div className="h-[10vh]" />

                    {/* Main Content - at top like template */}
                    <div>
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            custom={0}
                            className="text-[52px] sm:text-[72px] lg:text-[90px] xl:text-[110px] font-medium leading-[0.95] tracking-[-0.03em]"
                        >
                            {content.contact.title}
                        </motion.h2>

                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            custom={0.15}
                            className="mt-6 lg:mt-8 text-[15px] lg:text-[17px] text-gray-400 max-w-md leading-relaxed"
                        >
                            {content.contact.subtitle}
                        </motion.p>

                        {/* Buttons - CV and Contact */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            custom={0.3}
                            className="mt-8 lg:mt-10 flex gap-4 flex-wrap"
                        >
                            <a
                                href="https://publuu.com/flip-book/1045713/2317842"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/50 text-[13px] lg:text-[14px] px-8 py-4 tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                            >
                                CV ↓
                            </a>
                            <button
                                onClick={onContactClick}
                                className="bg-white text-black text-[13px] lg:text-[14px] px-8 py-4 tracking-[0.1em] uppercase hover:bg-gray-200 transition-all duration-300"
                            >
                                {content.contact.cta}
                            </button>
                        </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Bottom - Contact Info (WHITE & BOLD at absolute bottom) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={0.4}
                        className="mt-auto space-y-2"
                    >
                        <a
                            href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                            className="block text-[16px] lg:text-[18px] text-white font-bold hover:opacity-70 transition-opacity"
                        >
                            {content.contact.phone}
                        </a>
                        <a
                            href={`mailto:${content.contact.email}`}
                            className="block text-[16px] lg:text-[18px] text-white font-bold hover:opacity-70 transition-opacity"
                        >
                            {content.contact.email}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

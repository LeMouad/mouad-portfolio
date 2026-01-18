'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Clock, FileText } from 'lucide-react'
import Image from 'next/image'

interface ContactInfoProps {
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

export default function ContactInfo({ content }: ContactInfoProps) {
    const contactItems = [
        {
            icon: Phone,
            label: content.contactInfo?.phoneLabel || 'Téléphone',
            value: content.contact.phone,
            href: `tel:${content.contact.phone.replace(/\s/g, '')}`
        },
        {
            icon: Mail,
            label: content.contactInfo?.emailLabel || 'Email',
            value: content.contact.email,
            href: `mailto:${content.contact.email}`
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'mouad-elhyani',
            href: content.contact.linkedin
        },
        {
            icon: MapPin,
            label: content.contactInfo?.locationLabel || 'Localisation',
            value: content.hero.meta.location,
            href: null
        },
        {
            icon: Clock,
            label: content.contactInfo?.availabilityLabel || 'Disponibilité',
            value: content.hero.meta.availability,
            href: null
        },
        {
            icon: FileText,
            label: content.contactInfo?.contractLabel || 'Contrat',
            value: content.hero.meta.contract,
            href: null
        }
    ]

    return (
        <section id="contact-info" className="py-24 lg:py-32 bg-neutral-50">
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
                        {content.contactInfo?.title || 'Contact & Informations'}
                    </h2>
                </motion.div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {contactItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                            custom={index * 0.1}
                            className="group"
                        >
                            {item.href ? (
                                <a
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="block bg-white p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                                            <item.icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[12px] lg:text-[13px] text-gray-400 uppercase tracking-wider mb-1">
                                                {item.label}
                                            </p>
                                            <p className="text-[15px] lg:text-[17px] font-medium group-hover:text-black transition-colors">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <div className="bg-white p-6 lg:p-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gray-100 rounded-lg">
                                            <item.icon size={20} strokeWidth={1.5} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-[12px] lg:text-[13px] text-gray-400 uppercase tracking-wider mb-1">
                                                {item.label}
                                            </p>
                                            <p className="text-[15px] lg:text-[17px] font-medium">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* QR Code - Discrete placement below cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    custom={0.6}
                    className="mt-12 lg:mt-16 flex justify-center"
                >
                    <a
                        href="https://publuu.com/flip-book/1045713/2317842"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-24 h-24 lg:w-28 lg:h-28 relative">
                            <Image
                                src="/qr-code.png"
                                alt="Scan to view CV"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-[11px] lg:text-[12px] text-gray-400 tracking-wider uppercase">
                            Scan for CV
                        </p>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

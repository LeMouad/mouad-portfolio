'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
    content: any
}

export default function ContactModal({ isOpen, onClose, content }: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
            modalRef.current?.focus()
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[200]"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white max-w-lg w-full p-12 relative"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            tabIndex={-1}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 hover:opacity-50 transition-opacity"
                                aria-label={content.contact.modal.close}
                            >
                                <X size={22} strokeWidth={1.5} />
                            </button>

                            {/* Content */}
                            <h2 id="modal-title" className="text-[32px] lg:text-[40px] font-medium tracking-[-0.02em] mb-10">
                                {content.contact.modal.title}
                            </h2>

                            <div className="space-y-4">
                                {/* Email Button */}
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="block w-full bg-black text-white py-5 px-8 text-center text-[13px] tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
                                >
                                    {content.contact.modal.email}
                                </a>

                                {/* Phone Button */}
                                <a
                                    href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                                    className="block w-full border border-black py-5 px-8 text-center text-[13px] tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all"
                                >
                                    {content.contact.modal.call}
                                </a>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-12 pt-10 border-t border-gray-200 text-[14px] lg:text-[16px] text-gray-500 space-y-2">
                                <p>{content.contact.email}</p>
                                <p>{content.contact.phone}</p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

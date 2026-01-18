'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Wait for page to be fully loaded, then fade out
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                >
                    {/* Elegant spinning line */}
                    <div className="relative w-12 h-12">
                        <motion.div
                            className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute inset-2 border border-transparent border-t-white/50 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

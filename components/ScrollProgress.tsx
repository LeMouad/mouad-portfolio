'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(scrollPercent)
        }

        window.addEventListener('scroll', updateProgress)
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-black/10 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <motion.div
                className="h-full bg-black"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
        </motion.div>
    )
}

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
    src: string
    alt: string
    priority?: boolean
    className?: string
    style?: React.CSSProperties
    grayscale?: boolean
    brightness?: number
}

export default function ParallaxImage({
    src,
    alt,
    priority = false,
    className = '',
    style = {},
    grayscale = false,
    brightness = 1
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Parallax effect: image moves at 0.3x scroll speed
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    const filterStyle = grayscale
        ? `grayscale(100%) brightness(${brightness})`
        : brightness !== 1
            ? `brightness(${brightness})`
            : undefined

    return (
        <div ref={ref} className="relative w-full h-full overflow-hidden">
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={`object-cover ${className}`}
                    style={{ ...style, filter: filterStyle }}
                    priority={priority}
                />
            </motion.div>
        </div>
    )
}

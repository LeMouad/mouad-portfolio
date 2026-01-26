import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Mouad El Hyani - Alternance Hôtellerie',
    description: 'En quête d\'une alternance en hôtellerie (fonctions commerciales ou marketing). Passionné par le secteur hospitalier, candidat au MBA de l\'École de Savignac.',
    keywords: ['alternance', 'hôtellerie', 'marketing', 'commercial', 'Savignac', 'Royal Mansour', 'hospitality'],
    authors: [{ name: 'Mouad El Hyani' }],
    openGraph: {
        title: 'Mouad El Hyani - Alternance Hôtellerie',
        description: 'En quête d\'une alternance en hôtellerie (fonctions commerciales ou marketing)',
        type: 'website',
        locale: 'fr_FR',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={inter.variable}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="cursor-none lg:cursor-none">
                <LoadingScreen />
                <CustomCursor />
                {children}
                <Analytics />
            </body>
        </html>
    )
}

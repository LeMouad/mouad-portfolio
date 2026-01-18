import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mouad El Hyani - Hospitality Internship',
    description: 'Seeking an alternance in hospitality (commercial or marketing roles). Passionate about the hospitality sector, candidate for the MBA at École de Savignac.',
    keywords: ['alternance', 'hospitality', 'marketing', 'commercial', 'Savignac', 'Royal Mansour'],
    openGraph: {
        title: 'Mouad El Hyani - Hospitality Internship',
        description: 'Seeking an alternance in hospitality (commercial or marketing roles)',
        type: 'website',
        locale: 'en_US',
    },
}

export default function EnLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

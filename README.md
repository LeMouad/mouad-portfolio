# Mouad El Hyani - Web Resume

Premium one-page bilingual web resume for alternance conversion in hospitality (commercial/marketing roles).

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- French version: `http://localhost:3000`
- English version: `http://localhost:3000/en`

### Build for Production

```bash
# Create static build
npm run build

# Preview production build
npx serve out
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (French metadata)
│   ├── page.tsx            # French homepage
│   ├── globals.css         # Global styles
│   └── en/
│       ├── layout.tsx      # English metadata
│       └── page.tsx        # English homepage
├── components/
│   ├── Navigation.tsx      # Fixed navigation with language toggle
│   ├── ContactModal.tsx    # Accessible contact modal
│   └── sections/
│       ├── Hero.tsx        # Hero section
│       ├── Timeline.tsx    # Professional timeline
│       ├── SkillsGrid.tsx  # Skills grid
│       ├── WhyHospitality.tsx
│       ├── Savignac.tsx
│       └── Contact.tsx
├── content/
│   ├── fr.json            # French content
│   └── en.json            # English content
├── public/
│   ├── cv.pdf             # CV for download
│   ├── hero.jpg           # Hero portrait
│   └── end.jpg            # Contact section image
└── README.md
```

## ✏️ Editing Content

All content is stored in JSON files for easy editing:

- **French**: `content/fr.json`
- **English**: `content/en.json`

To update your professional information:

1. Open the appropriate JSON file
2. Edit the text directly
3. Save and refresh your browser

## 🖼️ Replacing Images

The site uses two main images:

1. **Hero Portrait** (`public/hero.jpg`)
   - Recommended: 800x1000px
   - Style: B&W or high-contrast portrait
   - Replace with your professional photo

2. **Contact Image** (`public/end.jpg`)
   - Recommended: 1200x800px
   - Style: B&W or high-contrast landscape
   - Replace with a second professional photo

Simply replace these files with your own images (keep the same filenames).

## 🌐 Deployment

This is a static Next.js site that can be deployed to:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Connect your Git repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

### GitHub Pages

1. Build the site: `npm run build`
2. Deploy the `out` folder to GitHub Pages

## 🎨 Design System

The site follows the Lorian template aesthetic:

- **Colors**: Monochrome (#FFFFFF, #000000, #F5F5F5, #E5E5E5)
- **Typography**: Inter font, large headings
- **Spacing**: Generous whitespace (py-20 to py-40)
- **Animations**: Subtle fade/slide on scroll
- **Style**: Minimal, premium, editorial

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Bilingual (French/English with instant toggle)
- ✅ Accessible contact modal
- ✅ Smooth scroll navigation
- ✅ SEO optimized
- ✅ Static export (fast loading)
- ✅ Premium animations with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📄 License

© 2026 Mouad El Hyani. All rights reserved.

import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Ritesh Kumar Sinha | Full-Stack Developer & AI Builder',
  description: 'CS undergrad building AI-powered full-stack applications with Next.js, React, Node.js, and LLMs. Open source contributor seeking SDE opportunities.',
  keywords: ['Ritesh Kumar Sinha', 'Full Stack Developer', 'React', 'Next.js', 'AI ML', 'Portfolio', 'Open Source'],
  authors: [{ name: 'Ritesh Kumar Sinha', url: 'https://github.com/kumarsinharitesh' }],
  openGraph: {
    title: 'Ritesh Kumar Sinha | Full-Stack Developer & AI Builder',
    description: 'CS undergrad building AI-powered full-stack applications.',
    type: 'website',
    url: 'https://kumarsinharitesh.github.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritesh Kumar Sinha | Full-Stack Developer',
    description: 'CS undergrad building AI-powered full-stack applications.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Space Grotesk — modern geometric heading font */}
        {/* Plus Jakarta Sans — premium body font */}
        {/* JetBrains Mono — clean mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="bg-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}

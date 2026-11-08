import '../src/index.css';
import SiteHeader from '../src/components/SiteHeader';

export const metadata = {
  title: 'Cyber Shakti Foundation | Cybersecurity Internship Programs',
  description: 'Explore practical cybersecurity internships from Cyber Shakti Foundation, including the current Winter Internship and its 28-day learning agenda.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-28" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050811] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

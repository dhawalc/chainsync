// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'ChainSync - Supply Chain Management Platform',
  description: 'Enterprise supply chain management platform for inventory, production, and analytics',
  keywords: ['supply chain', 'inventory management', 'production planning', 'analytics', 'enterprise'],
  authors: [{ name: 'ChainSync' }],
  creator: 'ChainSync',
  publisher: 'ChainSync',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'ChainSync',
    title: 'ChainSync - Supply Chain Management Platform',
    description: 'Enterprise supply chain management platform for inventory, production, and analytics',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChainSync Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainSync - Supply Chain Management Platform',
    description: 'Enterprise supply chain management platform for inventory, production, and analytics',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  viewportFit: 'cover'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="ChainSync" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Suspense fallback={<div className="h-16 bg-accent animate-pulse" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">
              <Suspense fallback={<div className="h-full bg-background animate-pulse" />}>
                {children}
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

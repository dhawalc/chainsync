// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar"; // Make sure this is our custom Navbar!
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ChainSync - Supply Chain Management",
  description: "Optimize your supply chain with ChainSync",
  icons: {
    icon: '/logocs.png',
    apple: '/logocs.png',
    shortcut: '/logocs.png'
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-white font-sans antialiased", fontSans.variable, inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}

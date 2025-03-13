import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Yield Management | ChainSync",
  description: "Monitor and optimize manufacturing yields across locations",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  width: 'device-width',
  initialScale: 1,
}; 
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Path.io",
  description: "A platform that gets out of your way and helps you focus on what matters most: learning and teaching.",
  icons: {
    icon: [
      { url: "/metadata/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/metadata/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/metadata/favicon.ico"],
    apple: ["/metadata/apple-touch-icon.png"],
  },
  manifest: "/metadata/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
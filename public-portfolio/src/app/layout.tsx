import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Portfolio",
  description: "My personal portfolio system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <header className="border-b">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl tracking-tight">Portfolio</Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors">Home</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
          {children}
        </main>

        <div className="max-w-5xl w-full mx-auto px-4">
          <AdBanner slotId="Above Footer" />
        </div>

        <footer className="border-t py-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

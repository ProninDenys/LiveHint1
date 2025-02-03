import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LiveHint AI",
  description: "Your AI-powered assistant for successful interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 min-h-screen`}> 
        {/* 🔹 NAVIGATION HEADER */}
        <header className="bg-white bg-opacity-20 text-white shadow-md py-4">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            {/* LOGO */}
            <h1 className="text-2xl font-bold tracking-wide">
              LiveHint <span className="text-gray-200">AI</span>
            </h1>

            {/* NAVIGATION LINKS */}
            <nav className="space-x-6 flex">
              <a href="/" className="hover:text-gray-300 transition">Home</a>
              <a href="/auth/login" className="hover:text-gray-300 transition">Login</a>
              <a href="/auth/register" className="hover:text-gray-300 transition">Register</a>
            </nav>
          </div>
        </header>

        {/* 🔹 PAGE CONTENT */}
        <main className="flex flex-col items-center justify-center min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}

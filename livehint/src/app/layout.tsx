import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // ✅ Подключаем клиентский компонент хедера

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
        {/* ✅ Вставляем компонент Header */}
        <Header />

        {/* 🔹 PAGE CONTENT */}
        <main className="flex flex-col items-center justify-center min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}

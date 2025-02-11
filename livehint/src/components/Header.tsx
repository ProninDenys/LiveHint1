"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white bg-opacity-20 text-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-wide">
          LiveHint <span className="text-gray-200">AI</span>
        </h1>

        {/* NAVIGATION LINKS */}
        <nav className="space-x-6 flex items-center">
          <a href="/" className="hover:text-gray-300 transition">Home</a>
          <a href="/auth/login" className="hover:text-gray-300 transition">Login</a>
          <a href="/auth/register" className="hover:text-gray-300 transition">Register</a>

          {/* ✅ SETTINGS BUTTON */}
          <button
            className="px-4 py-2 text-white transition"
            onClick={() => router.push("/settings")}
          >
            ⚙️ Settings
          </button>
        </nav>
      </div>
    </header>
  );
}

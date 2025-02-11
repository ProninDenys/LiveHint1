"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      {/* КОНТЕНТ */}
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-300 mb-4"
        >
          LiveHint AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-800 max-w-xl mb-6"
        >
          Your AI-powered real-time assistant for successful interviews.  
          Get instant suggestions and improve your answers effortlessly.
        </motion.p>

        {/* КНОПКИ */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </motion.button>
        </div>
      </div>

      {/* ФУТЕР */}
      <div className="mt-20 text-gray-600 text-sm text-center">
        © 2025 LiveHint. All rights reserved.
      </div>
    </div>
  );
}

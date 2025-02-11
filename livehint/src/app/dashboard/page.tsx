"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMic, FiMicOff, FiLogOut, FiTrash2, FiFileText, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { getAIResponse } from "@/lib/openai";

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [history, setHistory] = useState<{ text: string; ai: string }[]>([]);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(userData));
    }

    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="w-full  shadow-md p-4 flex justify-between items-center">
        
        <button
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/auth/login");
          }}
        >
          <FiLogOut />
          Log Out
        </button>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto text-center p-6  text-gray-900 rounded shadow-lg mt-10">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}!</h2>

        {/* LANGUAGE SELECTOR */}
        <div className="mb-6">
          <label className="text-lg font-semibold mr-2">Language:</label>
          <select
            className="p-2 border rounded text-gray-900"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en-US">English</option>
            <option value="es-ES">Spanish</option>
            <option value="zh-CN">Chinese</option>
            <option value="fr-FR">French</option>
            <option value="ru-RU">Russian</option>
          </select>
        </div>

        {/* VOICE CONTROL BUTTONS */}
        <div className="flex space-x-6 justify-center mb-6">
          <button
            className={`px-6 py-3 rounded flex items-center gap-2 text-lg font-semibold shadow ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            <FiMic />
            {isListening ? "Listening..." : "Start Recording"}
          </button>

          <button
            className="px-6 py-3 bg-red-500 text-white rounded flex items-center gap-2 text-lg font-semibold shadow hover:bg-red-600 transition"
          >
            <FiMicOff />
            Stop Recording
          </button>
        </div>

        {/* CHAT HISTORY */}
        {history.length > 0 && (
          <div className="mt-6 p-4 bg-gray-200 text-gray-900 rounded shadow w-full">
            <h2 className="font-bold mb-2">Chat History:</h2>
            {history.map((item, index) => (
              <motion.div
                key={index}
                className="p-4 border-b border-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-semibold">You: {item.text}</p>
                <p>AI: {loading ? <FiLoader className="animate-spin inline-block" /> : item.ai}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* HISTORY BUTTONS */}
        <div className="flex space-x-6 mt-6 justify-center">
          <button className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2 shadow hover:bg-red-600 transition">
            <FiTrash2 />
            Clear History
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 shadow hover:bg-blue-600 transition">
            <FiFileText />
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

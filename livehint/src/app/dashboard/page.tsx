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

  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.lang = language;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true; // Мгновенное появление текста

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);

    recognitionRef.current.onresult = async (event: any) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          setTranscript(event.results[i][0].transcript); // Мгновенное обновление
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        setLoading(true);

        try {
          const response = await getAIResponse(finalTranscript);
          setAiResponse(response);

          // Сохраняем только последние 10 сообщений
          const newHistory = [{ text: finalTranscript, ai: response }, ...history].slice(0, 10);
          setHistory(newHistory);
          localStorage.setItem("chatHistory", JSON.stringify(newHistory));
        } catch (err) {
          setAiResponse("⚠️ AI response error (Check API Key)");
        }

        setLoading(false);
      }
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("chatHistory");
  };

  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Chat History", 20, 20);
    doc.setFont("helvetica", "normal");

    history.forEach((item, index) => {
      const y = 30 + index * 10;
      doc.text(`You: ${item.text}`, 20, y);
      doc.text(`AI: ${item.ai}`, 20, y + 5);
    });

    doc.save("chat_history.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center">
      {/* HEADER */}
     
      <button
        className="absolute top-4 right-6 bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow hover:bg-red-600 transition"
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/auth/login");
        }}
      >
        <FiLogOut />
        Log Out
      </button>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto text-center p-6 bg-white text-gray-900 rounded shadow-lg">
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
            onClick={startListening}
          >
            <FiMic />
            {isListening ? "Listening..." : "Start Recording"}
          </button>

          <button
            className="px-6 py-3 bg-gray-700 rounded flex items-center gap-2 text-lg font-semibold shadow hover:bg-gray-800 transition"
            onClick={stopListening}
          >
            <FiMicOff />
            Stop Recording
          </button>
        </div>

        {/* CHAT HISTORY */}
        {history.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 text-gray-900 rounded shadow w-full">
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
          <button className="px-4 py-2 bg-gray-500 text-white rounded flex items-center gap-2 shadow hover:bg-gray-600 transition" onClick={clearHistory}>
            <FiTrash2 />
            Clear History
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 shadow hover:bg-blue-600 transition" onClick={saveAsPDF}>
            <FiFileText />
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) router.push("/dashboard"); // ✅ Если уже залогинен – редирект
  }, []);

  const handleRegister = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/dashboard"); // ✅ Редирект на Dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mb-3 focus:ring focus:ring-green-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md mb-3 focus:ring focus:ring-green-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition"
          onClick={handleRegister}
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

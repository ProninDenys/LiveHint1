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
    if (user) router.push("/dashboard"); // ✅ Если уже зарегистрирован – редирект
  }, []);

  const handleRegister = () => {
    if (!email || !password) {
      setError("Введите email и пароль!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/dashboard"); // ✅ Редирект на Dashboard после регистрации
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-1/2 p-2 border rounded-lg mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        className="w-1/2 p-2 border rounded-lg mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Зарегистрироваться
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

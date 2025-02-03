"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) router.push("/dashboard"); // ✅ Если уже залогинен – редирект
  }, []);

  const handleLogin = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setError("Пользователь не зарегистрирован!");
      return;
    }

    router.push("/dashboard"); // ✅ Редирект на Dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Войти
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

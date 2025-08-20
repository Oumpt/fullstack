"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loginSuccess, setLogin] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("/api/login", { email, password });
      if (res.status === 200) {
        if (res.data.message) {
          setMessage(res.data.message);
          setTimeout(() => setMessage(""), 5000);
        } else {
          setLogin(true);
          setTimeout(() => router.push("/dashboard"), 1000);
        }
      }
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />

        <button
          onClick={login}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : loginSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "กำลังเข้าสู่ระบบ..."
            : loginSuccess
            ? "เข้าสู่ระบบสำเร็จ"
            : message
            ? message
            : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

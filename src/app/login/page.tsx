"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const login = async () => {
    setError(false);
    setMessage("");
    if (!email || !password) {
      setError(true);
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/login", { email, password });
      if (res.status === 200) {
        if (res.data.message) {
          setError(true);
          setMessage(res.data.message);
        } else {
          setMessage("เข้าสู่ระบบสำเร็จ! กำลังพาไปยังหน้าแดชบอร์ด...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        }
      }
    } catch (err: any) {
      setError(true);
      setMessage(
        err.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-indigo-200">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-wide">
          Login to Pongthep SHOP
        </h2>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-5 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled={loading}
          autoComplete="email"
        />

        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 mb-6 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          disabled={loading}
          autoComplete="current-password"
        />

        <button
          onClick={login}
          disabled={loading}
          className={`w-full flex justify-center items-center space-x-2 px-4 py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          <span>{loading ? "กำลังเข้าสู่ระบบ..." : "Login"}</span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

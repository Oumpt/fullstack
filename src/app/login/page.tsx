"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [loginSuccess, setLogin] = useState(false)
    const router = useRouter();

    const login = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/login', {
                email,
                password
            })
            if (res.status) {
                console.log(res.data)
                if (res.data.message) {
                    setMessage(res.data.message)

                    setTimeout(() => {
                        setMessage("")
                    }, 5000);
                } else {
                    setLogin(true)
                    window.location.href = "/dashboard";
                }
            }
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300">
            <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-blue-300">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-wide">Login</h2>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(v) => setEmail(v.currentTarget.value)}
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(v) => setPassword(v.currentTarget.value)}
                    />
                </div>
                <button
                    onClick={login}
                    className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-1 font-semibold transition"
                >
                    {loginSuccess ? "เข้าสู่ระบบสำเร็จ" : loading ? "กำลังเข้าสู่ระบบ" : message != "" ? message : "Login"}
                </button>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

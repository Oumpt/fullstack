"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const { user, isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide cursor-pointer select-none">
          Nextshop
        </h1>
        <nav className="flex items-center space-x-6 text-gray-700 font-medium">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Shop
          </Link>
          <Link
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1 rounded-md cursor-pointer select-none bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span className="text-blue-700 font-semibold">
                  {user.username} ({user.role})
                </span>
                <svg
                  className={`w-4 h-4 text-blue-700 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="flex flex-col py-1">
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors duration-150 rounded-t-lg"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="text-left px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors duration-150 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

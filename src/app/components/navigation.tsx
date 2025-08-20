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

  // ไอคอน SVG เล็ก ๆ สำหรับใช้แทน react-icons
  const UserIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.121 17.804A10 10 0 1118.879 6.196a10 10 0 01-13.758 11.608z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const ChevronDownIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 text-blue-600 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const GridIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const LogoutIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v1a3 3 0 003 3h4" />
    </svg>
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 z-30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide select-none cursor-pointer hover:text-blue-700 transition">
         Pongthep
        </h1>

        <nav className="flex items-center space-x-6 text-gray-700 font-semibold">
          <Link href="/" className="hover:text-blue-600 transition duration-300">
            Home
          </Link>
          <Link href="#" className="hover:text-blue-600 transition duration-300">
            Shop
          </Link>
          <Link href="#" className="hover:text-blue-600 transition duration-300">
            Contact
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition duration-300 cursor-pointer select-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {UserIcon}
                <span className="font-medium text-blue-700">
                  {user.username} ({user.role})
                </span>
                {ChevronDownIcon}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="flex flex-col py-1">
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {GridIcon}
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 w-full text-left"
                    >
                      {LogoutIcon}
                      <span>Logout</span>
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

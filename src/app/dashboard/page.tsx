"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/me");
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
        router.push("/login")
      }
    }

    fetchUser();

  }, [router]);


  async function logout() {
    await axios.post("/api/logout");
    router.push("/login");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">ยินดีต้อนรับ <button onClick={logout} className="py-2 px-2 bg-red-500  rounded-lg"> Logout </button></div>
  )
}

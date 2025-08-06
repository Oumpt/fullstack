"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Products } from "@/generated/prisma";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([])

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


    (async() => {
        const products = await axios.get('/api/products')
        if(products.data.data){
          setProducts(products.data.data)
        }
    })()

    fetchUser();

  }, [router]);


  async function logout() {
    await axios.post("/api/logout");
    router.push("/login");
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("คุณต้องการลบสินค้านี้หรือไม่?")) return;
    try {
      await axios.delete('/api/products', { data: { id } });
      const res = await axios.get('/api/products');
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }



  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div><div className="m-5">ยินดีต้อนรับ <button onClick={logout} className="py-2 px-2 bg-red-500  rounded-lg"> Logout </button></div>
    <div>
    <div className="p-4">
        <div className="flex justify-start p-4">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                เพิ่มสินค้าใหม่
            </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">รูปภาพ</th>
                    <th className="border border-gray-300 p-2">ชื่อ</th>
                    <th className="border border-gray-300 p-2">ราคา</th>
                    <th className="border border-gray-300 p-2">คำอธิบาย</th>
                    <th className="border border-gray-300 p-2">ประเภท</th>
                    <th className="border border-gray-300 p-2">จัดการ</th>
                </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">ไม่มีข้อมูลสินค้า</td>
                </tr>
              ) : (
                products.map((products) => (
                  <tr key={products.id}>
                    <td className="border border-gray-300 p-2 flex justify-center items-center">
                      <img
                        src={products.image}
                        alt={products.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{products.name}</td>
                    <td className="border border-gray-300 p-2 text-right">{products.price}</td>
                    <td className="border border-gray-300 p-2 text-right truncate max-w-[100px]">{products.description}</td>
                    <td className="border border-gray-300 p-2 text-right">{products.category}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(products.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        ลบ
                      </button>
                    </td>
                  </tr>
                )
                )
              )}
            </tbody>
        </table>
    </div>
</div>
    </div>
    

  )
}

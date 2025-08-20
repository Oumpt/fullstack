"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Products } from "@/generated/prisma";

export default function Dashboard() {
  const [products, setProducts] = useState<Products[]>([]);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/products");
        if (res.data.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchProducts();
  }, []);

  async function handleDeleteProduct(id: string) {
    if (!confirm("ต้องการลบสินค้านี้หรือไม่?")) return;
    try {
      await axios.delete("/api/products", { data: { id } });
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  }

  function openEditModal(product: Products) {
    setEditingProduct(product);
  }
  function closeEditModal() {
    setEditingProduct(null);
  }

  async function handleUpdateProduct() {
    if (!editingProduct) return;
    try {
      await axios.put("/api/products", editingProduct);
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
      closeEditModal();
    } catch (error) {
      console.error("Error updating product", error);
    }
  }

  async function handleAddProduct() {
    try {
      await axios.post("/api/products", newProduct);
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
      setShowAddModal(false);
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            เพิ่มสินค้าใหม่
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 p-3 text-left">รูปภาพ</th>
                <th className="border border-gray-300 p-3 text-left">ชื่อ</th>
                <th className="border border-gray-300 p-3 text-right">ราคา</th>
                <th className="border border-gray-300 p-3 text-left">คำอธิบาย</th>
                <th className="border border-gray-300 p-3 text-left">ประเภท</th>
                <th className="border border-gray-300 p-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    ไม่มีสินค้า
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-300 p-2 flex justify-center items-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">ไม่มีรูป</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-3">{product.name}</td>
                    <td className="border border-gray-300 p-3 text-right font-semibold text-gray-700">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-3 max-w-xs truncate">
                      {product.description || "-"}
                    </td>
                    <td className="border border-gray-300 p-3">{product.category || "-"}</td>
                    <td className="border border-gray-300 p-3 text-center space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">แก้ไขสินค้า</h2>

            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              placeholder="ชื่อสินค้า"
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: +e.target.value })
              }
              placeholder="ราคา"
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingProduct.description ?? ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              placeholder="คำอธิบาย"
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingProduct.category ?? ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, category: e.target.value })
              }
              placeholder="ประเภท"
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ลิงก์รูปภาพ"
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, image: e.target.value })
              }
            />

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400 transition"
                onClick={closeEditModal}
              >
                ยกเลิก
              </button>
              <button
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                onClick={handleUpdateProduct}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">เพิ่มสินค้า</h2>

            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ชื่อสินค้า"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ราคา"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="คำอธิบาย"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ประเภท"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ลิงก์รูปภาพ"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400 transition"
                onClick={() => setShowAddModal(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleAddProduct}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

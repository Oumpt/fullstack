'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Products } from '@/generated/prisma';
interface DataType {

  id : number;
  name : string;
  price : number;
  image : string;
  description?: string;
}

export default function Home() {

  const [products, setProducts] = useState<Products[]>([])

  useEffect(() => {
    (async() => {
        const products = await axios.get('/api/products')
        if(products.data.data){
          setProducts(products.data.data)
        }
    })()
  }, [])


  return (
    <>
      <Head>

        <title>Pongthep - Home</title>

        <title>Pongtheppp - Home</title>

      </Head>

      <main className="bg-gray-50 min-h-screen">
        <section className="bg-blue-100 text-center py-16">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Pongthep</h2>
          <p className="text-lg text-blue-700">Your one-stop shop for everyday essentials</p>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
                <h4 className="mt-4 text-lg font-semibold">{product.name}</h4>
                <p className="text-red-600 font-bold">{product.price}</p>
                <p className="mt-2 text-gray-700">{product.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

    </>
  )
}

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
  category?: string;
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
      </Head>

      <main className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 min-h-screen font-sans text-gray-800">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center py-20 shadow-lg">
          <h2 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">Welcome to Pongthep</h2>
          <p className="text-xl max-w-xl mx-auto font-light drop-shadow-md">Your one-stop shop for everyday essentials — quality and style, all in one place.</p>
        </section>

        <section className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold mb-10 border-b-4 border-indigo-500 inline-block pb-2">Featured Products</h3>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-1 text-indigo-700">{product.name}</h4>
                  <p className="text-red-600 font-bold text-lg">{product.price.toFixed(2)}</p>
                  <p className="mt-3 text-gray-600 min-h-[3rem] line-clamp-3">{product.description || 'No description available.'}</p>
                  <span className="inline-block mt-4 px-4 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full border border-indigo-300">
                    {product.category || 'General'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

"use client"
import Image from 'next/image'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Mock product data
const products = [
  { id: 1, name: "3D Printed Vase", price: 29.99, category: "Home Decor", rating: 4.5 },
  { id: 2, name: "Custom Phone Stand", price: 14.99, category: "Accessories", rating: 4.2 },
  { id: 3, name: "Geometric Planter", price: 24.99, category: "Home Decor", rating: 4.7 },
  { id: 4, name: "3D Printed Keychain", price: 9.99, category: "Accessories", rating: 4.0 },
  { id: 5, name: "Desk Organizer", price: 19.99, category: "Office", rating: 4.6 },
  { id: 6, name: "3D Printed Lamp Shade", price: 34.99, category: "Lighting", rating: 4.3 },
  { id: 7, name: "Customizable Coasters", price: 12.99, category: "Home Decor", rating: 4.1 },
  { id: 8, name: "3D Printed Wall Art", price: 39.99, category: "Home Decor", rating: 4.8 },
]

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  //const categories = ["All", ...new Set(products.map(p => p.category))]

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price") return a.price - b.price
      return b.rating - a.rating
    })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header/>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <label htmlFor="category" className="mr-2">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1"
            >
              {/*categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))*/}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-400 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

     <Footer/>
    </div>
  )
}

"use client"
import Image from 'next/image'
import { Search, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Product } from '@/types/Product'; 
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products_catalog/mockProducts'; // Adjust path as necessary

import StlViewerComponent from '@/components/RotateStlView'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-12">
          <Image src="/placeholder.svg?height=400&width=1200" alt="3D Printing" width={1200} height={400} className="w-full h-[400px] object-cover rounded-lg" />
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <h2 className="text-4xl font-bold mb-4">La Impresion 3D,<br />mas facil<br />que nunca.</h2>
            <p className="mb-4">Nunca mas le vas a tener que pedir<br />el cosito al ferretero.</p>
            <a href='./register'>
              <button className="bg-white text-black py-2 px-6 rounded-full font-bold">Registrate</button>
            </a>
            
          </div>
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <StlViewerComponent url={"/Capybara_Plain.stl"} />
          </div>
          
        </section>

        <section className="flex justify-between mb-12">
          {['Artistas', 'Usuarios', 'Diseños'].map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold mb-2">10000</h3>
              <p>{category}</p>
              <p className="text-sm text-gray-400">
                {index === 0 && 'Ya tienen su reconocimiento'}
                {index === 1 && 'Confian en nosotros'}
                {index === 2 && 'Ya publicados y esperandote'}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Elegidos para vos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="flex justify-between">
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Comprar</h3>
            <a href="/products_catalog">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ver Productos</button>
            </a>
            <a href="/lookfor_designer">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Diseñador</button>
            </a>
            <a href="/desing_request">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full">Iniciar Subasta Inversa</button>
            </a>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Vender</h3>
            <a href="/publish_product">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Publicar Produto</button>
            </a>
            <a href="/offer_services">
            <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ofrecer Servicios</button>
            </a>
            <a href="/subasta_inversa">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Subasta Inversa</button>
            </a>
          </div>
        </section>
      </main>

      <Footer />


    </div>
  )
}

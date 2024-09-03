
"use client"
import Image from 'next/image'
import { Search, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header/>

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-12">
          <Image src="/placeholder.svg?height=400&width=1200" alt="3D Printing" width={1200} height={400} className="w-full h-[400px] object-cover rounded-lg" />
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <h2 className="text-4xl font-bold mb-4">La Impresion 3D,<br />mas facil<br />que nunca.</h2>
            <p className="mb-4">Nunca mas vas a tener que perder<br />el sueño al ferretero.</p>
            <a href='./auth_users'>
              <button className="bg-white text-black py-2 px-6 rounded-full font-bold">Registrate</button>
            </a>
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
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
                <Image src={`/placeholder.svg?height=200&width=200`} alt={`Product ${item}`} width={200} height={200} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="flex justify-between">
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Comprar</h3>
            <a href="/products">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ver Productos</button>
            </a>
            <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Diseñador</button>
            <button className="bg-gray-700 py-2 px-4 rounded block w-full">Iniciar Subasta Inversa</button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Vender</h3>
            <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Publicar Produto</button>
            <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ofrecer Servicios</button>
            <button className="bg-gray-700 py-2 px-4 rounded block w-full">Buscar Subasta Inversa</button>
          </div>
        </section>
      </main>

      <Footer/>
      

    </div>
  )
}

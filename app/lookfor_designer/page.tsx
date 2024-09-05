"use client"
import Image from 'next/image'
import { Search, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DesignerPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header/>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
    

        {/* Designer Profiles */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Diseñadores Disponibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
                <Image 
                  src={`/designer-placeholder.svg?height=200&width=200`} 
                  alt={`Designer ${item}`} 
                  width={200} 
                  height={200} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold">Diseñador {item}</h4>
                  <p className="text-sm text-gray-400">Especialidad: {item % 2 === 0 ? 'Gráficos' : 'Web'}</p>
                  <a href={`/designer/${item}`} className="text-blue-400 hover:underline">Ver Perfil</a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer/>
    </div>
  )
}

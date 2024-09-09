// "use client"
// import Image from 'next/image'
// import { Search, User } from 'lucide-react'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

// export default function DesignerPage() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header/>

//       <main className="container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <h3 className="text-2xl font-bold mb-4">Diseñadores Disponibles</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
//               <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
//                 <Image 
//                   src={`/designers/designer${item}.jpg`} 
//                   alt={`Designer ${item}`} 
//                   width={180} 
//                   height={180} 
//                   className="w-full h-48 object-cover" 
//                 />
//                 <div className="p-4">
//                   <h4 className="text-xl font-bold">Diseñador {item}</h4>
//                   <p className="text-sm text-gray-400">Especialidad: {item % 2 === 0 ? 'Gráficos' : 'Web'}</p>
//                   <a href={`designers/designer/${item}`} className="text-blue-400 hover:underline">Ver Perfil</a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//       </main>

//       <Footer/>
//     </div>
//   )
// }
"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Define los diseñadores en un array
const designers = [
  { id: 1, name: 'Luciano Stupnik', size: 'Pequeño', materials: 'PLA / PETG' },
  { id: 2, name: 'Grand Chamaco', size: 'Grande', materials: 'Nylon' },
  { id: 3, name: 'Zigor Samaniego', size: 'Grande', materials: 'TPU' },
  { id: 4, name: 'Yanick Dusseault', size: 'Mediano', materials: 'PVA' },
  { id: 5, name: 'Aarón Martínez', size: 'Mediano', materials: 'HIPS / TPU' },
  { id: 6, name: 'Ricardo Pastor', size: 'Pequeño', materials: 'ABS / PVA' },
  { id: 7, name: 'Filip Hodas', size: 'Grande', materials: 'PLA / ABS' },
];

export default function DesignerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Diseñadores Disponibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {designers.map(designer => (
              <div key={designer.id} className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-2">{designer.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">Tamaño: {designer.size}</p>
                  <p className="text-sm text-gray-400 mb-4">Materiales: {designer.materials}</p>
                </div>
                <a href={`designers/designer/${designer.id}`} className="text-blue-400 hover:underline mt-auto">Ver Perfil</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}
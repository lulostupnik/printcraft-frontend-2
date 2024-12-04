"use client"
import { useState, ChangeEvent, FormEvent } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Opciones predefinidas de especialidades
const specialtiesOptions = [
  "ABS", "PLA", "PETG", "Nylon", "TPU", "PVA", "HIPS"
]

const sizeOptions = ["Pequeño", "Mediano", "Grande"]

// Define el tipo de datos del estado
interface ServiceData {
  name: string;
  specialty: string;
  description: string;
  size: string;
}

export default function OfferServices() {
  const [serviceData, setServiceData] = useState<ServiceData>({
    name: '',
    specialty: '',
    description: '',
    size: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setServiceData({ ...serviceData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al servidor o API
    console.log('Servicio ofrecido:', serviceData)
    alert(`Servicio ofrecido: ${serviceData.name} - ${serviceData.specialty}`)
    setServiceData({
      name: '',
      specialty: '',
      description: '',
      size: '',
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Ofrecer Mis Servicios</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={serviceData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty" className="block text-sm font-medium">Especialidad</label>
            <select
              id="specialty"
              name="specialty"
              value={serviceData.specialty}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            >
              <option value="">Selecciona una especialidad</option>
              {specialtiesOptions.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm font-medium">Tamaño</label>
            <select
              id="size"
              name="size"
              value={serviceData.size}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            >
              <option value="">Selecciona un tamaño</option>
              {sizeOptions.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción Breve</label>
            <textarea
              id="description"
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500"
          >
            Ofrecer Servicio
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}

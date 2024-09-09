// // /pages/vender/producto.jsx
// "use client"
// import { useState } from 'react'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

// export default function PublicarProducto() {
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: null,
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setProductData({ ...productData, [name]: value })
//   }

//   const handleFileChange = (e) => {
//     setProductData({ ...productData, image: e.target.files[0] })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Aquí iría la lógica para enviar los datos del producto al servidor o API.
//     console.log('Producto publicado:', productData)
//     // Resetea el formulario tras la publicación
//     setProductData({
//       name: '',
//       description: '',
//       price: '',
//       image: null,
//     })
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="flex-1 container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
//         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
//           <div className="mb-4">
//             <label htmlFor="nombre" className="block text-sm font-medium">Nombre del Producto</label>
//             <input
//               type="text"
//               id="nombre"
//               name="nombre"
//               value={productData.name}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
//             <textarea
//               id="description"
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="precio" className="block text-sm font-medium">Precio</label>
//             <input
//               type="number"
//               id="precio"
//               name="precio"
//               value={productData.price}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="imagen" className="block text-sm font-medium">Imagen del Producto</label>
//             <input
//               type="file"
//               id="imagen"
//               name="imagen"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="imagen" className="block text-sm font-medium">Archivo 3D del Producto</label>
//             <input
//               type="file"
//               id="imagen"
//               name="imagen"
//               accept=".stl"
//               onChange={handleFileChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500"
//           >
//             Publicar Producto
//           </button>
//         </form>
//       </main>

//       <Footer />
//     </div>
//   )
// }
"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductData {
  name: string;
  description: string;
  price: string;
  image: File | null;
}

export default function PublicarProducto() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductData({ ...productData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del producto al servidor o API.
    console.log('Producto publicado:', productData);
    // Resetea el formulario tras la publicación
    setProductData({
      name: '',
      description: '',
      price: '',
      image: null,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium">Nombre del Producto</label>
            <input
              type="text"
              id="nombre"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              id="precio"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">Imagen del Producto</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500"
          >
            Publicar Producto
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

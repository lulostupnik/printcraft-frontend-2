'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [hasDesign, setHasDesign] = useState<boolean>(false);
  const params = useParams();
  const code = params.code;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contactar con {code}</h1>

        {/* Form Section */}
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={hasDesign}
              onChange={() => setHasDesign(!hasDesign)}
            />
            <span>Ya tengo un diseño (archivo STL)</span>
          </label>

          {/* STL Upload Section - Always Present */}
          

          {/* Description Section - Always Present */}
          <div className="mb-8">
            {
              hasDesign ? 
              (
                <div>
                <h3 className="text-2xl font-bold mb-2">Informacion adicional</h3>
                <p className="text-gray-300 mb-4">Aqui se puede agregar informacion adicional sobre su diseño.</p>
                <textarea
                  className="w-full p-2 rounded text-gray-900"
                  placeholder="Incluya la informacion adicional pertinente..."
                  rows={4}
                  />
                </div>
              ) :
              (
                <div>
                  <h3 className="text-2xl font-bold mb-2">Descripcion de su idea</h3>
                  <p className="text-gray-300 mb-4">Por favor denos una descripcion detallada de su idea, para que lo podamos ayudar con un diseño y su consecuente impresion.</p>
                  <textarea
                  className="w-full p-2 rounded text-gray-900"
                  placeholder="Describa su idea..."
                  rows={4}
                  />
                </div>
              )
            }
          </div>

          <div className="mb-8">
            { hasDesign ? (
            <div>  
              <h3 className="text-2xl font-bold mb-2">Aqui puede subir su diseño</h3>
              <p className="text-gray-300 mb-4">Inserte su archivo de tipo .stl.</p>
              <input
                type="file"
                accept=".stl"
                className="mb-4 text-gray-900"
              />
            </div>) : 
            <div/>}
          </div>

          {/* Reference Image Section - Always Present */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Imagen de referencia (Opcional)</h3>
            <p className="text-gray-300 mb-4">Si cuenta con una imagen de referencia, puede subirla aqui.</p>
            <input
              type="file"
              accept="image/*"
              className="mb-4 text-gray-900"
            />
          </div>

          {/* Submit Button - Always Present */}
          <button className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500">
            Enviar
          </button>
        </div>

      </main>
      <Footer/>
    </div>
  );
};

export default ContactPage;

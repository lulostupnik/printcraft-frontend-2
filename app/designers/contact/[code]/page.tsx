'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from '@/api/api';

const ContactPage = () => {
  const [hasDesign, setHasDesign] = useState<boolean>(false);
  const [material, setMaterial] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [stlFile, setStlFile] = useState<File | null>(null);
  const [designImages, setDesignImages] = useState<File[]>([]); // New state for design images
  const params = useParams();
  const code = typeof params.code === 'string' ? params.code : '';
  const [reqType, setReqType] = useState<'print-requests' | 'design-requests'>('design-requests');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('No estás autorizado. Por favor inicia sesión.');
      return;
    }

    try {
      const formData = new FormData();
      if(code != 'all'){
        formData.append('sellerID', code);
      }
      formData.append('description', description);
      formData.append('quantity', quantity.toString());
      formData.append('material', material);

      if (hasDesign) {
        if (stlFile) {
          formData.append('stl_file', stlFile);
        }
        setReqType('print-requests');
      } else {
        setReqType('design-requests');
        // Append multiple design images to 'design_images_files'
        designImages.forEach((image, index) => {
          formData.append(`design_images_files[${index}]`, image);
        });
      }

      const response = await fetch(`${API_URL}/${reqType}/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Formulario enviado con éxito');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Ocurrió un error. Inténtalo nuevamente.');
      }
    } catch (error) {
      alert('Ocurrió un error. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contactar con {code}</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-8">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={hasDesign}
              onChange={() => {setHasDesign(!hasDesign); 
                setReqType(!hasDesign ? 'print-requests' : 'design-requests');
                              ;} }
            />
            <span>Ya tengo un diseño (archivo STL)</span>
          </label>

          {/* Description Section */}
          <div className="mb-8">
            {hasDesign ? (
              <div>
                <h3 className="text-2xl font-bold mb-2">Información adicional</h3>
                <p className="text-gray-300 mb-4">
                  Aquí se puede agregar información adicional sobre su diseño.
                </p>
                <textarea
                  className="w-full p-2 rounded text-gray-900"
                  placeholder="Incluya la información adicional pertinente..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-2">Descripción de su idea</h3>
                <p className="text-gray-300 mb-4">
                  Por favor denos una descripción detallada de su idea, para que podamos ayudar con un diseño y su consecuente impresión.
                </p>
                <textarea
                  className="w-full p-2 rounded text-gray-900"
                  placeholder="Describa su idea..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* STL Upload Section */}
          {hasDesign && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Aquí puede subir su diseño</h3>
              <p className="text-gray-300 mb-4">Inserte su archivo de tipo .stl.</p>
              <input
                type="file"
                accept=".stl"
                className="mb-4 text-gray-900"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setStlFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}

          {/* Reference Image Section */}
          {!hasDesign && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Imagen de referencia (Opcional)</h3>
              <p className="text-gray-300 mb-4">
                Si cuenta con una imagen de referencia, puede subirla aquí.
              </p>
              <input
                type="file"
                accept="image/*"
                multiple // Allow multiple file uploads
                className="mb-4 text-gray-900"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setDesignImages(Array.from(e.target.files)); // Store multiple images
                  }
                }}
              />
            </div>
          )}

          {/* Material Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Material</h3>
            <p className="text-gray-300 mb-4">Especifique el material que desea utilizar.</p>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              placeholder="Especifique el material..."
              required
            />
          </div>

          {/* Quantity Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Cantidad</h3>
            <p className="text-gray-300 mb-4">Ingrese la cantidad de piezas que desea.</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500"
          >
            Enviar
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
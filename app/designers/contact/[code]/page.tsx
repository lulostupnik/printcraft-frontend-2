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
  const [urlfecth, setUrlFetch] = useState<string>(`${API_URL}`);


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
        if(code === 'all'){
          designImages.forEach((image, index) => {
            formData.append(`image_files[${index}]`, image);
          });
        }else{
          designImages.forEach((image, index) => {
            formData.append(`design_images_files[${index}]`, image);
          });
        }
       
      }
      
      const finalUrl = code === 'all'
      ? (reqType === 'design-requests'
        ? `${API_URL}/design-reverse-auction/create/`
        : `${API_URL}/print-reverse-auction/create/`)
      : `${API_URL}/${reqType}/create/`;

      // if(code == 'all'){
      //   if(reqType == 'design-requests' ){
      //     setUrlFetch(`${API_URL}/design-reverse-auction/create/`);
      //   }else{
      //     setUrlFetch(`${API_URL}/print-reverse-auction/create/`);
      //   }
      
      // }else{
      //   setUrlFetch(`${API_URL}/${reqType}/create/`);
      // }

      const response = await fetch(finalUrl, {
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
      <Header showCart={true}/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contactar vendedor</h1>

        {/* Form Section - Updated styling */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 bg-gray-700 border border-gray-600"
                checked={hasDesign}
                onChange={() => {
                  setHasDesign(!hasDesign);
                  setReqType(!hasDesign ? 'print-requests' : 'design-requests');
                }}
              />
              <span className="text-sm font-medium">Ya tengo un diseño (archivo STL)</span>
            </label>
          </div>

          {/* Description Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {hasDesign ? 'Información adicional' : 'Descripción de su idea'}
            </label>
            <p className="text-gray-400 text-sm mb-2">
              {hasDesign 
                ? 'Aquí se puede agregar información adicional sobre su diseño.'
                : 'Por favor denos una descripción detallada de su idea, para que podamos ayudar con un diseño y su consecuente impresión.'}
            </p>
            <textarea
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder={hasDesign ? "Incluya la información adicional pertinente..." : "Describa su idea..."}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* STL Upload Section */}
          {hasDesign && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Archivo STL</label>
              <input
                type="file"
                accept=".stl"
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Imagen de referencia (Opcional)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setDesignImages(Array.from(e.target.files));
                  }
                }}
              />
            </div>
          )}

          {/* Material Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Especifique el material..."
              required
            />
          </div>

          {/* Quantity Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cantidad</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500"
          >
            Enviar Solicitud
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
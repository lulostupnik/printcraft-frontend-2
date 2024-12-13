'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from '@/api/api';
import { Suspense } from "react";
import ChatBox from "@/components/ChatBox";
interface Material {
  name: string;
}

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
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_URL}/materials/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
        }
      } catch (error) {
        console.error('Error al cargar materiales:', error);
      }
    };

    fetchMaterials();
  }, []);

  // Función para recargar los datos
  const reloadData = async () => {
    try {
      const response = await fetch(`${API_URL}/materials/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error al recargar materiales:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setNotificationMessage('No estás autorizado. Por favor inicia sesión.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
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

      const response = await fetch(finalUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setNotificationMessage('✅ Solicitud enviada exitosamente');
        setNotificationType('success');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);

        // Limpiar el formulario
        setDescription('');
        setQuantity(1);
        setMaterial('');
        setStlFile(null);
        setDesignImages([]);
        // Recargar los datos
        await reloadData();
      } else {
        const errorData = await response.json();
        setNotificationMessage(errorData.message || 'Ocurrió un error. Inténtalo nuevamente.');
        setNotificationType('error');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      setNotificationMessage('Ocurrió un error. Inténtalo nuevamente.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Notificación de éxito */}
      {showNotification && (
        <div className={`fixed top-4 right-4 ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out`}>
          {notificationMessage}
        </div>
      )}

      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>


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
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded font-sans text-sm text-white"
              required
            >
              <option value="">Selecciona un material</option>
              {materials.map((material, index) => (
                <option key={index} value={material.name} className="font-sans">
                  {material.name}
                </option>
              ))}
            </select>
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
'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from "@/api/api";

export default function SellerFormPage() {
  const router = useRouter();
  const params = useParams();
  const codeParam = params.code; // The code from the dynamic URL segment

  const [address, setAddress] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mpMail, setMpMail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!codeParam) {
      // If no code param is present, redirect back to the main seller page
      router.replace('/register_seller');
    }
  }, [codeParam, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null); 
    setErrorMessage(null);

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setErrorMessage('No estás autorizado. Por favor inicia sesión.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('address', address);
      formData.append('store_name', storeName);
      formData.append('description', description);
      formData.append('mp_mail', mpMail);

      if (codeParam) {
        formData.append('code', codeParam);
      }

      if (profilePicture) {
        if (profilePicture.size > 5 * 1024 * 1024) {
          setErrorMessage('La imagen es demasiado grande. El tamaño máximo es 5MB.');
          return;
        }
        formData.append('profile_picture_file', profilePicture);
      }

      const response = await fetch(`${API_URL}/seller/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isSeller', JSON.stringify(true));
        setSuccessMessage('¡Felicidades! Te has convertido en vendedor exitosamente.');

        setTimeout(() => {
          router.push('/profile');
        }, 200);
      } else {
        if (data.error === 'Duplicate') {
          setErrorMessage('Ya existe un vendedor con estos datos. Por favor, verifica la información.');
        } else {
          setErrorMessage(data.message || 'Ocurrió un error al registrar el vendedor. Inténtalo nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage('Ocurrió un error en la conexión. Por favor, verifica tu conexión a internet e inténtalo nuevamente.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Suspense fallback={<div>Cargando...</div>}>
        <Header showCart={true} showSearchBar={true}/>
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">Convertirme en Vendedor</h1>
          {codeParam && (
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4 mt-8">
              <div>
                <label htmlFor="address" className="block text-lg font-medium mb-2">
                  Dirección
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="storeName" className="block text-lg font-medium mb-2">
                  Nombre de la Tienda
                </label>
                <input
                  name="storeName"
                  type="text"
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="mpMail" className="block text-lg font-medium mb-2">
                  Correo de Mercado Pago
                </label>
                <input
                  name="email"
                  type="email"
                  id="mpMail"
                  value={mpMail}
                  onChange={(e) => setMpMail(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="profilePicture" className="block text-lg font-medium mb-2">
                  Foto de Perfil
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      if (!file.type.startsWith('image/')) {
                        setErrorMessage('Por favor, selecciona un archivo de imagen válido.');
                        return;
                      }
                      setProfilePicture(file);
                    }
                  }}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                  accept="image/*"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Enviar
              </button>

              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </form>
          )}
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

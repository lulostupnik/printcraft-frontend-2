"use client";
import Header from '@/components/Header';
import { API_URL } from "@/api/api";
import Footer from '@/components/Footer';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from "react";

interface Designer {
  userId: number;
  address: string;
  store_name: string;
  description: string;
  profile_picture: string | null;
}

export default function DesignerPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await fetch(`${API_URL}/sellers/`);
        if (response.ok) {
          const data = await response.json();
          setDesigners(data);
        } else {
          console.error('Failed to fetch designers');
        }
      } catch (error) {
        console.error('Error fetching designers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

      // Redirect the user when "Publicar Producto" is clicked
      const handleDoRequestClick = () => {
        if (!isLoggedIn) {
          router.push('/login');
        } else {
          router.push('/designers/contact/all');
        }
      };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>
      <main className="flex-1 container mx-auto px-4 py-8">

        {/* Nueva Sección para realizar un request */}
        <section className="mb-12 p-6 bg-gray-700 rounded-lg text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Desea realizar una Subasta Inversa?</h2>
          <p className="mb-4">Puedes enviar un request para que todos los diseñadores vean tu solicitud.</p>
          <button onClick={handleDoRequestClick} style={{ cursor: 'pointer' }} className="bg-white text-gray-600 py-3 px-8 rounded-full font-bold text-lg hover:bg-gray-200" name="do_request">
            Realizar Request
          </button>
        </section>

        {/* Sección de Diseñadores */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Diseñadores Disponibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {designers.map(designer => (
              <div key={designer.userId} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-blue-500 mb-4">
                  {/* Placeholder para la imagen de perfil */}
                  {designer.profile_picture ? (
                    <img
                      src={designer.profile_picture}
                      alt={designer.store_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sin Imagen
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-bold">{designer.store_name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{designer.description}</p>
                  <a
                    href={`designers/designer/${designer.userId}`}
                    className="text-blue-400 hover:underline"
                  >
                    Ver Perfil
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
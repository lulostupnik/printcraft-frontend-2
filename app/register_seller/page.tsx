'use client'

import React, { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SellerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    // If we have the code, redirect to the SellerFormPage
    if (code) {
      router.replace(`/register_seller/${code}`);
    }
  }, [code, router]);

  const mercadoPagoURL = `https://auth.mercadopago.com.ar/authorization?client_id=5696619348847657&response_type=code&redirect_uri=https://3dcapybara.vercel.app/register_seller`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Suspense fallback={<div>Cargando...</div>}>
        <Header showCart={true} showSearchBar={true}/>
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">Convertirme en Vendedor</h1>

          {/* If we don't have a code, show the Mercado Pago connect step */}
          {!code && (
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <p className="text-xl mb-4">
                Primero, necesitamos que conectes tu cuenta con la de Mercado Pago para recibir dinero.
              </p>
              <a
                href={mercadoPagoURL}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Conectar con Mercado Pago
              </a>
            </div>
          )}
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

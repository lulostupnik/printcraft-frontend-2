'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MercadoPagoComponent from '@/components/MercadoPagoComponent';

export default function PaymentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if tokens exist in localStorage to determine login status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  // Redirect if the user is not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [loading, isLoggedIn, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="relative mb-12 bg-gray-800">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8 p-8">
            <div className="w-1/2 space-y-4 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Completa tu pago
              </h2>
              <h3 className="mb-4">
                Usa el formulario de pago a continuación para completar tu transacción con Mercado Pago.
              </h3>
            </div>
          </div>
        </section>

        {/* Payment Form Section */}
        <section className="relative mb-12">
          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg overflow-hidden p-8">
            <MercadoPagoComponent />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


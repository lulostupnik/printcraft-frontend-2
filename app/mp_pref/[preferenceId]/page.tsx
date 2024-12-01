'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MercadoPagoComponent from '@/components/MercadoPagoComponent';

export default function PaymentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null); // Store extracted preferenceId
  const router = useRouter();
  const params = useParams(); // Get the params from the URL

  // Get 'preferenceId' from params
  const { preferenceId: urlPreferenceId } = params;

  // Ensure preferenceId is a string (handles string[] case)
  useEffect(() => {
    if (Array.isArray(urlPreferenceId)) {
      setPreferenceId(urlPreferenceId[0]); // Take the first element if it's an array
    } else if (urlPreferenceId) {
      setPreferenceId(urlPreferenceId); // Use the extracted string value
    } else {
      console.c('Preference ID not found in the URL');
    }
  }, [urlPreferenceId]);

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

  if (loading) {
    // Show a loading indicator while determining if the user is logged in
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="relative mb-12 bg-gray-800 flex items-center justify-center min-h-[300px]">
          <div className="w-full max-w-xl text-center space-y-4">
            <h2 className="text-4xl font-bold mb-4">Completa tu pago</h2>
            <h3 className="mb-4">
              Usa el formulario de pago a continuación para completar tu transacción con Mercado Pago.
            </h3>
          </div>
        </section>

        {/* Payment Form Section */}
        <section className="relative mb-12">
          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg overflow-hidden p-8">
            {preferenceId ? (
                <MercadoPagoComponent preferenceId={preferenceId} />
            ) : (
              <p>Loading payment information...</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

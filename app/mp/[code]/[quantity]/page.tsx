'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MercadoPagoComponent from '@/components/MercadoPagoComponent';
import { API_URL } from '@/api/api';

export default function PaymentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);
  const router = useRouter();
  const params = useParams(); // Get the params from the URL
  const { code, quantity } = params; // Extract 'code' and 'quantity' from params

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

  // Function to get preference_id from backend view
  useEffect(() => {
    if (isLoggedIn && code && quantity) {
      const fetchPreferenceId = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
         
          const order_products = [
            {
              product: String(code), // Convert 'code' to string
              quantity: String(quantity), // Convert 'quantity' to string
            },
          ];
  
          const response = await fetch(`${API_URL}/orders/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`, // Include the token in Authorization header
            },
            body: JSON.stringify({ order_products }), // Send the products array
          });

          if (!response.ok) {
            throw new Error('Failed to fetch preference_id');
          }

          const data = await response.json();
          setPreferenceId(data.preference_id);
        } catch (error) {
          console.error('Error fetching preference_id:', error);
        }
      };

      fetchPreferenceId();
    }
  }, [isLoggedIn, code, quantity]);

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

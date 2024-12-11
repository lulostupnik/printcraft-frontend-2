'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { API_URL } from "@/api/api";
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import { Suspense } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [sellerData, setSellerData] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const router = useRouter();

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setEmail(localStorage.getItem('email'));

    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false');
    setIsSeller(sellerStatus);

    if (sellerStatus) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        fetchSellerData(userId);
      }
    }
  }, []);

  const fetchSellerData = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/seller/${userId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch seller data');
      }
      const data = await response.json();
      setSellerData(data);
      setProducts(data.products || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStartSelling = () => {
    router.push('/register_seller');
  };

  const handleProductClick = (productCode: string) => {
    router.push(`/products/${productCode}`);
  };

  const handleEdit = () => {
    setEditForm({
      username: username || '',
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || ''
    });
    setIsEditOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      
      const response = await fetch(`${API_URL}/user/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Failed to update user data');

      // Actualizar el localStorage y el estado
      localStorage.setItem('username', editForm.username);
      localStorage.setItem('firstName', editForm.firstName);
      localStorage.setItem('lastName', editForm.lastName);
      localStorage.setItem('email', editForm.email);

      setUsername(editForm.username);
      setFirstName(editForm.firstName);
      setLastName(editForm.lastName);
      setEmail(editForm.email);

      console.log('Cerrando snackbar...');
      setIsEditOpen(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al actualizar los datos');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>


      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Perfil de Usuario</h1>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Información Personal</h2>
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Modificar
              </button>
            </div>
            <p className="mb-2">
              <strong>Username:</strong> {username || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>First Name:</strong> {firstName || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {lastName || 'N/A'}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {email || 'N/A'}
            </p>
            {!isSeller && (
              <button
                onClick={handleStartSelling}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Empezar a vender
              </button>
            )}
          </div>
        </section>

        {isEditOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsEditOpen(false)} />

              <div className="relative bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Modificar Información Personal</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      className="w-full p-2 rounded bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                      className="w-full p-2 rounded bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Apellido</label>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                      className="w-full p-2 rounded bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full p-2 rounded bg-gray-700"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSeller && sellerData && (
          <section className="mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Información de Vendedor</h2>
              <p className="mb-2">
                <strong>Dirección:</strong> {sellerData.address || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Nombre de la Tienda:</strong> {sellerData.store_name || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Descripción:</strong> {sellerData.description || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Correo de Mercado Pago:</strong> {sellerData.mp_mail || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Foto de Perfil:</strong>{' '}
                <img src={sellerData.profile_picture} alt="Profile" className="w-16 h-16 rounded-full" />
              </p>
              {/* <p className="mb-2">
                <strong>Materiales:</strong>{' '}
                {sellerData.materials && sellerData.materials.length > 0
                  ? sellerData.materials.join(', ')
                  : 'N/A'}
              </p> */}
             
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

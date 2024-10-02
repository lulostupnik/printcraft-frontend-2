'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { API_URL } from "@/api/api";
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false); // Track if user is a seller
  const [sellerAddress, setSellerAddress] = useState<string | null>(null);
  const [sellerStoreName, setSellerStoreName] = useState<string | null>(null);
  const [sellerDescription, setSellerDescription] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [error, setError] = useState<string | null>(null); // Error state for products

  const router = useRouter();

  // Fetch user data and seller data from localStorage when the component mounts
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setEmail(localStorage.getItem('email'));

    // Get the seller status from localStorage
    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false'); // Defaults to 'false' if not set
    setIsSeller(sellerStatus);

    // Fetch seller-specific data if the user is a seller
    if (sellerStatus) {
      setSellerAddress(localStorage.getItem('sellerAddress'));
      setSellerStoreName(localStorage.getItem('sellerStoreName'));
      setSellerDescription(localStorage.getItem('sellerDescription'));

      // Fetch the seller's products
      const userId = localStorage.getItem('userId');
      if (userId) {
        fetchSellerProducts(userId);
      }
    }
  }, []);

  // Fetch the products of the seller
  const fetchSellerProducts = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/seller/${userId}/`);

      if (!response.ok) {
        throw new Error('Failed to fetch seller products');
      }
      const data = await response.json();

      // Transform data to match the Product interface
      const transformedProducts: Product[] = data.map((item: any) => ({
        code: item.code.toString(),
        name: item.name,
        material: item.material,
        stock: item.stock.toString(),
        description: item.description,
        stl_file_url: item.stl_file_url,
        seller: item.seller.toString(),
        price: item.price,
        images_url: item.images.map((img: any) => img.image_url),
      }));

      setProducts(transformedProducts);
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

  // Handle the button click to redirect to the "start selling" page
  const handleStartSelling = () => {
    router.push('/register_seller'); // Redirect to the start selling page
  };

  // Handle product click to redirect to product details
  const handleProductClick = (productCode: string) => {
    router.push(`/products/${productCode}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Perfil de Usuario</h1>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
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

            {/* Conditionally render the "Empezar a vender" button if the user is not a seller */}
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

        {/* Conditionally render seller data below the user info if the user is a seller */}
        {isSeller && (
          <section className="mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Información de vendedor</h2>
              <p className="mb-2">
                <strong>Dirección:</strong> {sellerAddress || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Nombre de la Tienda:</strong> {sellerStoreName || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Descripción:</strong> {sellerDescription || 'N/A'}
              </p>

              {/* Adding more space between seller info and seller products */}
              <h2 className="text-2xl font-bold mt-8 mb-4">Productos del Vendedor</h2>

              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map(product => (
                    <div key={product.code} onClick={() => handleProductClick(product.code)} className="cursor-pointer">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}



      </main>

      <Footer />
    </div>
  );
}

'use client';
import { API_URL } from "@/api/api";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use useParams to access dynamic route parameters in the App Router
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductDetail {
  code: number;
  name: string;
  material: string;
  stock: number;
  description: string;
  stl_file_url: string | null;
  seller: number;
  price: string;
  images: { image_url: string }[];
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { code } = useParams(); // Extract the code from the URL

  useEffect(() => {
    if (code) {
      // Fetch product details
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/products/${code}/`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error('Failed to fetch product details');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-lg font-bold">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="mb-4"><strong>Material:</strong> {product.material}</p>
          <p className="mb-4"><strong>Stock:</strong> {product.stock}</p>
          <p className="mb-4"><strong>Description:</strong> {product.description}</p>
          <p className="mb-4"><strong>Price:</strong> ${product.price}</p>
          {/* Display product images */}
          {product.images.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Images:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.images.map((img, index) => (
                  <img key={index} src={img.image_url} alt={`Product image ${index + 1}`} className="w-full h-auto rounded" />
                ))}
              </div>
            </div>
          )}
          {/* Buy Button */}
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 mt-8"
          >
            Buy Now
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

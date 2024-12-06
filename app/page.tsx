'use client';
import { API_URL } from "@/api/api";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import StlViewerComponent from '@/components/RotateStlView_old';
import { Product } from '@/types/Product';
import STLViewer from "@/components/RotatingStlView";
import { Suspense } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if tokens exist in localStorage to determine login status and seller status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false');

    if (accessToken) {
      setIsLoggedIn(true);
      setIsSeller(sellerStatus);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch products from the API
  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/recommended/`);
        if (response.ok) {
          const data = (await response.json());

          // Transform data to match Product interface if needed
          const transformedProducts: Product[] = data.map((item: any) => ({
            code: item.code,
            name: item.name,
            material: item.material,
            stock: item.stock.toString(),
            description: item.description,
            stl_file_url: item.stl_file_url,
            seller: item.seller,
            price: item.price,
            images_url: item.images.map((img: any) => img.image_url), // Assumes images is an array
          }));

          setProducts(transformedProducts);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Redirect the user when "Publicar Producto" is clicked
  const handlePublishProductClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (!isSeller) {
      router.push('/register_seller');
    } else {
      router.push('/publish_product');
    }
  };

    // Redirect the user when "Publicar Producto" is clicked

    const handleGoToSellerHomeClick = async () => {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (!isSeller) {
        router.push('/register_seller');
      } else {
        router.push(`/seller_landing`);
      }
    };
    

  return (

    <div className="min-h-screen flex flex-col  bg-gray-900 text-white">
  
      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-12 bg-gray-800">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8">
            <div className="w-1/2 space-y-4 text-center">
              <h2 className="text-4xl font-bold mb-4">
                La Impresión 3D, más fácil que nunca.
              </h2>
              <h3 className="mb-4">
                Nunca más le vas a tener que pedir el cosito al ferretero.
              </h3>
              <a href="./products_catalog">
                <button 
                name="catalog"
                className="bg-white text-black py-6 px-16 rounded-full font-bold text-lg mt-10">
                  Ver Catalogo
                </button>
              </a>
            </div>
            <div className="w-1/2 h-[400px]">
              <STLViewer url="/Capybara.stl" rotate />
            </div>
          </div>
        </section>

     
        <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Elegidos para vos</h3>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-gray-700 rounded-lg p-4 h-64 flex items-center justify-center"
              >
                <span className="text-gray-400 animate-pulse">Loading...</span>
              </div>
            ))}
          </div>
        ) : (
          products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.code} product={product} rotate={true} />
              ))}
            </div>
          )
        )}

        </section>


        <section className="relative mb-12">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8">
            <div className="w-1/2 h-[400px]">
              <STLViewer url="/Printer2.stl" 
              rotate
              initialZoomOut={1.2}
              maxZoomOutFactor={0.9}
              />
            </div>
            <div className="w-1/2 space-y-4 text-center">
              <h2 className="text-4xl font-bold mb-4">Necesitas algo específico?</h2>
              <h3 className="mb-4">Conectá con vendedores especializados.</h3>
              <a href="./lookfor_designer">
                <button name="contact" className="bg-white text-black py-6 px-16 rounded-full font-bold text-lg mt-10">
                  Contactar
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* "Tenés una impresora 3D?" Section with Same Style */}
        <section className="relative mb-12 bg-gray-800">
          <div className="flex items-center justify-between p-12 bg-gray-800 rounded-lg overflow-hidden pl-8">
            <div className="w-1/2 space-y-4 text-center mx-auto">
              <h2 className="text-4xl font-bold mb-4">Tenés una impresora 3D?</h2>
              <button
                name="startSelling"
                onClick={handleGoToSellerHomeClick}
                className="bg-white text-black py-6 px-16 rounded-full font-bold text-lg mt-10"
              >
                Empezá a vender
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}


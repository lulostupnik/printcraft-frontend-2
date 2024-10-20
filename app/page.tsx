'use client';
import { API_URL } from "@/api/api";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import StlViewerComponent from '@/components/RotateStlView';
import { Product } from '@/types/Product';

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
        const response = await fetch(`${API_URL}/products/`);
        if (response.ok) {
          const data = await response.json();

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
        // Check if userId is available in localStorage
        // let userId = localStorage.getItem('userId');
    
        // // If userId is not in localStorage, fetch it
        // if (!userId) {
        //   try {
        //     const accessToken = localStorage.getItem('accessToken'); // Ensure the user is authorized
        //     if (!accessToken) {
        //       router.push('/login');
        //       return;
        //     }
    
        //     const response = await fetch(`${API_URL}/user/data/`, {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${accessToken}`,
        //       },
        //     });
    
        //     if (response.ok) {
        //       const data = await response.json();
        //       userId = data.id; // Assuming the response includes `id` as the userId
        //       if (userId) {
        //         // Store userId in localStorage
        //         localStorage.setItem('userId', userId);
        //       } else {
        //         throw new Error('User ID is missing in the response');
        //       }
        //     } else {
        //       // Handle case when fetching userId fails
        //       alert('Error al obtener el ID de usuario. Por favor, intente nuevamente.');
        //       return;
        //     }
        //   } catch (error) {
        //     alert('Ocurrió un error al obtener los datos del usuario. Por favor, intente nuevamente.');
        //     return;
        //   }
        // }
    
        // // At this point, userId is guaranteed to be a string
        // if (userId) {
        //   router.push(`/seller_home/${userId}`);
        // }
      }
    };
    
  // Show a loading screen while data is being fetched
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
  //       <div className="text-lg font-bold">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

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
              <StlViewerComponent url="/Capybara.stl" />
            </div>
          </div>
        </section>

        {/* Conditionally render the "Elegidos para vos" section only if products are available */}
        {products.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Elegidos para vos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.code} product={product} />
              ))}
            </div>
          </section>
        )}

        <section className="relative mb-12">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8">
            <div className="w-1/2 h-[400px]">
              <StlViewerComponent url="/Printer.stl" />
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

      <Footer />
    </div>
  );
}


// 'use client'

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import ProductCard from '@/components/ProductCard';
// import StlViewerComponent from '@/components/RotateStlView';  // Ensure this path is correct
// import { Product } from '@/types/Product';  // Import the Product type

// export default function HomePage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]); // Use Product type for products

//   // Check if tokens exist in localStorage to determine login status
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       setIsLoggedIn(true); // User is logged in
//     } else {
//       setIsLoggedIn(false); // User is not logged in
//     }
//   }, []);

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/products/');
//         if (response.ok) {
//           const data = await response.json();
//           setProducts(data); // Store the fetched products in state
//         } else {
//           console.error('Failed to fetch products');
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts(); // Call the fetch function when the component mounts
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <section className="relative mb-12">
//           <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8">
//             <div className="w-1/2 space-y-4 text-center">
//               <h2 className="text-4xl font-bold mb-4">
//                 La Impresión 3D, más fácil que nunca.
//               </h2>
//               <h3 className="mb-4">
//                 Nunca más le vas a tener que pedir el cosito al ferretero.
//               </h3>

//               {/* Conditionally render the "Regístrate" button based on login status */}
//               {!isLoggedIn && (
//                 <a href="./register">
//                   <button className="bg-white text-black py-6 px-16 rounded-full font-bold text-lg mt-10">
//                     Regístrate
//                   </button>
//                 </a>
//               )}
//             </div>

//             <div className="w-1/2 h-[400px]">
//               <StlViewerComponent url="/Capybara.stl" />
//             </div>
//           </div>
//         </section>

//         <section className="flex justify-between mb-12">
//           {['Artistas', 'Usuarios', 'Diseños'].map((category, index) => (
//             <div key={index} className="text-center">
//               <h3 className="text-4xl font-bold mb-2">10000</h3>
//               <p>{category}</p>
//               <p className="text-sm text-gray-400">
//                 {index === 0 && 'Ya tienen su reconocimiento'}
//                 {index === 1 && 'Confían en nosotros'}
//                 {index === 2 && 'Ya publicados y esperándote'}
//               </p>
//             </div>
//           ))}
//         </section>

//         {/* Conditionally render the "Elegidos para vos" section only if products are available */}
//         {products.length > 0 && (
//           <section className="mb-12">
//             <h3 className="text-2xl font-bold mb-4">Elegidos para vos</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.slice(0, 4).map((product) => ( // Limit to the first 4 products
//                 <ProductCard
//                   key={product.code}
//                   product={{
//                     code: product.code,
//                     name: product.name,
//                     material: product.material,
//                     stock: product.stock,
//                     description: product.description,
//                     image_url: product.image_url,
//                     seller: product.seller,
//                     price: product.price
//                   }}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         <section className="flex justify-between">
//           <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
//             <h3 className="text-2xl font-bold mb-4">Quiero Comprar</h3>
//             <a href="/products_catalog">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ver Productos</button>
//             </a>
//             <a href="/lookfor_designer">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Diseñador</button>
//             </a>
//             <a href="/design_request">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full">Iniciar Subasta Inversa</button>
//             </a>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
//             <h3 className="text-2xl font-bold mb-4">Quiero Vender</h3>
//             <a href="/publish_product">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Publicar Producto</button>
//             </a>
//             <a href="/offer_services">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ofrecer Servicios</button>
//             </a>
//             <a href="/subasta_inversa">
//               <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Subasta Inversa</button>
//             </a>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }
'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import StlViewerComponent from '@/components/RotateStlView';  // Ensure this path is correct
import { Product } from '@/types/Product';  // Import the Product type

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Use Product type for products

  // Check if tokens exist in localStorage to determine login status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/products/');
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Store the fetched products in state
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the fetch function when the component mounts
  }, []);

  // Function to shuffle the array and return the first 4 random products
  const getRandomProducts = (products: Product[]) => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffledProducts.slice(0, 4); // Return the first 4 items
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-12">
          <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8">
            <div className="w-1/2 space-y-4 text-center">
              <h2 className="text-4xl font-bold mb-4">
                La Impresión 3D, más fácil que nunca.
              </h2>
              <h3 className="mb-4">
                Nunca más le vas a tener que pedir el cosito al ferretero.
              </h3>

              {/* Conditionally render the "Regístrate" button based on login status */}
              {!isLoggedIn && (
                <a href="./register">
                  <button className="bg-white text-black py-6 px-16 rounded-full font-bold text-lg mt-10">
                    Regístrate
                  </button>
                </a>
              )}
            </div>

            <div className="w-1/2 h-[400px]">
              <StlViewerComponent url="/Capybara.stl" />
            </div>
          </div>
        </section>

        <section className="flex justify-between mb-12">
          {['Artistas', 'Usuarios', 'Diseños'].map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold mb-2">10000</h3>
              <p>{category}</p>
              <p className="text-sm text-gray-400">
                {index === 0 && 'Ya tienen su reconocimiento'}
                {index === 1 && 'Confían en nosotros'}
                {index === 2 && 'Ya publicados y esperándote'}
              </p>
            </div>
          ))}
        </section>

        {/* Conditionally render the "Elegidos para vos" section only if products are available */}
        {products.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Elegidos para vos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getRandomProducts(products).map((product) => ( // Get 4 random products
                <ProductCard
                  key={product.code}
                  product={{
                    code: product.code,
                    name: product.name,
                    material: product.material,
                    stock: product.stock,
                    description: product.description,
                    image_url: product.image_url,
                    seller: product.seller,
                    price: product.price
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <section className="flex justify-between">
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Comprar</h3>
            <a href="/products_catalog">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ver Productos</button>
            </a>
            <a href="/lookfor_designer">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Diseñador</button>
            </a>
            <a href="/design_request">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full">Iniciar Subasta Inversa</button>
            </a>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg w-[48%]">
            <h3 className="text-2xl font-bold mb-4">Quiero Vender</h3>
            <a href="/publish_product">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Publicar Producto</button>
            </a>
            <a href="/offer_services">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Ofrecer Servicios</button>
            </a>
            <a href="/subasta_inversa">
              <button className="bg-gray-700 py-2 px-4 rounded block w-full mb-2">Buscar Subasta Inversa</button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

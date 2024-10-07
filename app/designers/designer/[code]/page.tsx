// 'use client';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { API_URL } from '@/api/api';

// interface Product {
//   code: number;
//   name: string;
//   material: string;
//   stock: number;
//   description: string;
//   stl_file_url: string | null;
//   seller: number;
//   price: string;
//   images: { image_url: string }[];
// }

// interface SellerProfile {
//   userId: number;
//   address: string;
//   store_name: string;
//   description: string;
//   profile_picture: string | null;
// }

// const SellerProfilePage = () => {
//   const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { code } = useParams(); // Fetch the code from the URL params
//   const router = useRouter(); // Use useRouter to perform navigation

//   useEffect(() => {
//     if (code) {
//       const fetchSellerProfile = async () => {
//         try {
//           const response = await fetch(`${API_URL}/seller/${code}/`);
//           if (response.ok) {
//             const seller: SellerProfile = await response.json();
//             if (seller) {
//               setSellerProfile(seller);
//             } else {
//               console.error('Seller not found');
//             }
//           } else {
//             console.error('Failed to fetch seller profile');
//           }
//         } catch (error) {
//           console.error('Error fetching seller profile:', error);
//         }
//       };

//       const fetchSellerProducts = async () => {
//         try {
//           const response = await fetch(`${API_URL}/products/seller/${code}/`);
//           if (response.ok) {
//             const data = await response.json();
//             setProducts(data);
//           } else {
//             console.error('Failed to fetch seller products');
//           }
//         } catch (error) {
//           console.error('Error fetching seller products:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchSellerProfile();
//       fetchSellerProducts();
//     }
//   }, [code]);

//   if (loading) {
//     return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Cargando perfil del vendedor...</div>;
//   }

//   if (!sellerProfile) {
//     return <div className="text-white">Vendedor no encontrado</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 pb-24">
//         {/* Seller Profile Section */}
//         <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg flex flex-col items-center">
//           <div className="w-24 h-24 rounded-full bg-blue-500 mb-4">
//             {/* Placeholder for profile picture */}
//             {sellerProfile.profile_picture ? (
//               <img
//                 src={sellerProfile.profile_picture}
//                 alt={sellerProfile.store_name}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-400">
//                 Sin Imagen
//               </div>
//             )}
//           </div>
//           <h1 className="text-4xl font-bold mb-2">{sellerProfile.store_name}</h1>
//           <p className="text-sm text-gray-400 mb-2">{sellerProfile.address}</p>
//           <p className="text-center text-gray-300 mb-4">{sellerProfile.description}</p>
//             <p className="text-lg font-bold">Rating: ⭐ 1.0/5.0</p>
//             <p className="text-gray-400 mb-6">Response Time: 4</p>
//           {/* Contact Seller Button */}
//           <button
//             onClick={() => router.push(`/designers/contact/${sellerProfile.userId}`)} // Redirect using userId from sellerProfile
//             className="bg-blue-600 text-white py-4 px-8 rounded-lg font-bold hover:bg-blue-500"
//           >
//             Contactar
//           </button>
//         </div>

//         {/* Seller's Products Section */}
//         <div className="w-full lg:w-2/3">
//           <h2 className="text-3xl font-bold mb-6">Productos de {sellerProfile.store_name}</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.code} className="bg-gray-800 p-4 rounded-lg">
//                   <div className="mb-4">
//                     <img
//                       src={product.images.length > 0 ? product.images[0].image_url : '/placeholder.png'}
//                       alt={product.name}
//                       className="w-full rounded mb-2"
//                     />
//                     <h3 className="text-2xl font-bold">{product.name}</h3>
//                     <p className="text-green-400 text-lg font-semibold">${product.price}</p>
//                     <p className="text-gray-400 text-sm">Stock: {product.stock}</p>
//                     <p className="text-gray-300 mt-2">{product.description}</p>
//                   </div>
//                   <div className="flex gap-4">
//                     <button className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500">
//                       Comprar ahora
//                     </button>
//                     <button className="bg-gray-600 text-white py-2 px-4 rounded font-bold hover:bg-gray-500">
//                       Agregar al carrito
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400">Este vendedor no tiene productos disponibles.</p>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SellerProfilePage;

'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from '@/api/api';
import ProductCard from '@/components/ProductCard'; // Import ProductCard component
import { Product } from '@/types/Product'; // Ensure this path is correct

interface SellerProfile {
  userId: number;
  address: string;
  store_name: string;
  description: string;
  profile_picture: string | null;
}

const SellerProfilePage = () => {
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { code } = useParams(); // Fetch the code from the URL params
  const router = useRouter(); // Use useRouter to perform navigation

  useEffect(() => {
    if (code) {
      const fetchSellerProfile = async () => {
        try {
          const response = await fetch(`${API_URL}/seller/${code}/`);
          if (response.ok) {
            const seller: SellerProfile = await response.json();
            setSellerProfile(seller);
          } else {
            console.error('Failed to fetch seller profile');
          }
        } catch (error) {
          console.error('Error fetching seller profile:', error);
        }
      };

      // Fetch products from the API
    const fetchSellerProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/seller/${code}/`);
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

      fetchSellerProfile();
      fetchSellerProducts();
    }
  }, [code]);

  if (loading) {
    return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Cargando perfil del vendedor...</div>;
  }

  if (!sellerProfile) {
    return <div className="text-white">Vendedor no encontrado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 pb-24">
        {/* Seller Profile Section */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 mb-4">
            {/* Placeholder for profile picture */}
            {sellerProfile.profile_picture ? (
              <img
                src={sellerProfile.profile_picture}
                alt={sellerProfile.store_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin Imagen
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold mb-2">{sellerProfile.store_name}</h1>
          <p className="text-sm text-gray-400 mb-2">{sellerProfile.address}</p>
          <p className="text-center text-gray-300 mb-4">{sellerProfile.description}</p>
          <p className="text-lg font-bold">Rating: ⭐ 1.0/5.0</p>
          <p className="text-gray-400 mb-6">Response Time: 4</p>

          {/* Contact Seller Button */}
          <button
            onClick={() => router.push(`/designers/contact/${sellerProfile.userId}`)} // Redirect using userId from sellerProfile
            className="bg-blue-600 text-white py-4 px-8 rounded-lg font-bold hover:bg-blue-500"
          >
            Contactar
          </button>
        </div>

        {/* Seller's Products Section */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Productos de {sellerProfile.store_name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.code} product={product} />
              ))
            ) : (
              <p className="text-gray-400">Este vendedor no tiene productos disponibles.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerProfilePage;

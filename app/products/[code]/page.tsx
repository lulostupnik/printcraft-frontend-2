
// 'use client';
// import { API_URL } from "@/api/api";
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import StlViewerComponent from "@/components/RotateStlView";

// interface ProductDetail {
//   code: number;
//   name: string;
//   material: string;
//   stock: number;
//   description: string;
//   stl_file_url: string | null;
//   seller: number;
//   seller_name: string;
//   price: string;
//   images: { image_url: string }[];
// }

// const ProductDetailPage = () => {
//   const [product, setProduct] = useState<ProductDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track selected image index
//   const { code } = useParams();

//   useEffect(() => {
//     if (code) {
//       const fetchProductDetails = async () => {
//         try {
//           const response = await fetch(`${API_URL}/products/${code}/`);
//           if (response.ok) {
//             const data = await response.json();
//             setProduct(data);
//           } else {
//             console.error('Failed to fetch product details');
//           }
//         } catch (error) {
//           console.error('Error fetching product details:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [code]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
//         <div className="text-lg font-bold">Loading...</div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
//         <div className="text-lg font-bold">Product not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
//         {/* Left Column: Images (only if images are available) */}
//         {product.images.length > 0 && (
//           <div className="flex flex-col w-full lg:w-1/3">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               {/* Main Image Display */}
//               <div className="mb-4">
//                 <img
//                   src={product.images[selectedImageIndex].image_url}
//                   alt={`Product image ${selectedImageIndex + 1}`}
//                   className="w-full rounded"
//                 />
//               </div>

//               {/* Thumbnails for Selecting Images */}
//               <div className="flex gap-2 overflow-x-auto">
//                 {product.images.map((img, index) => (
//                   <img
//                     key={index}
//                     src={img.image_url}
//                     alt={`Product thumbnail ${index + 1}`}
//                     className={`w-16 h-16 rounded border ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-600'} cursor-pointer`}
//                     onClick={() => setSelectedImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Right Column: Product Details and STL Viewer */}
//         <div className={`w-full ${product.images.length > 0 ? 'lg:w-2/3' : 'lg:w-full'}`}>
//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
//             <p className="text-xl text-green-400 mb-2">15% OFF</p>
//             <p className="text-3xl font-bold mb-4">${product.price}</p>
//             <p className="text-gray-300 mb-4">Color: Amarillo/Azul</p>
//             <div className="mb-4">
//               <h3 className="text-lg font-bold mb-2">Lo que tenés que saber de este producto:</h3>
//               <ul className="list-disc list-inside text-gray-300">
//                 <li>Material del núcleo: {product.material}</li>
//                 <li>Stock disponible: {product.stock}</li>
//                 <li>{product.description}</li>
//               </ul>
//             </div>

//             {/* STL Viewer (Centered if no images) */}
//             {product.stl_file_url && (
//               <div className={`mb-4 ${product.images.length === 0 ? 'flex justify-center' : ''}`}>
//                 <h3 className="text-lg font-bold mb-2">3D Model:</h3>
//                 <div className="w-full h-96 bg-gray-700 rounded">
//                   <StlViewerComponent url={product.stl_file_url} />
//                 </div>
//               </div>
//             )}

//             {/* Buy Buttons */}
//             <div className="flex gap-4 mt-6">
//               <button className="bg-blue-600 text-white py-3 px-6 rounded font-bold hover:bg-blue-500">
//                 Comprar ahora
//               </button>
//               <button className="bg-gray-600 text-white py-3 px-6 rounded font-bold hover:bg-gray-500">
//                 Agregar al carrito
//               </button>
//             </div>

//             {/* Vendor Info */}
//             <div className="mt-8 p-4 bg-gray-700 rounded">
//               <p>Vendido por: <span className="font-bold">{product.seller_name}</span></p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetailPage;
'use client';
import { API_URL } from "@/api/api";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StlViewerComponent from "@/components/RotateStlView";

interface ProductDetail {
  code: number;
  name: string;
  material: string;
  stock: number;
  description: string;
  stl_file_url: string | null;
  seller: number;
  seller_name: string;
  price: string;
  images: { image_url: string }[];
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track selected image index
  const { code } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (code) {
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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Images (only if images are available) */}
        {product.images.length > 0 && (
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="bg-gray-800 p-4 rounded-lg">
              {/* Main Image Display */}
              <div className="mb-4">
                <img
                  src={product.images[selectedImageIndex].image_url}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="w-full rounded"
                />
              </div>

              {/* Thumbnails for Selecting Images */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt={`Product thumbnail ${index + 1}`}
                    className={`w-16 h-16 rounded border ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-600'} cursor-pointer`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Product Details and STL Viewer */}
        <div className={`w-full ${product.images.length > 0 ? 'lg:w-2/3' : 'lg:w-full'}`}>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-green-400 mb-2">15% OFF</p>
            <p className="text-3xl font-bold mb-4">${product.price}</p>
            <p className="text-gray-300 mb-4">Color: Amarillo/Azul</p>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Lo que tenés que saber de este producto:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Material del núcleo: {product.material}</li>
                <li>Stock disponible: {product.stock}</li>
                <li>{product.description}</li>
              </ul>
            </div>

            {/* STL Viewer (Centered if no images) */}
            {product.stl_file_url && (
              <div className={`mb-4 ${product.images.length === 0 ? 'flex justify-center' : ''}`}>
                <h3 className="text-lg font-bold mb-2">3D Model:</h3>
                <div className="w-full h-96 bg-gray-700 rounded">
                  <StlViewerComponent url={product.stl_file_url} />
                </div>
              </div>
            )}

            {/* Buy Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-blue-600 text-white py-3 px-6 rounded font-bold hover:bg-blue-500"
                onClick={() => router.push(`/mp/${product.code}/1`)}
              >
                Comprar ahora
              </button>
              <button className="bg-gray-600 text-white py-3 px-6 rounded font-bold hover:bg-gray-500">
                Agregar al carrito
              </button>
            </div>

            {/* Vendor Info */}
            {/* <div className="mt-8 p-4 bg-gray-700 rounded">
              <p>Vendido por: <span className="font-bold">{product.seller_name}</span></p>
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;

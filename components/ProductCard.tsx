// import Link from 'next/link';
// import { Product } from '@/types/Product';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import { Autoplay } from 'swiper/modules';
// import StlViewerComponent from '@/components/RotateStlView_old'; // Ensure correct path
// import { useState } from 'react';
// import Image from 'next/image';
// import STLViewer from '@/components/RotatingStlView'; // Ensure correct path

// interface ProductCardProps {
//   product: Product;
//   rotate?: boolean; // Add the rotate prop as optional
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, rotate = false }) => { // Default rotate to false
//   const [viewStl, setViewStl] = useState(false); // State to toggle between image and STL view

//   // Ensure images is always an array, even if empty
//   const images = product.images_url && product.images_url.length > 0 ? product.images_url : [];
//   const hasImages = images.length > 0;
//   const hasStlFile = product.stl_file_url !== null && product.stl_file_url !== "";

//   // Toggle between Image and STL
//   const handleToggleView = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent triggering the link click event
//     setViewStl((prevViewStl) => !prevViewStl);
//   };

//   return (
//     <div
//       key={product.code}
//       className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full"
//     >
//       {/* Product Image or STL Viewer */}
//       <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
//         {hasStlFile && (!hasImages || viewStl) ? (
//           <div className="w-full h-64">
//             <STLViewer
//               url={product.stl_file_url ?? ''} // Use optional chaining with fallback
//               rotate={rotate} // Pass the rotate prop to STLViewer
//             />
//           </div>
//         ) : hasImages ? (
//           <Swiper
//             spaceBetween={10}
//             slidesPerView={1}
//             className="w-full h-full"
//             autoplay={{ delay: 10000, disableOnInteraction: false }}
//             modules={[Autoplay]}
//           >
//             {images.map((img, index) => (
//               <SwiperSlide key={index} className="flex items-center justify-center h-full">
//                 <Image
//                   src={img} // Provide the image URL directly from the images array
//                   alt={`${product.name} image ${index + 1}`}
//                   className="object-contain max-h-full max-w-full mx-auto"
//                   width={500} // Set width and height for better optimization
//                   height={500}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           // Placeholder if neither images nor STL file are available
//           <div className="flex items-center justify-center w-full h-full">
//             <img
//               src="/placeholder-image.png"
//               alt="No image available"
//               className="object-contain max-h-full max-w-full mx-auto"
//             />
//           </div>
//         )}
//       </div>

//       {/* Product Details */}
//       <div className="flex-grow p-4 flex flex-col justify-between">
//         <div className="flex justify-between items-center">
//           <Link href={`/products/${product.code}`} className="text-lg font-semibold mb-2 hover:underline">
//             {product.name}
//           </Link>
//           {hasImages && hasStlFile && (
//             <button
//               onClick={handleToggleView}
//               className="bg-gray-700 text-white py-1 px-2 ml-4 rounded font-bold hover:bg-gray-600"
//             >
//               {viewStl ? 'View Images' : 'View STL'}
//             </button>
//           )}
//         </div>
//         <div className="flex items-center mb-2">
//           <span className="text-2xl font-bold text-white">$ {product.price}</span>
//         </div>
//         <p className="text-gray-400 mb-2">Material: {product.material}</p>
//         <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
//         <p className="text-gray-400 mb-4">{product.description}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import Link from 'next/link';
import { Product } from '@/types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import StlViewerComponent from '@/components/RotateStlView_old';
import { useState } from 'react';
import Image from 'next/image';
import STLViewer from '@/components/RotatingStlView';

interface ProductCardProps {
  product?: Product;   // Make product optional if we rely on loading state
  rotate?: boolean;    // Add the rotate prop as optional
  loading?: boolean;   // Add a loading prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, rotate = false, loading = false }) => {
  const [viewStl, setViewStl] = useState(false);

  // If loading is true, show a skeleton instead
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full animate-pulse">
        {/* Skeleton for the image area */}
        <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
          <div className="bg-gray-600 w-3/4 h-3/4 rounded" />
        </div>

        {/* Skeleton for the text/content area */}
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-gray-600 h-4 w-1/2 mb-4 rounded" />
            <div className="bg-gray-600 h-8 w-20 rounded" />
          </div>
          <div className="bg-gray-600 h-6 w-1/3 mb-4 rounded" />
          <div className="bg-gray-600 h-4 w-1/2 mb-2 rounded" />
          <div className="bg-gray-600 h-4 w-1/2 mb-2 rounded" />
          <div className="bg-gray-600 h-4 w-3/4 rounded" />
        </div>
      </div>
    );
  }

  // Normal render if not loading
  if (!product) {
    return null; // No product and not loading - nothing to show
  }

  const images = product.images_url && product.images_url.length > 0 ? product.images_url : [];
  const hasImages = images.length > 0;
  const hasStlFile = product.stl_file_url !== null && product.stl_file_url !== "";

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewStl((prevViewStl) => !prevViewStl);
  };

  return (
    <div
      key={product.code}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full"
    >
      <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
        {hasStlFile && (!hasImages || viewStl) ? (
          <div className="w-full h-64">
            <STLViewer
              url={product.stl_file_url ?? ''}
              rotate={rotate}
            />
          </div>
        ) : hasImages ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="w-full h-full"
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center h-full">
                <Image
                  src={img}
                  alt={`${product.name} image ${index + 1}`}
                  className="object-contain max-h-full max-w-full mx-auto"
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src="/placeholder-image.png"
              alt="No image available"
              className="object-contain max-h-full max-w-full mx-auto"
            />
          </div>
        )}
      </div>

      <div className="flex-grow p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Link href={`/products/${product.code}`} className="text-lg font-semibold mb-2 hover:underline">
            {product.name}
          </Link>
          {hasImages && hasStlFile && (
            <button
              onClick={handleToggleView}
              className="bg-gray-700 text-white py-1 px-2 ml-4 rounded font-bold hover:bg-gray-600"
            >
              {viewStl ? 'View Images' : 'View STL'}
            </button>
          )}
        </div>
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-white">$ {product.price}</span>
        </div>
        <p className="text-gray-400 mb-2">Material: {product.material}</p>
        <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
        <p className="text-gray-400 mb-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

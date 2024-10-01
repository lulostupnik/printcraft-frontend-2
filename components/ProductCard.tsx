// import Link from 'next/link';
// import { Product } from '@/types/Product';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   return (
//     <div key={product.code} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full">
//       {/* Product Image Carousel */}
//       <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
//         <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
//           {product.images_url.map((img, index) => (
//             <SwiperSlide key={index} className="flex items-center justify-center h-full">
//               <img
//                 src={img}
//                 alt={`${product.name} image ${index + 1}`}
//                 className="object-contain max-h-full max-w-full mx-auto"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Product Details */}
//       <Link href={`/product/${product.code}`} className="flex-grow p-4 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
//           <p className="text-gray-400 mb-2">Material: {product.material}</p>
//           <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
//           <p className="text-gray-400 mb-4">{product.description}</p>
//         </div>
//         {/* Product Price at the Bottom */}
//         <div className="mt-auto text-right">
//           <span className="text-xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;


// import Link from 'next/link';
// import { Product } from '@/types/Product';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import { Autoplay } from 'swiper/modules';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   return (
//     <div key={product.code} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full">
//       {/* Product Image Carousel */}
//       <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={1}
//           className="w-full h-full"
//           autoplay={{ delay: 8000, disableOnInteraction: false }} // Configuración para deslizar automáticamente
//           modules={[Autoplay]} // Utilizando el módulo Autoplay
//         >
//           {product.images_url.map((img, index) => (
//             <SwiperSlide key={index} className="flex items-center justify-center h-full">
//               <img
//                 src={img}
//                 alt={`${product.name} image ${index + 1}`}
//                 className="object-contain max-h-full max-w-full mx-auto"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Product Details */}
//       <Link href={`/product/${product.code}`} className="flex-grow p-4 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
//           <p className="text-gray-400 mb-2">Material: {product.material}</p>
//           <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
//           <p className="text-gray-400 mb-4">{product.description}</p>
//         </div>
//         {/* Product Price at the Bottom */}
//         <div className="mt-auto text-right">
//           <span className="text-xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
//         </div>
//       </Link>
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.code} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full">
      {/* Product Image Carousel */}
      <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          className="w-full h-full"
          autoplay={{ delay: 10000, disableOnInteraction: false }} // Configuración para deslizar automáticamente
          modules={[Autoplay]} // Utilizando el módulo Autoplay
        >
          {(product.images_url && product.images_url.length > 0) ? (
            product.images_url.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center h-full">
                <img
                  src={img}
                  alt={`${product.name} image ${index + 1}`}
                  className="object-contain max-h-full max-w-full mx-auto"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="flex items-center justify-center h-full">
              <img
                src="/placeholder-image.png"
                alt=""
                className="object-contain max-h-full max-w-full mx-auto"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Product Details */}
      <Link href={`/product/${product.code}`} className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-400 mb-2">Material: {product.material}</p>
          <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
          <p className="text-gray-400 mb-4">{product.description}</p>
        </div>
        {/* Product Price at the Bottom */}
        <div className="mt-auto text-right">
          <span className="text-xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

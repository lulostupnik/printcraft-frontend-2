// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Image from 'next/image';
// import StlViewerComponent from '@/components/RotateStlView'; // Ensure this path is correct
// import StarIcon from '@/components/StarIcon';
// import { Product } from '@/types/Product';
// import { products } from '@/app/products_catalog/mockProducts'; // Adjust path as necessary

// interface ProductPageProps {
//   product: Product | null;
// }

// const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
//   const router = useRouter();
  
//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <button 
//           onClick={() => router.back()} 
//           className="bg-blue-600 text-white py-2 px-4 rounded-full mb-4"
//         >
//           Back to Catalog
//         </button>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="flex justify-center items-center">
//             {product.stlUrl ? (
//               <StlViewerComponent url={product.stlUrl} width={400} height={400} className="max-h-full max-w-full" />
//             ) : (
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={400}
//                 height={400}
//                 className="max-h-full max-w-full object-contain"
//               />
//             )}
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
//             <p className="text-gray-400 mb-4">{product.category}</p>
//             <p className="text-gray-300 mb-4">{product.description}</p>
//             <div className="flex items-center mb-4">
//               <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
//               <div className="flex items-center ml-4">
//                 <StarIcon className="w-6 h-6 text-yellow-500 mr-1" />
//                 <span>{product.rating.toFixed(1)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// // Fetch product data based on the product ID from the URL
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };
//   console.log('Fetching product with id:', id);
//   const product = products.find(p => p.id.toString() === id) || null;

//   console.log('Found product:', product);

//   return {
//     props: { product }
//   };
// };

// export default ProductPage;

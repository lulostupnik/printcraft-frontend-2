// "use client";

// import Image from 'next/image';
// import { useState } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import StlViewerComponent from '@/components/RotateStlView';  // Ensure this path is correct
// import StarIcon from '@/components/StarIcon';
// import { products } from '@/app/products/mockProducts';

// export default function CatalogPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("name");

//   // Extract unique categories
//   const categories = Array.from(new Set(products.map(p => p.category)));
//   categories.unshift("All");  // Add "All" to the top of the list

//   const filteredProducts = products
//     .filter(p => selectedCategory === "All" || p.category === selectedCategory)
//     .sort((a, b) => {
//       if (sortBy === "name") return a.name.localeCompare(b.name);
//       if (sortBy === "price") return a.price - b.price;
//       return b.rating - a.rating;
//     });

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <label htmlFor="category" className="mr-2">Category:</label>
//             <select
//               id="category"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="bg-gray-700 text-white rounded px-2 py-1">
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="sort" className="mr-2">Sort by:</label>
//             <select
//               id="sort"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="bg-gray-700 text-white rounded px-2 py-1"
//             >
//               <option value="name">Name</option>
//               <option value="price">Price</option>
//               <option value="rating">Rating</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map(product => (
//             <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//               {/* Container with fixed size for consistent image and STL rendering */}
//               <div className="h-48 w-full flex items-center justify-center bg-gray-700">
//                 {product.stlUrl ? (
//                   <StlViewerComponent url={product.stlUrl} width={200} height={200} className="max-h-full max-w-full" />
//                 ) : (
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     width={200}
//                     height={200}
//                     className="max-h-full max-w-full object-contain"
//                   />
//                 )}
//               </div>

//               <div className="p-4">
//                 <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
//                 <p className="text-gray-400 mb-2">{product.category}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
//                   <div className="flex items-center">
//                     <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
//                     <span>{product.rating.toFixed(1)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products_catalog/mockProducts'; // Adjust path as necessary

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  categories.unshift("All");  // Add "All" to the top of the list

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return b.rating - a.rating;
    });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <label htmlFor="category" className="mr-2">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

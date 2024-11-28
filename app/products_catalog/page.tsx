// // "use client";
// // import { API_URL } from "@/api/api";
// // import { useState, useEffect } from 'react';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import ProductCard from '@/components/ProductCard';
// // import { Product } from '@/types/Product'; // Import the new Product interface
// // import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// // export default function CatalogPage() {
// //   const [products, setProducts] = useState<Product[]>([]);  // State to hold fetched products
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [sortBy, setSortBy] = useState("name");
// //   const [loading, setLoading] = useState(true);  // Loading state
// //   const [error, setError] = useState<string | null>(null);  // Error state

// //   const router = useRouter(); // Initialize router for navigation

// //   // Fetch products from the API
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch(`${API_URL}/products/`);
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch products");
// //         }
// //         const data = (await response.json()).results;

// //         // Transform data to match the new Product interface
// //         const transformedProducts: Product[] = data.map((item: any) => ({
// //           code: item.code.toString(),
// //           name: item.name,
// //           material: item.material,
// //           stock: item.stock.toString(),
// //           description: item.description,
// //           stl_file_url: item.stl_file_url,
// //           seller: item.seller.toString(),
// //           price: item.price,
// //           images_url: item.images.map((img: any) => img.image_url),
// //         }));

// //         setProducts(transformedProducts);  // Set the fetched products in state
// //       } catch (err) {
// //         if (err instanceof Error) {
// //           setError(err.message);  // Use the message property from Error
// //         } else {
// //           setError("An unknown error occurred");
// //         }
// //       } finally {
// //         setLoading(false);  // Stop loading on error
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   // Extract unique categories
// //   const categories = Array.from(new Set(products.map(p => p.material)));  // Using `material` as `category`
// //   categories.unshift("All");  // Add "All" to the top of the list

// //   const filteredProducts = products
// //     .filter(p => selectedCategory === "All" || p.material === selectedCategory)  // Filter by category (material)
// //     .sort((a, b) => {
// //       if (sortBy === "name") return a.name.localeCompare(b.name);
// //       if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);  // Ensure price is compared as numbers
// //       return 0;  // Add additional sort options if needed
// //     });

// //   // Handle loading and error states
// //   // if (loading) {
// //   //   return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Loading...</div>;
// //   // }

// //   if (error) {
// //     return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Error: {error}</div>;
// //   }

// //   // Handle product click to redirect to product details
// //   const handleProductClick = (productCode: string) => {
// //     // Ensure that router is used in a click handler, after the component has mounted
// //     router.push(`/products/${productCode}`);
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
// //       <Header showCart={true}/>

// //       <main className="flex-1 container mx-auto px-4 py-8">
// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <label htmlFor="category" className="mr-2">Category:</label>
// //             <select
// //               id="category"
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //               className="bg-gray-700 text-white rounded px-2 py-1">
// //               {categories.map(category => (
// //                 <option key={category} value={category}>{category}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label htmlFor="sort" className="mr-2">Sort by:</label>
// //             <select
// //               id="sort"
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //               className="bg-gray-700 text-white rounded px-2 py-1"
// //             >
// //               <option value="name">Name</option>
// //               <option value="price">Price</option>
// //             </select>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {filteredProducts.map(product => (
// //             <div key={product.code} onClick={() => handleProductClick(product.code)} className="cursor-pointer">
// //               <ProductCard product={product} />
// //             </div>
// //           ))}
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }
// "use client";
// import { API_URL } from "@/api/api";
// import { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import ProductCard from '@/components/ProductCard';
// import { Product } from '@/types/Product';
// import { useRouter } from 'next/navigation';

// export default function CatalogPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("name");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1); // New state for current page
//   const [totalPages, setTotalPages] = useState(1);   // New state for total pages

//   const router = useRouter();

//   // Fetch products from the API whenever currentPage, selectedCategory, or sortBy changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         // Build the API URL with query parameters for pagination, category, and sorting
//         let url = `${API_URL}/products/?page=${currentPage}`;
// /*
//         if (selectedCategory !== "All") {
//           url += `&material=${encodeURIComponent(selectedCategory)}`;
//         }

//         if (sortBy) {
//           url += `&ordering=${encodeURIComponent(sortBy)}`;
//         }*/

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const data = await response.json();

//         // Calculate total pages based on total products and page size
//         const totalProducts = data.count;
//         const pageSize = data.results.length || 1; // Avoid division by zero
//         setTotalPages(Math.ceil(totalProducts / pageSize));

//         // Transform data to match the Product interface
//         const transformedProducts: Product[] = data.results.map((item: any) => ({
//           code: item.code.toString(),
//           name: item.name,
//           material: item.material,
//           stock: item.stock.toString(),
//           description: item.description,
//           stl_file_url: item.stl_file_url,
//           seller: item.seller.toString(),
//           price: item.price,
//           images_url: item.images.map((img: any) => img.image_url),
//         }));

//         setProducts(transformedProducts);
//         setError(null); // Reset error state if successful
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//         setProducts([]); // Clear products on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [currentPage, selectedCategory, sortBy]);

//   // Reset currentPage to 1 whenever filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategory, sortBy]);

//   // Handle navigation to product details page
//   const handleProductClick = (productCode: string) => {
//     router.push(`/products/${productCode}`);
//   };

//   // Extract unique categories from products
//   const categories = ["All", ...Array.from(new Set(products.map(p => p.material)))];

//   // Handle pagination controls
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header showCart={true} />

//       <main className="flex-1 container mx-auto px-4 py-8">
//         {/* Filters */}
//         <div className="flex justify-between items-center mb-8">
//           {/* <div>
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
//           </div> */}
//           {/* <div>
//             <label htmlFor="sort" className="mr-2">Sort by:</label>
//             <select
//               id="sort"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="bg-gray-700 text-white rounded px-2 py-1"
//             >
//               <option value="name">Name</option>
//               <option value="price">Price</option>
//             </select>
//           </div> */}
//         </div>

//         {/* Loading and Error States */}
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error}</div>}

//         {/* Products Grid */}
//         {!loading && !error && (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map(product => (
//                 <div key={product.code} onClick={() => handleProductClick(product.code)} className="cursor-pointer">
//                   <ProductCard product={product} />
//                 </div>
//               ))}
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="bg-gray-700 text-white rounded px-4 py-2 mr-2 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="bg-gray-700 text-white rounded px-4 py-2 ml-2 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }

"use client";
import { API_URL } from "@/api/api";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import { useRouter } from 'next/navigation';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1);   // Total number of pages
  const [pageSize, setPageSize] = useState(10);      // Default page size (adjust as needed)

  const router = useRouter();

  // Fetch products from the API whenever currentPage changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Build the API URL with query parameters for pagination
        const url = `${API_URL}/products/?page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Set pageSize based on the first page's results, only once
        if (currentPage === 1 && data.results.length > 0) {
          setPageSize(data.results.length);
        }

        // Calculate total pages based on total products and consistent page size
        const totalProducts = data.count;
        setTotalPages(Math.ceil(totalProducts / pageSize));

        // Transform data to match the Product interface
        const transformedProducts: Product[] = data.results.map((item: any) => ({
          code: item.code.toString(),
          name: item.name,
          material: item.material,
          stock: item.stock.toString(),
          description: item.description,
          stl_file_url: item.stl_file_url,
          seller: item.seller.toString(),
          price: item.price,
          images_url: item.images.map((img: any) => img.image_url),
        }));

        setProducts(transformedProducts);
        setError(null); // Reset error state if successful
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  // Synchronize input page with current page
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  // Handle navigation to product details page
  const handleProductClick = (productCode: string) => {
    router.push(`/products/${productCode}`);
  };

  // Handle pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Handle manual page input
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header showCart={true} />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Main content area */}
        <div className="flex-grow">
          {/* Loading and Error States */}
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.code} onClick={() => handleProductClick(product.code)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* No Products Message */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center">No products available.</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8">
          <div className="flex justify-center items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white rounded px-4 py-2 mr-2 disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center">
              <span className="mr-2">Page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handlePageInputChange}
                className="w-16 bg-gray-800 text-white text-center rounded px-2 py-1"
              />
              <span className="mx-2">of {totalPages}</span>
              <button
                onClick={handleGoToPage}
                className="bg-gray-700 text-white rounded px-2 py-1"
              >
                Go
              </button>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white rounded px-4 py-2 ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

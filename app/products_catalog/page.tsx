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
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  // Fetch products from the API whenever currentPage changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Construir URL basada en si estamos buscando o no
        let url = isSearching 
          ? `${API_URL}/products/search/?search=${encodeURIComponent(searchQuery)}&ordering=price&page=${currentPage}`
          : `${API_URL}/products/?page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

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
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, isSearching, searchQuery]);

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

  // Manejador para el cambio en el input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejador para el botón de búsqueda
  const handleSearch = () => {
    setIsSearching(true);
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  // Manejador para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header showCart={true} />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Barra de búsqueda modificada */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Buscar
            </button>
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

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

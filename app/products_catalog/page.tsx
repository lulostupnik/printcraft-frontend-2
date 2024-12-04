"use client";

import { API_URL } from "@/api/api";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initially read search param from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); // fixed page size

  // Update search states whenever the URL search parameter changes
  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearchTerm(term);
    setIsSearching(term.trim() !== "");
    setSearchQuery(term);
  }, [searchParams]);

  // Fetch products whenever currentPage or searchQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = isSearching && searchQuery.trim() !== ""
          ? `${API_URL}/products/search/?search=${encodeURIComponent(searchQuery)}&ordering=price&page=${currentPage}`
          : `${API_URL}/products/?page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const totalProducts = data.count || 0;
        setTotalPages(Math.ceil(totalProducts / pageSize));

        const transformedProducts: Product[] = (data.results || []).map((item: any) => ({
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
  }, [currentPage, isSearching, searchQuery, pageSize]);

  // Synchronize input page with current page
  const [inputPage, setInputPage] = useState(currentPage.toString());
  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleProductClick = (productCode: string) => {
    router.push(`/products/${productCode}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

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
      <Header
        showCart={true}
        showSearchBar={true}
        initialSearchTerm={searchTerm}
      />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-400">Error: {error}</div>}

        {!loading && !error && products.length > 0 && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.code}
                onClick={() => handleProductClick(product.code)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="mb-8 text-center">No products available.</div>
        )}

        {/* Pagination Controls always shown to prevent layout jump */}
        <div className="mt-auto flex justify-center items-center py-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white rounded px-4 py-2 mr-2 disabled:opacity-50"
          >
            Previous
          </button>

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
      </main>

      <Footer />
    </div>
  );
}

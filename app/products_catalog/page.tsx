"use client";
import ChatBox from "@/components/ChatBox";
import { API_URL } from "@/api/api";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

function CatalogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(8); // fixed page size

  // Update searchQuery whenever the URL search parameter changes
  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearchQuery(term);
    setCurrentPage(1); // Reset to page 1 for new search queries
  }, [searchParams]);

  // Fetch products whenever currentPage or searchQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url =
          searchQuery.trim() !== ""
            ? `${API_URL}/products/search/?search=${encodeURIComponent(
                searchQuery
              )}&ordering=price&page=${currentPage}`
            : `${API_URL}/products/?page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const totalProducts = data.count || 0;
        setTotalPages(Math.ceil(totalProducts / pageSize));

        const transformedProducts: Product[] = (data.results || []).map(
          (item: any) => ({
            code: item.code.toString(),
            name: item.name,
            material: item.material,
            stock: item.stock.toString(),
            description: item.description,
            stl_file_url: item.stl_file_url,
            seller: item.seller.toString(),
            price: item.price,
            images_url: item.images.map((img: any) => img.image_url),
            size: item.size,
          })
        );

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
  }, [currentPage, searchQuery, pageSize]);

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

      <div className="mt-auto flex justify-center items-center gap-4 py-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          Anterior
        </button>

        <div className="text-white">
          Página {currentPage} de {totalPages}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <CatalogPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}

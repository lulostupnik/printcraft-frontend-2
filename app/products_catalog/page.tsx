"use client";
import { API_URL } from "@/api/api";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product'; // Import the new Product interface
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);  // State to hold fetched products
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  const router = useRouter(); // Initialize router for navigation

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Transform data to match the new Product interface
        const transformedProducts: Product[] = data.map((item: any) => ({
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

        setProducts(transformedProducts);  // Set the fetched products in state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);  // Use the message property from Error
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);  // Stop loading on error
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.material)));  // Using `material` as `category`
  categories.unshift("All");  // Add "All" to the top of the list

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.material === selectedCategory)  // Filter by category (material)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);  // Ensure price is compared as numbers
      return 0;  // Add additional sort options if needed
    });

  // Handle loading and error states
  // if (loading) {
  //   return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Loading...</div>;
  // }

  if (error) {
    return <div className="flex flex-col min-h-screen bg-gray-900 text-white">Error: {error}</div>;
  }

  // Handle product click to redirect to product details
  const handleProductClick = (productCode: string) => {
    // Ensure that router is used in a click handler, after the component has mounted
    router.push(`/products/${productCode}`);
  };

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
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.code} onClick={() => handleProductClick(product.code)} className="cursor-pointer">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

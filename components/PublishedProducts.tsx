import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
type Product = {
  name: string;
  stock: number;
  material: string;
  price: number;
  code: string;
};
const PublishedProducts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products
  // Fetch the products of the seller
  const fetchSellerProducts = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/seller/${userId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch seller products');
      }
      const data = (await response.json()).results;
      // Transform data to match the Product interface
      const transformedProducts: Product[] = data.map((item: any) => ({
        code: item.code.toString(),
        name: item.name,
        material: item.material,
        stock: item.stock,
        price: item.price,
        // Asegúrate de que estas propiedades existan en tu API
      }));
      setProducts(transformedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch user data and seller data from localStorage when the component mounts
  useEffect(() => {
    // Fetch the seller's products
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchSellerProducts(userId);
    }
  }, []);
  return (
    <div className="mt-8">
      {loading ? ( // Mostrar estado de carga
        <p className="text-gray-500 text-center">Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No hay productos publicados.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white">Productos Publicados</h3>
          </div>
          <div className={`max-h-[24rem] overflow-y-auto`}>
            <table className="min-w-full bg-gray-700 text-white rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-center">Nombre</th>
                  <th className="px-4 py-2 text-center">Stock</th>
                  <th className="px-4 py-2 text-center">Material</th>
                  <th className="px-4 py-2 text-center">Precio</th>
                  <th className="px-4 py-2 text-center">Producto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="px-4 py-2 text-center">{product.name}</td>
                    <td className="px-4 py-2 text-center">{product.stock}</td>
                    <td className="px-4 py-2 text-center">{product.material}</td>
                    <td className="px-4 py-2 text-center">{product.price} €</td>
                    <td className="px-4 py-2 text-center">
                      <a href={`/products/${product.code}`} className="text-blue-500 underline hover:text-blue-700">
                        Ver producto aquí
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default PublishedProducts;
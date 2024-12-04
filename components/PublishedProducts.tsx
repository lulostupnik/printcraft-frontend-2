import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import ProductCard from './ProductCard';
import { Product } from '@/types/Product';

const PublishedProducts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products
  const [tooltipProduct, setTooltipProduct] = useState<Product | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  // Fetch the products of the seller
  const fetchSellerProducts = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/seller/${userId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch seller products');
      }
      const data = await response.json();
      const transformedProducts: Product[] = data.map((item: any) => ({
        code: item.code.toString(),
        name: item.name,
        material: item.material,
        stock: item.stock.toString(),
        price: item.price.toString(),
        seller: item.seller,
        description: item.description || '',
        stl_file_url: item.stl_file_url || null,
        images_url: item.images?.map((img: any) => img.image_url) || []
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

  const handleMouseEnter = (event: React.MouseEvent, product: Product) => {
    // Limpiar cualquier timeout existente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 410,
      y: rect.top
    });
    setTooltipProduct(product);
  };

  const handleTooltipMouseEnter = () => {
    // Limpiar el timeout cuando el mouse entra al tooltip
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    // Establecer nuevo timeout de 1 segundo
    timeoutRef.current = setTimeout(() => {
      setTooltipProduct(null);
    }, 300);
  };

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-8 relative">
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
                      <a 
                        href={`/products/${product.code}`} 
                        className="text-blue-500 underline hover:text-blue-700"
                        onMouseEnter={(e) => handleMouseEnter(e, product)}
                        onMouseLeave={handleMouseLeave}
                      >
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

      {/* Tooltip con ProductCard */}
      {tooltipProduct && (
        <div 
          className="fixed z-50"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '400px'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProductCard key={tooltipProduct.code} product={tooltipProduct} />
        </div>
      )}
    </div>
  );
};

export default PublishedProducts;
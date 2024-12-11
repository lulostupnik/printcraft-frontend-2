import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import ProductCard from './ProductCard';
import { Product } from '@/types/Product';
import { H2Icon } from '@heroicons/react/24/solid';

const PublishedProducts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products
  const [tooltipProduct, setTooltipProduct] = useState<Product | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<string>('');

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

  // Primero agregamos la función de borrado
  const deleteProduct = async (productCode: string) => {
    try {
      const response = await fetch(`${API_URL}/products/delete/${productCode}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Actualizamos la lista de productos eliminando el producto borrado
      setProducts(products.filter(product => product.code !== productCode));
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías agregar una notificación de error si lo deseas
    }
  };

  // Añadir la función de actualización
  const updateStock = async (productCode: string, newStock: string) => {
    // Validar que sea un número entero positivo
    const stockNumber = parseInt(newStock);
    if (isNaN(stockNumber) || stockNumber < 0) {
      alert('Por favor, ingrese un número entero positivo');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${productCode}/update_stock/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ stock: stockNumber })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el stock');
      }

      setProducts(products.map(product => 
        product.code === productCode 
          ? { ...product, stock: stockNumber.toString() }
          : product
      ));
      
      setShowSnackbar(false);
      setSelectedProduct(null);
      setNewStock('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-8 relative">
      {loading ? (
        <p className="text-gray-500 text-center">Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No hay productos publicados.</p>
      ) : (
        <div className="w-full">
          <div className="flex flex-col w-full bg-gray-800 rounded-lg">
            <h2 className="text-4xl font-bold text-white p-4 text-center">
              Productos Publicados
            </h2>
            
            <div className="p-4">
              <div className="max-h-[24rem] overflow-y-auto w-full">
                <table className="w-full bg-gray-700 text-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-3 text-center">Nombre</th>
                      <th className="px-6 py-3 text-center">Stock</th>
                      <th className="px-6 py-3 text-center">Material</th>
                      <th className="px-6 py-3 text-center">Precio</th>
                      <th className="px-6 py-3 text-center">Producto</th>
                      <th className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="px-6 py-4 text-center">{product.name}</td>
                        <td className="px-6 py-4 text-center">{product.stock}</td>
                        <td className="px-6 py-4 text-center">{product.material}</td>
                        <td className="px-6 py-4 text-center">{product.price} €</td>
                        <td className="px-6 py-4 text-center">
                          <a 
                            href={`/products/${product.code}`} 
                            className="text-blue-500 underline hover:text-blue-700"
                            onMouseEnter={(e) => handleMouseEnter(e, product)}
                            onMouseLeave={handleMouseLeave}
                          >
                            Ver producto aquí
                          </a>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setNewStock(product.stock);
                                setShowSnackbar(true);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Actualizar Stock
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                  deleteProduct(product.code);
                                }
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

      {showSnackbar && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-bold text-lg">
                Actualizar Stock de {selectedProduct.name}
              </h4>
              <input
                type="number"
                min="0"
                step="1"
                value={newStock}
                onChange={(e) => {
                  // Solo permitir números
                  const value = e.target.value;
                  if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
                    setNewStock(value);
                  }
                }}
                onKeyPress={(e) => {
                  // Prevenir cualquier tecla que no sea número
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="px-3 py-2 rounded bg-gray-700 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Nuevo stock"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    updateStock(selectedProduct.code, newStock);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setShowSnackbar(false);
                    setSelectedProduct(null);
                    setNewStock('');
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishedProducts;
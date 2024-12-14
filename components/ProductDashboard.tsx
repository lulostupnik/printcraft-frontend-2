import React, { useEffect, useState, useRef } from 'react';
import { API_URL } from '@/api/api';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';

// Tipo para los productos en una orden
type OrderProduct = {
  productcode: number;
  product_name: string;
  quantity: number;
  price: number;  //es el precio unitario
};

// Tipo para las órdenes
type Order = {
  orderid: number;
  status: string;
  orderdate: string;
  products: OrderProduct[];
  user_email: string;
};

const ProductDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getAccessToken = () => {
    return localStorage.getItem('accessToken') || '';
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const fetchOrders = async () => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/seller-orders/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Ordenar las órdenes por fecha de manera descendente
        const sortedData = data.sort((a: Order, b: Order) => 
          new Date(b.orderdate).getTime() - new Date(a.orderdate).getTime()
        );
        setOrders(sortedData);
      } else {
        console.error('Error al obtener las órdenes');
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleProductMouseEnter = async (event: React.MouseEvent, product: OrderProduct) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    
    setPreviewPosition({
      x: rect.left - 410,
      y: rect.top
    });

    try {
      const response = await fetch(`${API_URL}/products/${product.productcode}/`);
      if (response.ok) {
        const data = await response.json();
        const adaptedProduct: Product = {
          code: String(data.productcode || product.productcode),
          name: data.product_name || product.product_name,
          price: String(data.price_per_unit || product.price),
          material: data.material || 'No especificado',
          stock: String(data.stock || 'No especificado'),
          description: data.description || '',
          images_url: data.images?.map((img: any) => img.image_url) || [],
          stl_file_url: data.stl_file_url || null,
          seller: data.seller || 'No especificado',
          size: 'Pequeño'
        };
        setPreviewProduct(adaptedProduct);
      } else {
        const fallbackProduct: Product = {
          code: String(product.productcode),
          name: product.product_name,
          price: String(product.price),
          material: 'No especificado',
          stock: String(product.quantity),
          description: '',
          images_url: [],
          stl_file_url: null,
          seller: 'No especificado',
          size: 'Pequeño'
        };
        setPreviewProduct(fallbackProduct);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      const fallbackProduct: Product = {
        code: String(product.productcode),
        name: product.product_name,
        price: String(product.price),
        material: 'No especificado',
        stock: String(product.quantity),
        description: '',
        images_url: [],
        stl_file_url: null,
        seller: 'No especificado',
        size: 'Pequeño'
      };
      setPreviewProduct(fallbackProduct);
    }
  };

  const handlePreviewMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setPreviewProduct(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-300">Cargando órdenes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-center">
            Órdenes de Venta
          </h2>
        </div>
        
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No hay órdenes de venta.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-white rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Orden</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 pl-12 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {orders.map((order) => (
                  <React.Fragment key={order.orderid}>
                    <tr className="transition-colors">
                      <td className="px-6 py-4">#{order.orderid}</td>
                      <td className="px-6 py-4">{order.user_email}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4">{formatDate(order.orderdate)}</td>
                      <td className="px-6 py-4">
                        ${order.products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            const newExpandedOrders = new Set(expandedOrders);
                            if (newExpandedOrders.has(order.orderid)) {
                              newExpandedOrders.delete(order.orderid);
                            } else {
                              newExpandedOrders.add(order.orderid);
                            }
                            setExpandedOrders(newExpandedOrders);
                          }}
                          className="ml-4 text-white flex items-center"
                        >
                          {expandedOrders.has(order.orderid) ? (
                            <>
                              <span className="mr-2">Colapsar</span>
                              <MinusCircleIcon className="w-5 h-5" />
                            </>
                          ) : (
                            <>
                              <span className="mr-2">Expandir</span>
                              <PlusCircleIcon className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {expandedOrders.has(order.orderid) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-[#1E2837]">
                          <table className="min-w-full divide-y divide-gray-600">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                                <th className="px-6 py-3 text-center text-sm font-semibold">Cantidad</th>
                                <th className="px-6 py-3 text-center text-sm font-semibold">Precio Unitario</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold">Precio Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                              {order.products.map((product, productIndex) => (
                                <tr 
                                  key={productIndex} 
                                  className="hover:bg-gray-700 transition-colors"
                                >
                                  <td className="px-6 py-4 text-sm">
                                    <span
                                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                                      onMouseEnter={(e) => handleProductMouseEnter(e, product)}
                                      onMouseLeave={handleMouseLeave}
                                    >
                                      {product.product_name}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center">{product.quantity}</td>
                                  <td className="px-6 py-4 text-sm text-center">${product.price}</td>
                                  <td className="px-6 py-4 text-sm text-right">
                                    ${product.price * product.quantity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {previewProduct && (
        <div 
          className="fixed z-[9999]"
          style={{
            left: `${previewPosition.x}px`,
            top: `${previewPosition.y}px`,
            width: '400px',
            pointerEvents: 'auto'
          }}
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <ProductCard 
              product={previewProduct}
              rotate={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboard;

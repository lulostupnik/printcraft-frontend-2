'use client';
import React, { useEffect, useState, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserPrintReqDashboard from "@/components/userPrintReqDashboard";
import { useRouter } from "next/navigation"; // Import useRouter
import { API_URL } from "@/api/api";
import AuctionRequestComponent from '@/components/UserExploreAnsTable';
import { Suspense } from "react";
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';  // Importamos el tipo Product

// Tipo para los productos que recibimos de la API
type ProductFromAPI = {
  productcode: number;
  product_name: string;
  quantity: number;
  price_per_unit: number;
  material?: string;
  description?: string;
  images_url?: string[];
  stl_url?: string | null;
  seller?: string;
};

// Tipo para las órdenes que recibimos de la API
type Order = {
  orderid: number;
  status: string;
  orderdate: string;
  total_price: number;
  products: ProductFromAPI[];  // Especificamos que son ProductFromAPI
};

// Función adaptadora - la movemos fuera del componente
const adaptProductFromAPI = (apiProduct: ProductFromAPI): Product => {
  return {
    code: String(apiProduct.productcode),
    name: apiProduct.product_name,
    price: String(apiProduct.price_per_unit),
    material: apiProduct.material || 'No especificado',
    stock: "No especificado",
    description: apiProduct.description || '',
    images_url: apiProduct.images_url || [],
    stl_file_url: apiProduct.stl_url || null,
    seller: apiProduct.seller || 'No especificado'
  };
};

// Tipo para los detalles del producto
type ProductDetail = {
  name: string;
  material: string;
  description: string;
  images: { image_url: string }[];
  price: number;
};

const MisComprasPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "designRequests" | "printRequests"
  >("products");

  const router = useRouter(); // Initialize useRouter

  // Variable global dentro del componente
  const [products, setProducts] = useState<Order[]>([]); // Estado para almacenar órdenes
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSectionChange= (section: "products" | "designRequests" | "printRequests") => {
    setLoading(true); // Set loading to true

    setTimeout(() => {
      setSelectedSection(section); // Set the new section after a small delay
      setLoading(false); // Stop loading after the timeout
    }, 100); // 500ms delay to simulate loading
  };


  // Función para navegar al perfil del diseñador
  const handleNavigateToDesigner = (sellerID: number) => {
    router.push(`/designers/designer/${sellerID}`);
  };

  const getAccessToken = () => {
    return localStorage.getItem('accessToken') || '';
  };

  // Fetch de las solicitudes
  const fetchRequests = async () => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/orders/mine/`, {
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
        setProducts(sortedData);
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Agregamos función para obtener detalles del producto
  const fetchProductDetails = async (productCode: number) => {
    try {
      const response = await fetch(`${API_URL}/products/${productCode}/`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
    return null;
  };

  const handleProductMouseEnter = async (event: React.MouseEvent, product: ProductFromAPI) => {
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
        // Adaptamos el producto al formato que espera ProductCard
        const adaptedProduct: Product = {
          code: String(data.productcode || product.productcode),
          name: data.product_name || product.product_name,
          price: String(data.price_per_unit || product.price_per_unit),
          material: data.material || 'No especificado',
          stock: String(data.stock || 'No especificado'),
          description: data.description || '',
          images_url: data.images?.map((img: any) => img.image_url) || [],
          stl_file_url: data.stl_file_url || null,
          seller: data.seller || 'No especificado'
        };
        setPreviewProduct(adaptedProduct);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Si falla la petición, usamos los datos que ya tenemos
      const adaptedProduct: Product = {
        code: String(product.productcode),
        name: product.product_name,
        price: String(product.price_per_unit),
        material: product.material || 'No especificado',
        stock: String(product.quantity || 'No especificado'),
        description: product.description || '',
        images_url: product.images_url || [],
        stl_file_url: product.stl_url || null,
        seller: product.seller || 'No especificado'
      };
      setPreviewProduct(adaptedProduct);
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

  // Función auxiliar para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Renderizado de productos
  const renderProducts = () => {
    return (
      <div className="container mx-auto">
        <section className="mb-12 bg-gray-800 p-8 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-center">
              Mis Compras
            </h2>
          </div>
          
          {loading ? (
            <p className="text-gray-500 text-center">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center">No hay productos comprados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Orden</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                    <th className="px-6 pl-12 py-3 text-left text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {products.map((order) => (
                    <React.Fragment key={order.orderid}>
                      <tr className="transition-colors">
                        <td className="px-6 py-4">#{order.orderid}</td>
                        <td className="px-6 py-4">{order.status}</td>
                        <td className="px-6 py-4">{formatDate(order.orderdate)}</td>
                        <td className="px-6 py-4">${order.total_price}</td>
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
                          <td colSpan={5} className="px-6 py-4 bg-[#1E2837]">
                            <table className="min-w-full divide-y divide-gray-600">
                              <thead>
                                <tr>
                                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                                  <th className="px-6 py-3 text-center text-sm font-semibold">Producto</th>
                                  <th className="px-6 py-3 text-center text-sm font-semibold">Cantidad</th>
                                  <th className="px-6 py-3 text-right text-sm font-semibold">Precio Total</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-600">
                                {order.products.map((product, productIndex) => (
                                  <tr 
                                    key={productIndex} 
                                    className="hover:bg-gray-700 transition-colors"
                                  >
                                    <td className="px-6 py-4 text-sm">{product.product_name}</td>
                                    <td className="px-6 py-4 text-sm text-center">
                                      <a
                                        href={`/products/${product.productcode}`}
                                        className="text-blue-400 hover:text-blue-300"
                                        onMouseEnter={(e) => handleProductMouseEnter(e, product)}
                                        onMouseLeave={handleMouseLeave}
                                      >
                                        Ver producto aquí
                                      </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">{product.quantity}</td>
                                    <td className="px-6 py-4 text-sm text-right">${product.price_per_unit * product.quantity}</td>
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
      </div>
    );
  };

  //<UserPrintReqDashboard requestType="design-requests" />
  //<AuctionRequestComponent type="design-requests"></AuctionRequestComponent>

  const renderDesignRequests = () => {
    return (
    <div>
      <UserPrintReqDashboard requestType="design-requests" />
    </div>
    );
  };

  //<UserPrintReqDashboard requestType="print-requests" />
  //<AuctionRequestComponent type="print-requests"></AuctionRequestComponent>

  const renderPrintRequests = () => {
    return (
    <div>
    <UserPrintReqDashboard requestType="print-requests" />
 </div>)
  };
 

  const renderSection = () => {
    switch (selectedSection) {
      case "products":
        return <div>{renderProducts()}</div>
      case "designRequests":
        return <div>{renderDesignRequests()}</div>
      case "printRequests":
        return <div>{renderPrintRequests()}</div>
      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
     <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      <div className="flex flex-grow">
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Navegación</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleSectionChange("products")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "products"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("designRequests")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "designRequests"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Design Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("printRequests")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "printRequests"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Print Requests
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 container mx-auto px-4 py-8">
          {renderSection()}
        </main>
      </div>

      {/* Preview del producto */}
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

      <Footer />
    </div>
  );
};

export default MisComprasPage;

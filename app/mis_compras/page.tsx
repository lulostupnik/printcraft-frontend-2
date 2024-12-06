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
  code: number;
  name: string;
  price: number;
  material: string;
  stock: number;
  description: string;
  images: { image_url: string }[];
  stl_file_url: string | null;
  seller_name: string;
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
  const [previewProduct, setPreviewProduct] = useState<null | ProductDetail>(null);
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
        setProducts(data); // Aquí actualizas `products` con la data de la API
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
      x: rect.left - 300,
      y: rect.top
    });

    // Obtenemos los detalles del producto de la API
    const productDetails = await fetchProductDetails(product.productcode);
    if (productDetails) {
      setPreviewProduct(productDetails);
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
      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500 text-center">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center">No hay productos comprados.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-6 bg-gray-800 py-4 px-6 rounded-lg">
              <h1 className="text-4xl font-bold text-white tracking-tight">Mis Compras</h1>
            </div>
            <div className="space-y-4">
              {products.map((order, index) => (
                <div key={order.orderid} className="bg-[#374151] rounded-lg overflow-hidden">
                  {/* Cabecera de la orden */}
                  <div className="flex justify-between items-center p-4 bg-gray-800">
                    <div className="space-x-8 flex items-center">
                      <span>Orden #{order.orderid}</span>
                      <span>Estado: {order.status}</span>
                      <span>Fecha: {formatDate(order.orderdate)}</span>
                      <span>Total: ${order.total_price}</span>
                    </div>
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
                      className="text-white hover:text-gray-300"
                    >
                      {expandedOrders.has(order.orderid) ? (
                        <MinusCircleIcon className="w-6 h-6" />
                      ) : (
                        <PlusCircleIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Detalles de productos (expandible) */}
                  {expandedOrders.has(order.orderid) && (
                    <div className="p-4 bg-[#374151]">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-600">
                            <th className="px-4 py-2 text-center">Nombre</th>
                            <th className="px-4 py-2 text-center">Producto</th>
                            <th className="px-4 py-2 text-center">Cantidad</th>
                            <th className="px-4 py-2 text-center">Precio Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                          {order.products.map((product: ProductFromAPI, productIndex: number) => (
                            <tr key={productIndex} className="hover:bg-gray-800">
                              <td className="px-4 py-2 text-center">{product.product_name}</td>
                              <td className="px-4 py-2 text-center">
                                <a
                                  href={`/products/${product.productcode}`}
                                  className="text-blue-500 underline hover:text-blue-700"
                                  onMouseEnter={(e) => handleProductMouseEnter(e, product)}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  Ver producto
                                </a>
                              </td>
                              <td className="px-4 py-2 text-center">{product.quantity}</td>
                              <td className="px-4 py-2 text-center">${product.price_per_unit * product.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview del producto usando ProductCard */}
        {previewProduct && (
          <div
            className="fixed z-[9999]"
            style={{
              left: `${previewPosition.x}px`,
              top: `${previewPosition.y}px`,
              width: '300px',
              pointerEvents: 'auto'
            }}
            onMouseEnter={handlePreviewMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ProductCard 
              product={{
                code: String(previewProduct.code),
                name: previewProduct.name,
                price: String(previewProduct.price),
                material: previewProduct.material,
                stock: String(previewProduct.stock),
                description: previewProduct.description,
                images_url: previewProduct.images.map(img => img.image_url),
                stl_file_url: previewProduct.stl_file_url,
                seller: previewProduct.seller_name
              }}
              rotate={true}
            />
          </div>
        )}
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
      <Footer />
    </div>
  );
};

export default MisComprasPage;

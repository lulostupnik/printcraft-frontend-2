'use client';
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserPrintReqDashboard from "@/components/userPrintReqDashboard";
import { useRouter } from "next/navigation"; // Import useRouter

const MisComprasPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "designRequests" | "printRequests"
  >("products");

  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter(); // Initialize useRouter

  const handleSectionChange = (section: "products" | "designRequests" | "printRequests") => {
    setLoading(true); // Set loading to true

    setTimeout(() => {
      setSelectedSection(section); // Set the new section after a small delay
      setLoading(false); // Stop loading after the timeout
    }, 100); // 500ms delay to simulate loading
  };

  // Function to navigate to designer's profile page
  const handleNavigateToDesigner = (sellerID: number) => {
    router.push(`/designers/designer/${sellerID}`);
  };

  // Placeholder render functions for each section
  const renderProducts = () => {
    return (
      <div className="bg-gray-700 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Mis Compras</h2>
        {/* Add dynamic product list here */}
        <div className="flex flex-col space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Producto Ejemplo 1</h3>
            <p className="text-gray-400 mb-2">Entregado el 3 de octubre</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Ver compra
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Producto Ejemplo 2</h3>
            <p className="text-gray-400 mb-2">Entregado el 7 de agosto</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Ver compra
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDesignRequests = () => {
    return (
      <div>
         <UserPrintReqDashboard
        requestType="design-requests"
      />
      <UserExploreAnsTableComponent type='design-requests' ></UserExploreAnsTableComponent>
      </div>
     
    );
  };

  const renderPrintRequests = () => {
    return (
      <div>
      <UserPrintReqDashboard
        requestType="print-requests"
      />

<UserExploreAnsTableComponent type='print-requests' ></UserExploreAnsTableComponent>
      </div>

    );
  };

  const renderSection = () => {
    if (loading) {
      return <p className="text-center text-white"></p>; // Show loading indicator
    }
    
    switch (selectedSection) {
      case "products":
        return renderProducts();
      case "designRequests":
        return renderDesignRequests();
      case "printRequests":
        return renderPrintRequests();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-grow">
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Navegación</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleSectionChange("products")} // Use handleSectionChange
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
                onClick={() => handleSectionChange("designRequests")} // Use handleSectionChange
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
                onClick={() => handleSectionChange("printRequests")} // Use handleSectionChange
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
          {renderSection()} {/* Render section based on loading state */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MisComprasPage;*/

'use client';
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserPrintReqDashboard from "@/components/userPrintReqDashboard";
import { useRouter } from "next/navigation"; // Import useRouter
import { API_URL } from "@/api/api";

const MisComprasPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "designRequests" | "printRequests"
  >("products");

  const router = useRouter(); // Initialize useRouter

  // Variable global dentro del componente
  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar productos globalmente
  const [loading, setLoading] = useState<boolean>(true); // Loading state for products

  // Definir el tipo de Producto
  type Product = {
    orderdate: string;
    quantity: number;
    productcode: number;
    status: string;
    product_name: string;
    total_price: number;
  };

  /*
  orderid	12
  productcode	81
  quantity	1
  total_price	1
  status	"En proceso"
  orderdate	"2024-10-21T22:47:29.812555Z"
  sellerid	142
  product_name	"Perro salchicha 3d"
*/

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
            <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
              <h3 className="text-2xl font-bold text-white">Productos Comprados</h3>
            </div>
            <div className={`max-h-[24rem] overflow-y-auto`}>
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-4 py-2 text-center">Nombre</th>
                    <th className="px-4 py-2 text-center">Producto</th>
                    <th className="px-4 py-2 text-center">Fecha</th>
                    <th className="px-4 py-2 text-center">Cantidad</th>
                    <th className="px-4 py-2 text-center">Precio</th>
                    <th className="px-4 py-2 text-center">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-600">
                  {products.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="px-4 py-2 text-center">{product.product_name}</td>
                      <td className="px-4 py-2 text-center">
                        <a
                          href={`/products/${product.productcode}`}
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          Ver producto aquí
                        </a>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {new Date(product.orderdate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                        {new Date(product.orderdate).toLocaleTimeString('es-ES')}
                      </td>

                      <td className="px-4 py-2 text-center">{product.quantity}</td>
                      <td className="px-4 py-2 text-center">{product.total_price}</td>
                      <td className="px-4 py-2 text-center">{product.status}</td>
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

  const renderDesignRequests = () => {
    return <UserPrintReqDashboard requestType="design-requests" />;
  };

  const renderPrintRequests = () => {
    return <UserPrintReqDashboard requestType="print-requests" />;
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "products":
        return renderProducts();
      case "designRequests":
        return renderDesignRequests();
      case "printRequests":
        return renderPrintRequests();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-grow">
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Navegación</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedSection("products")}
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
                onClick={() => setSelectedSection("designRequests")}
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
                onClick={() => setSelectedSection("printRequests")}
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

"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserPrintReqDashboard from "@/components/userPrintReqDashboard";

const MisComprasPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "designRequests" | "printRequests"
  >("products");

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
      <div className="bg-gray-700 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Design Requests</h2>
        {/* Placeholder for design requests */}
        <p className="text-gray-400">No hay solicitudes de diseño actualmente.</p>
      </div>
    );
  };

  const renderPrintRequests = () => {

  };

  const renderSection = () => {
    switch (selectedSection) {
      case "products":
        return renderProducts();
      case "designRequests":
        return renderDesignRequests();
      case "printRequests":
        return <UserPrintReqDashboard requestType='print-requests'/>;;
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

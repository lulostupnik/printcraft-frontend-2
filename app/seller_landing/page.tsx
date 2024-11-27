'use client'
//Opcion 1
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrintReqDashboard from '@/components/printReqDashboard';
import ProductForm from '@/components/ProductForm';
import { ProductRequest } from '@/types/ProductRequests';
import { Cantarell } from 'next/font/google';
import { totalmem } from 'os';
import ProductDashboard from '@/components/ProductDashboard';
import PublishedProducts from '@/components/PublishedProducts';


const SellerDashboardPage: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<'print' | 'design' | 'sell' | 'products' | 'published'>('sell');
  
  const handleProductPublished = (data: any) => {
    console.log('Producto publicado con éxito:', data);
  };

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case 'print':
        return <PrintReqDashboard requestType='print-requests'/>;
      case 'design':
        return <PrintReqDashboard requestType='design-requests'/>;
      case 'sell':
        return (
          <div className="container mx-auto">
            <section className="mb-12 bg-gray-800 p-8 rounded-lg">
              <h2 className="text-4xl font-bold mb-4 text-center">
                Publicar un producto
              </h2>
                <ProductForm onProductPublished={handleProductPublished} />  {/* Use the form component */}
              </section>
          </div>
        );
      case 'products':
        return <ProductDashboard/>;
      case 'published':
        return <PublishedProducts/>;
      default:
        return <div>error</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <Header />
      
      {/* Flex container for sidebar and main content */}
      <div className="flex flex-grow h-full">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <div className="py-8">
          <h2 className="text-xl font-bold mb-4">Dashboard Navigation</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedDashboard('print')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'print' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Print Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('design')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Design Requests
              </button>
            </li>
            <li>
              <button
                name="publish_product"
                onClick={() => setSelectedDashboard('sell')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'sell' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Publish product 
              </button>
              {/* dashboard ((publicar, publicados y a vender)) */}
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('products')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Products Sold
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('published')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'published' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Published Products
              </button>
            </li>
            
          </ul>
          </div>
        
        </aside>

        {/* Main Content */}
        <main className="flex-grow px-4 py-12">
          {renderDashboard()}
        </main>

      </div>

   
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SellerDashboardPage;
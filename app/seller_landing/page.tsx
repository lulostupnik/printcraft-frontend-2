'use client'
//Opcion 1
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MyPrintReqDashboard from '@/components/MyPrintReqDashboard';
import ProductForm from '@/components/ProductForm';
import ProductDashboard from '@/components/ProductDashboard';
import PublishedProducts from '@/components/PublishedProducts';
import ExploreReqDashboard from '@/components/ExploreReqDashboard';
import { Suspense } from "react";

const SellerDashboardPage: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState< 'explorePrint' | 'exploreDesign' | 'myPrint' | 'myDesign' | 'sell' | 'products' | 'published'>('sell');
  
  const handleProductPublished = (data: any) => {
    console.log('Producto publicado con éxito:', data);
  };

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case 'explorePrint':
        return <ExploreReqDashboard requestType='print-requests'/>;
      case 'exploreDesign':
        return <ExploreReqDashboard requestType='design-requests'/>;
      case 'myPrint':
        return <MyPrintReqDashboard requestType='print-requests'/>;
      case 'myDesign':
        return <MyPrintReqDashboard requestType='design-requests'/>;
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
      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      
      {/* Flex container for sidebar and main content */}
      <div className="flex flex-grow h-full">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <div className="py-8">
          <h2 className="text-xl font-bold mb-4">Dashboard Navigation</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedDashboard('explorePrint')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'explorePrint' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Explorar Print Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('exploreDesign')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'exploreDesign' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Explorar Design Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('myPrint')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'myPrint' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Mis Print Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('myDesign')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'myDesign' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Mis Design Requests
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
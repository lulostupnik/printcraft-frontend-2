interface FooterProps { //ahora se le puede poner un className
  className?: string;
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer({ className = '' }: FooterProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();

    // Check if tokens exist in localStorage to determine login status and seller status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false');

  
    if (accessToken) {
      setIsLoggedIn(true);
      setIsSeller(sellerStatus);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

    // Redirect the user when "Publicar producto" button is clicked
    const handlePublishProductClick = () => {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (!isSeller) {
        router.push('/register_seller');
      } else {
        router.push('/seller_landing');
      }
    };

    // Redirect the user when "Publicar producto" button is clicked
    const handleOfferServicesClick = () => {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (!isSeller) {
        router.push('/register_seller');
      } else {
        router.push('/offer_services');
      }
    };
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Comprar Section */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Comprar</h3>
          <ul>
            <li className="mb-2">
              <a href="/products_catalog" className="hover:underline">
                Catálogo
              </a>
            </li>
            <li className="mb-2">
              <a href="/lookfor_designer" className="hover:underline">
                Diseñadores
              </a>
            </li>
          </ul>
        </div>
  
        {/* Vender Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Vender</h3>
          <ul>
            <li className="mb-2">
              <a onClick={handlePublishProductClick} style={{ cursor: "pointer" }} className="hover:underline">
                Publicar
              </a>
            </li>
            
          </ul>
        </div>
  
        {/* Empty Space for Alignment */}
        <div></div>
  
        {/* Copyright Section */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-4">&copy; 2024 3dCapybara.<br /> Todos los derechos reservados.</h3>
        </div>
      </div>
    </div>
  </footer>
  
  
  );
}

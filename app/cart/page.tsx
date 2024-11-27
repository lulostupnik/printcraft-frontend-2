'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types/Product';
import STLViewer from '@/components/RotatingStlView'

interface CartProduct extends Product {
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewStl, setViewStl] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    // Verificar estado de login
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);

    // Cargar items del carrito
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      const cart = JSON.parse(cartString);
      setCartItems(cart);
      // Inicializar estado de visualización STL
      const initialStlState = cart.reduce((acc: any, _: any, index: number) => {
        acc[index] = false;
        return acc;
      }, {});
      setViewStl(initialStlState);
    }
  }, [router]);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    const product = updatedCart[index];
    
    // Verificar que la nueva cantidad no exceda el stock
    if (newQuantity > parseInt(product.stock)) {
      alert(`Lo sentimos, solo hay ${product.stock} unidades disponibles.`);
      return;
    }
    
    product.quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleStlView = (index: number) => {
    setViewStl(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header showCart={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Lista de productos */}
          <div className="w-full md:w-2/3">
            {cartItems.map((product, index) => (
              <div key={index} className="bg-gray-800 min-h-[14rem] rounded-lg overflow-hidden shadow-lg mb-4 p-4 flex">
                <div className="w-40 flex flex-col gap-2">
                  <div className="h-40 mr-3">
                    {product.stl_file_url && viewStl[index] ? (
                      <STLViewer
                        url={product.stl_file_url}
                        width="100%"
                        height="100%"
                        containerStyle={{ width: '100%', height: '100%' }}
                        rotate={true}
                      />
                    ) : product.images_url && product.images_url.length > 0 ? (
                      <img 
                        src={product.images_url[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {!viewStl[index] && product.stl_file_url && product.images_url && product.images_url.length > 0 && (
                      <button 
                        onClick={() => toggleStlView(index)}
                        className="bg-gray-700 text-white px-3 py-1 rounded transition duration-200"
                      >
                        Ver STL
                      </button>
                    )}
                    {viewStl[index] && product.images_url && product.images_url.length > 0 && (
                      <button 
                        onClick={() => toggleStlView(index)}
                        className="bg-gray-700 text-white px-3 py-1 rounded transition duration-200"
                      >
                        Ver imagen
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${product.code}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:underline">{product.name}</h3>
                  </Link>
                  <p className="text-lg font-bold text-green-500">${product.price}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(index, product.quantity - 1)}
                        className="bg-gray-700 text-white px-2 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="bg-gray-700 text-white px-4 py-1">
                        {product.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(index, product.quantity + 1)}
                        className="bg-gray-700 text-white px-2 py-1 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Resumen de compra</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="border-t border-gray-600 pt-4 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200">
                Continuar compra
              </button>
            </div>
          </div>
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Tu carrito está vacío</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;

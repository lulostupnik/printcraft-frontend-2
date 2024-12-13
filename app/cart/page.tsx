'use client';
import { Suspense } from "react";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import STLViewer from '@/components/RotatingStlView';
import { API_URL } from '@/api/api';
import ChatBox from "@/components/ChatBox";

interface CartProduct {
  id: number;
  code: number;
  name: string;
  material: string;
  stock: number;
  description: string;
  stl_file_url: string | null;
  price: string;
  quantity: number;
  images_url: string[];
  sellerId: number;
  sellerName: string;
}


interface GroupedItem {
  sellerName: string;
  items: CartProduct[];
}

type GroupedItems = Record<string, GroupedItem>;

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewStl, setViewStl] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }
    setIsLoggedIn(true);

    const cartString = localStorage.getItem('cart');
    if (cartString) {
      const cart = JSON.parse(cartString) as CartProduct[];
      setCartItems(cart);

      const initialStlState = cart.reduce((acc: any, item) => {
        acc[item.code] = false;
        return acc;
      }, {});
      setViewStl(initialStlState);
    }
  }, [router]);

  const groupedItems: GroupedItems = cartItems.reduce((groups, item) => {
    const sellerId = item.sellerId.toString();
    const sellerName = item.sellerName;

    if (!groups[sellerId]) {
      groups[sellerId] = {
        sellerName: sellerName,
        items: [],
      };
    }
    groups[sellerId].items.push(item);
    return groups;
  }, {} as GroupedItems);

  const updateQuantity = (productCode: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((product) => {
      if (product.code === productCode) {
        if (newQuantity > product.stock) {
          alert(`Lo sentimos, solo hay ${product.stock} unidades disponibles.`);
          return product;
        }
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = (items: CartProduct[]) => {
    return items
      .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const removeFromCart = (productCode: number) => {
    const updatedCart = cartItems.filter((product) => product.code !== productCode);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleStlView = (productCode: number) => {
    setViewStl((prev) => ({
      ...prev,
      [productCode]: !prev[productCode],
    }));
  };

  const handleCheckout = async (sellerId: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    const sellerItems = groupedItems[sellerId].items;
    const orderProducts = sellerItems.map((item: CartProduct) => ({
      product: item.code,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(`${API_URL}/orders/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ order_products: orderProducts }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const remainingItems = cartItems.filter(
        (item) => item.sellerId.toString() !== sellerId
      );
      setCartItems(remainingItems);
      localStorage.setItem('cart', JSON.stringify(remainingItems));
      
      const data = await response.json();
      router.push(`/mp_pref/${data.preference_id}`);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al procesar tu orden.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Tu carrito está vacío</p>
          </div>
        ) : (
          Object.keys(groupedItems).map((sellerId) => {
            const sellerGroup = groupedItems[sellerId];
            const sellerItems = sellerGroup.items;

            return (
              <div key={sellerId} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Vendedor: {sellerGroup.sellerName}
                </h2>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Lista de productos */}
                  <div className="w-full md:w-2/3">
                    {sellerItems.map((product) => (
                      <div
                        key={product.code}
                        className="bg-gray-800 min-h-[14rem] rounded-lg overflow-hidden shadow-lg mb-4 p-4 flex"
                      >
                        <div className="w-40 flex flex-col gap-2">
                          <div className="h-40 mr-3">
                            {product.stl_file_url && viewStl[product.code] ? (
                              <STLViewer
                                url={product.stl_file_url}
                                width="100%"
                                height="100%"
                                containerStyle={{ width: '100%', height: '100%' }}
                                rotate={true}
                              />
                            ) : product.images_url &&
                              product.images_url.length > 0 ? (
                              <img
                                src={product.images_url[0]}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded">
                                <span className="text-gray-400 text-sm">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {!viewStl[product.code] &&
                              product.stl_file_url &&
                              product.images_url &&
                              product.images_url.length > 0 && (
                                <button
                                  onClick={() => toggleStlView(product.code)}
                                  className="bg-gray-700 text-white px-3 py-1 rounded transition duration-200"
                                >
                                  Ver STL
                                </button>
                              )}
                            {viewStl[product.code] &&
                              product.images_url &&
                              product.images_url.length > 0 && (
                                <button
                                  onClick={() => toggleStlView(product.code)}
                                  className="bg-gray-700 text-white px-3 py-1 rounded transition duration-200"
                                >
                                  Ver imagen
                                </button>
                              )}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <Link href={`/products/${product.code}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:underline">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-lg font-bold text-green-500">
                            ${product.price}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.code,
                                    product.quantity - 1
                                  )
                                }
                                className="bg-gray-700 text-white px-2 py-1 rounded-l"
                              >
                                -
                              </button>
                              <span className="bg-gray-700 text-white px-4 py-1">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.code,
                                    product.quantity + 1
                                  )
                                }
                                className="bg-gray-700 text-white px-2 py-1 rounded-r"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => removeFromCart(product.code)}
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
                      <h2 className="text-2xl font-bold mb-4">
                        Resumen de compra
                      </h2>
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>${calculateTotal(sellerItems)}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-4 mb-4">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>${calculateTotal(sellerItems)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCheckout(sellerId)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
                      >
                        Continuar compra
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      <Footer />

      <ChatBox/>
    </div>
  );
};

export default CartPage;

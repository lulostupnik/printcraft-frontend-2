'use client';
import { API_URL } from "@/api/api";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderForSeller from "@/components/HeaderForSeller";
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import StlViewerComponent from '@/components/RotateStlView';
import { Product } from '@/types/Product';
import { useParams } from 'next/navigation';
import RequestCard from "@/components/RequestCard";

export default function SellerHomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { code } = useParams(); // Fetch the code from the URL params
    const router = useRouter();

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

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products/seller/${code}/`);
                if (response.ok) {
                    const data = await response.json();

                    // Transform data to match Product interface if needed
                    const transformedProducts: Product[] = data.map((item: any) => ({
                        code: item.code,
                        name: item.name,
                        material: item.material,
                        stock: item.stock.toString(),
                        description: item.description,
                        stl_file_url: item.stl_file_url,
                        seller: item.seller,
                        price: item.price,
                        images_url: item.images.map((img: any) => img.image_url), // Assumes images is an array
                    }));

                    setProducts(transformedProducts);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <HeaderForSeller />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <section className="relative mb-12">
                    <div className="flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
                        <div className="w-1/2 space-y-4 text-center py-5">
                            <h2 className="text-4xl font-bold mb-4">Publicar un producto</h2>
                            <h4 className="mb-4 text-gray-300">
                                Solamente vamos a necesitar que nos proporcione algunos datos, y el diseño.
                            </h4>
                            <a href="./publish_product">
                                <button className="bg-white text-black py-3 px-8 rounded-full font-bold text-lg mt-10">
                                    Publicar
                                </button>
                            </a>
                        </div>
                        <div className="w-1/2 space-y-4 text-center py-5">
                            <h2 className="text-4xl font-bold mb-4">Servicio especializado</h2>
                            <h4 className="mb-4 text-gray-300">
                                Cada usuario va a poder contactarlo, para que usted pueda brindarle un servicio personalizado.
                            </h4>
                            <a href="./lookfor_designer">
                                <button className="bg-white text-black py-3 px-8 rounded-full font-bold text-lg mt-10">
                                    Ofrecer servicios
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="relative mb-12">
                    <div className="flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
                        <div className="w-1/2 space-y-4 text-center py-5">
                            <h2 className="text-4xl font-bold mb-4">Explorar Requests</h2>
                            <h4 className="mb-4 text-gray-300">
                                Aquí podrá ver las Requests que se le han proporcionado específicamente a usted, así como las requests que se han proporcionado en general. 
                            </h4>
                            <a href="./../../choose_request">
                                <button className="bg-white text-black py-3 px-8 rounded-full font-bold text-lg mt-10">
                                    Explorar
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {products.length > 0 && (
                    <section className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">Mis Productos</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.code} product={product} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

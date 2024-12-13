'use client';
import ChatBox from "@/components/ChatBox";
import { API_URL } from "@/api/api";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import STLViewer from '@/components/RotatingStlView'
import { Suspense } from "react";
interface ProductDetail {
  id: number;
  code: number;
  name: string;
  material: string;
  stock: number;
  description: string;
  stl_file_url: string | null;
  seller: number;
  seller_name: string;
  price: string;
  images: { image_url: string }[];
}

interface CartProduct extends Omit<ProductDetail, 'images' | 'seller' | 'seller_name'> {
  quantity: number;
  images_url: string[];
  sellerId: number;
  sellerName: string;
}

interface Review {
  id: number;
  product: number;
  user: number;
  rating: number;
  comment: string;
  created_at: string;
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { code } = useParams();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews/product/${code}/`);
      if (response.ok) {
        const reviews: Review[] = await response.json();
        setReviews(reviews);
        
        const average = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        setAverageRating(average || 0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (code) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/products/${code}/`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error('Failed to fetch product details');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }

    fetchReviews();
  }, [code]);

  const handleAddToCart = () => {
    // Verificar si el usuario está autenticado
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    if (!product) return;
    
    const cartString = localStorage.getItem('cart');
    let cart: CartProduct[] = cartString ? JSON.parse(cartString) : [];
    
    // Find if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.code === product.code);
    
    if (existingProductIndex !== -1) {
      // Product is already in the cart, increase quantity
      const updatedCart = [...cart];
      const existingProduct = updatedCart[existingProductIndex];
      
      // Check stock availability
      if (existingProduct.quantity + 1 > product.stock) {
        alert(`Lo sentimos, solo hay ${product.stock} unidades disponibles.`);
        return;
      }
      
      existingProduct.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Product not in cart, add it with seller information
      const cartProduct: CartProduct = {
        ...product,
        quantity: 1,
        images_url: product.images.map(img => img.image_url),
        sellerId: product.seller,
        sellerName: product.seller_name,
      };
      cart.push(cartProduct);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    alert('Producto agregado al carrito');
  };

  const handleNewReview = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }
    setShowSnackbar(true);
  };

  const handleSubmitReview = async () => {
    // Validar que el rating sea un número entero entre 1 y 5
    if (!Number.isInteger(newRating) || newRating < 1 || newRating > 5) {
      alert('Por favor, ingresa un rating válido entre 1 y 5.');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          product: code,
          rating: newRating,
          comment: newComment || null
        })
      });

      if (response.ok) {
        setShowSnackbar(false);
        setNewRating(0);
        setNewComment('');
        await fetchReviews();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al enviar la review');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-lg font-bold">Product not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
       <Suspense fallback={<div></div>}>
          <Header showCart={true} showSearchBar={true}/>
      </Suspense>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Images (only if images are available) */}
        {product.images.length > 0 && (
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="bg-gray-800 p-4 rounded-lg">
              {/* Main Image Display */}
              <div className="mb-4">
                <img
                  src={product.images[selectedImageIndex].image_url}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="w-full rounded"
                />
              </div>

              {/* Thumbnails for Selecting Images */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt={`Product thumbnail ${index + 1}`}
                    className={`w-16 h-16 rounded border ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-600'} cursor-pointer`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Product Details and STL Viewer */}
        <div className={`w-full ${product.images.length > 0 ? 'lg:w-2/3' : 'lg:w-full'}`}>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold mb-4">${product.price}</p>
            <p className="text-gray-300 mb-4">Color: Amarillo/Azul</p>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Lo que tenés que saber de este producto:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Material del ncleo: {product.material}</li>
                <li>Stock disponible: {product.stock}</li>
                <li>Vendido por: {product.seller_name} </li>
                <li>{product.description}</li>
              </ul>
            </div>

            {/* STL Viewer (Centered if no images) */}
            {product.stl_file_url && (
              <div className={`mb-4 ${product.images.length === 0 ? 'flex justify-center' : ''}`}>
                <h3 className="text-lg font-bold mb-2">3D Model:</h3>
                <div className="w-full h-96 bg-gray-700 rounded">
                  <STLViewer url={product.stl_file_url}
                  rotate/>
                </div>
              </div>
            )}

            {/* Buy Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-blue-600 text-white py-3 px-6 rounded font-bold hover:bg-blue-500"
                onClick={() => router.push(`/mp/${product.code}/1`)}
              >
                Comprar ahora
              </button>
              <button className="bg-gray-600 text-white py-3 px-6 rounded font-bold hover:bg-gray-500"
                onClick={handleAddToCart}
                >
                Agregar al carrito
              </button>
            </div>


           
          </div>
        </div>
      </main>

      {/* Nueva sección de reviews - agregar antes del Footer */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Opiniones del producto</h2>
            <button
              onClick={handleNewReview}
              className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500"
            >
              Hacer una review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resumen de calificaciones */}
            <div className="col-span-1">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-yellow-400 text-xl">
                      {index < Math.round(averageRating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400">{reviews.length} opiniones</p>
              </div>
            </div>

            {/* Lista de reviews */}
            <div className="col-span-1 md:col-span-2">
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-4">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className="text-yellow-400">
                            {index < review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="mb-2">{review.comment}</p>
                      <div className="text-sm text-gray-400">
                        Por {review.user} • {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No hay opiniones todavía. ¡Sé el primero en opinar!
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Snackbar para nueva review - actualizado para centrar */}
      {showSnackbar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Nueva Review</h3>
              <button onClick={() => setShowSnackbar(false)} className="text-white hover:text-gray-300">X</button>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-bold mb-1">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= newRating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-400">☆</span>
                    )}
                  </button>
                ))}
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 mt-4 bg-gray-700 rounded"
                placeholder="Escribe tu comentario..."
              />
              <button
                onClick={handleSubmitReview}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetailPage;

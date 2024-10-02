// // // "use client";
// // // import React, { useState, ChangeEvent, FormEvent } from 'react';
// // // import Header from '@/components/Header';
// // // import Footer from '@/components/Footer';
// // // import { API_URL } from "@/api/api"


// // // interface ProductData {
// // //   name: string;
// // //   description: string;
// // //   price: string;
// // //   material: string;
// // //   stock: string;
// // //   imageFile: File | null;  // Store the image file itself
// // // }

// // // export default function PublicarProducto() {
// // //   const [productData, setProductData] = useState<ProductData>({
// // //     name: '',
// // //     description: '',
// // //     price: '',
// // //     material: '',
// // //     stock: '',
// // //     imageFile: null,  // Store image file
// // //   });
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [imagePreview, setImagePreview] = useState<string | null>(null);  // To display image preview

// // //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target;
// // //     setProductData({ ...productData, [name]: value });
// // //   };

// // //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files.length > 0) {
// // //       const file = e.target.files[0];
// // //       setProductData({ ...productData, imageFile: file });
      
// // //       // Preview the selected image
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setImagePreview(reader.result as string);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);

// // //     try {
// // //       const accessToken = localStorage.getItem('accessToken');
// // //       if (!accessToken) {
// // //         throw new Error('User is not authenticated');
// // //       }

// // //       // Prepare the FormData object to send the image file
// // //       const formData = new FormData();
// // //      // formData.append('name', productData.name);
// // //       //formData.append('description', productData.description);
// // //       //formData.append('price', productData.price);
// // //       //formData.append('material', productData.material);
// // //       //formData.append('stock', productData.stock);
// // //       if (productData.imageFile) {
// // //         //formData.append('image_url', 'https://null.jpg' );
// // //         formData.append('image', productData.imageFile);  // Add the image file to the form data
// // //       }//else{
// // //         //formData.append('image_url', 'https://null.jpg' );
// // //       //}

// // //       const response = await fetch(`${API_URL}/upload/`, {
// // //         method: 'POST',
// // //         headers: {
// // //           Authorization: `Bearer ${accessToken}`,  // Pass the access token
// // //         },
// // //         body: formData,  // Send form data including image file
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         console.log('Producto publicado con éxito:', result);
// // //         // Reset form
// // //         setProductData({
// // //           name: '',
// // //           description: '',
// // //           price: '',
// // //           material: '',
// // //           stock: '',
// // //           imageFile: null,
// // //         });
// // //         setImagePreview(null);  // Clear image preview
// // //         // Redirect to another page or show a success message
// // //         // router.push('/products_catalog');
// // //       } else {
// // //         const errorData = await response.json();
// // //         console.error('Error al publicar el producto:', errorData);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error al publicar el producto:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
// // //       <Header />
// // //       <main className="flex-1 container mx-auto px-4 py-8">
// // //         <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
// // //         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
// // //           <div className="mb-4">
// // //             <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
// // //             <input
// // //               type="text"
// // //               id="name"
// // //               name="name"
// // //               value={productData.name}
// // //               onChange={handleChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
// // //             <textarea
// // //               id="description"
// // //               name="description"
// // //               value={productData.description}
// // //               onChange={handleChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="price" className="block text-sm font-medium">Precio</label>
// // //             <input
// // //               type="number"
// // //               id="price"
// // //               name="price"
// // //               value={productData.price}
// // //               onChange={handleChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="material" className="block text-sm font-medium">Material</label>
// // //             <input
// // //               type="text"
// // //               id="material"
// // //               name="material"
// // //               value={productData.material}
// // //               onChange={handleChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
// // //             <input
// // //               type="number"
// // //               id="stock"
// // //               name="stock"
// // //               value={productData.stock}
// // //               onChange={handleChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="imageFile" className="block text-sm font-medium">Imagen del Producto</label>
// // //             <input
// // //               type="file"
// // //               id="imageFile"
// // //               name="imageFile"
// // //               accept="image/*"
// // //               onChange={handleFileChange}
// // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // //               required
// // //             />
// // //           </div>

// // //           {/* Display image preview */}
// // //           {imagePreview && (
// // //             <div className="mb-4">
// // //               <img src={imagePreview} alt="Vista previa" className="max-w-full h-auto rounded" />
// // //             </div>
// // //           )}

// // //           <button
// // //             type="submit"
// // //             className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed' : ''}`}
// // //             disabled={isLoading}
// // //           >
// // //             {isLoading ? 'Publicando...' : 'Publicar Producto'}
// // //           </button>
// // //         </form>
// // //       </main>
// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // // "use client";
// // // // import React, { useState, ChangeEvent, FormEvent } from 'react';
// // // // import Header from '@/components/Header';
// // // // import Footer from '@/components/Footer';
// // // // import { API_URL } from "@/api/api"


// // // // interface ProductData {
// // // //   name: string;
// // // //   description: string;
// // // //   price: string;
// // // //   material: string;
// // // //   stock: string;
// // // //   imageFile: File | null;  // Store the image file itself
// // // // }

// // // // export default function PublicarProducto() {
// // // //   const [productData, setProductData] = useState<ProductData>({
// // // //     name: '',
// // // //     description: '',
// // // //     price: '',
// // // //     material: '',
// // // //     stock: '',
// // // //     imageFile: null,  // Store image file
// // // //   });
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [imagePreview, setImagePreview] = useState<string | null>(null);  // To display image preview

// // // //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // //     const { name, value } = e.target;
// // // //     setProductData({ ...productData, [name]: value });
// // // //   };

// // // //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// // // //     if (e.target.files && e.target.files.length > 0) {
// // // //       const file = e.target.files[0];
// // // //       setProductData({ ...productData, imageFile: file });
      
// // // //       // Preview the selected image
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = () => {
// // // //         setImagePreview(reader.result as string);
// // // //       };
// // // //       reader.readAsDataURL(file);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// // // //     e.preventDefault();
// // // //     setIsLoading(true);

// // // //     try {
// // // //       const accessToken = localStorage.getItem('accessToken');
// // // //       if (!accessToken) {
// // // //         throw new Error('User is not authenticated');
// // // //       }

// // // //       // Prepare the FormData object to send the image file
// // // //       const formData = new FormData();
// // // //       formData.append('name', productData.name);
// // // //       formData.append('description', productData.description);
// // // //       formData.append('price', productData.price);
// // // //       formData.append('material', productData.material);
// // // //       formData.append('stock', productData.stock);
// // // //       if (productData.imageFile) {
// // // //         formData.append('image_url', 'https://null.jpg' );
// // // //         //formData.append('image', productData.imageFile);  // Add the image file to the form data
// // // //       }else{
// // // //         formData.append('image_url', 'https://null.jpg' );
// // // //       }

// // // //       const response = await fetch(`${API_URL}/products/create/`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           Authorization: `Bearer ${accessToken}`,  // Pass the access token
// // // //         },
// // // //         body: formData,  // Send form data including image file
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         console.log('Producto publicado con éxito:', result);
// // // //         // Reset form
// // // //         setProductData({
// // // //           name: '',
// // // //           description: '',
// // // //           price: '',
// // // //           material: '',
// // // //           stock: '',
// // // //           imageFile: null,
// // // //         });
// // // //         setImagePreview(null);  // Clear image preview
// // // //         // Redirect to another page or show a success message
// // // //         // router.push('/products_catalog');
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         console.error('Error al publicar el producto:', errorData);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error al publicar el producto:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
// // // //       <Header />
// // // //       <main className="flex-1 container mx-auto px-4 py-8">
// // // //         <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
// // // //         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
// // // //           <div className="mb-4">
// // // //             <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
// // // //             <input
// // // //               type="text"
// // // //               id="name"
// // // //               name="name"
// // // //               value={productData.name}
// // // //               onChange={handleChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
// // // //             <textarea
// // // //               id="description"
// // // //               name="description"
// // // //               value={productData.description}
// // // //               onChange={handleChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="price" className="block text-sm font-medium">Precio</label>
// // // //             <input
// // // //               type="number"
// // // //               id="price"
// // // //               name="price"
// // // //               value={productData.price}
// // // //               onChange={handleChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="material" className="block text-sm font-medium">Material</label>
// // // //             <input
// // // //               type="text"
// // // //               id="material"
// // // //               name="material"
// // // //               value={productData.material}
// // // //               onChange={handleChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
// // // //             <input
// // // //               type="number"
// // // //               id="stock"
// // // //               name="stock"
// // // //               value={productData.stock}
// // // //               onChange={handleChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="imageFile" className="block text-sm font-medium">Imagen del Producto</label>
// // // //             <input
// // // //               type="file"
// // // //               id="imageFile"
// // // //               name="imageFile"
// // // //               accept="image/*"
// // // //               onChange={handleFileChange}
// // // //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// // // //               required
// // // //             />
// // // //           </div>

// // // //           {/* Display image preview */}
// // // //           {imagePreview && (
// // // //             <div className="mb-4">
// // // //               <img src={imagePreview} alt="Vista previa" className="max-w-full h-auto rounded" />
// // // //             </div>
// // // //           )}

// // // //           <button
// // // //             type="submit"
// // // //             className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed' : ''}`}
// // // //             disabled={isLoading}
// // // //           >
// // // //             {isLoading ? 'Publicando...' : 'Publicar Producto'}
// // // //           </button>
// // // //         </form>
// // // //       </main>
// // // //       <Footer />
// // // //     </div>
// // // //   );
// // // // }
// // "use client";
// // import React, { useState, ChangeEvent, FormEvent } from 'react';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { API_URL } from "@/api/api"

// // interface ProductData {
// //   name: string;
// //   description: string;
// //   price: string;
// //   material: string;
// //   stock: string;
// //   imageFile: File | null;  // Store the image file itself
// // }

// // export default function PublicarProducto() {
// //   const [productData, setProductData] = useState<ProductData>({
// //     name: '',
// //     description: '',
// //     price: '',
// //     material: '',
// //     stock: '',
// //     imageFile: null,  // Store image file
// //   });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);  // To display image preview

// //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setProductData({ ...productData, [name]: value });
// //   };

// //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       const file = e.target.files[0];
// //       setProductData({ ...productData, imageFile: file });
      
// //       // Preview the selected image
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       const accessToken = localStorage.getItem('accessToken');
// //       if (!accessToken) {
// //         throw new Error('User is not authenticated');
// //       }

// //       // Prepare the FormData object to send all the product data including the image file
// //       const formData = new FormData();
// //       //formData.append('name', productData.name);
// //       //formData.append('description', productData.description);
// //       //formData.append('price', productData.price);
// //       //formData.append('material', productData.material);
// //       //formData.append('stock', productData.stock);

// //       if (productData.imageFile) {
// //         formData.append('file', productData.imageFile);  // Add the image file to the form data
// //       }

// //       const response = await fetch(`${API_URL}/upload/`, {
// //         method: 'POST',
// //         headers: {
// //           Authorization: `Bearer ${accessToken}`,  // Pass the access token
// //         },
// //         body: formData,  // Send form data including image file
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log('Producto publicado con éxito:', result);
// //         // Reset form
// //         setProductData({
// //           name: '',
// //           description: '',
// //           price: '',
// //           material: '',
// //           stock: '',
// //           imageFile: null,
// //         });
// //         setImagePreview(null);  // Clear image preview
// //         // Redirect to another page or show a success message
// //         // router.push('/products_catalog');
// //       } else {
// //         const errorData = await response.json();
// //         console.error('Error al publicar el producto:', errorData);
// //       }
// //     } catch (error) {
// //       console.error('Error al publicar el producto:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
// //       <Header />
// //       <main className="flex-1 container mx-auto px-4 py-8">
// //         <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
// //         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
// //           <div className="mb-4">
// //             <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               value={productData.name}
// //               onChange={handleChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               value={productData.description}
// //               onChange={handleChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="price" className="block text-sm font-medium">Precio</label>
// //             <input
// //               type="number"
// //               id="price"
// //               name="price"
// //               value={productData.price}
// //               onChange={handleChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="material" className="block text-sm font-medium">Material</label>
// //             <input
// //               type="text"
// //               id="material"
// //               name="material"
// //               value={productData.material}
// //               onChange={handleChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
// //             <input
// //               type="number"
// //               id="stock"
// //               name="stock"
// //               value={productData.stock}
// //               onChange={handleChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="imageFile" className="block text-sm font-medium">Imagen del Producto</label>
// //             <input
// //               type="file"
// //               id="imageFile"
// //               name="imageFile"
// //               accept="image/*"
// //               onChange={handleFileChange}
// //               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
// //               required
// //             />
// //           </div>

// //           {/* Display image preview */}
// //           {imagePreview && (
// //             <div className="mb-4">
// //               <img src={imagePreview} alt="Vista previa" className="max-w-full h-auto rounded" />
// //             </div>
// //           )}

// //           <button
// //             type="submit"
// //             className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed' : ''}`}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Publicando...' : 'Publicar Producto'}
// //           </button>
// //         </form>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }

// "use client";
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { API_URL } from "@/api/api"

// interface ProductData {
//   name: string;
//   description: string;
//   price: string;
//   material: string;
//   stock: string;
//   stl_file_url: string | null;
//   imageFiles: File[];  // Store multiple image files
// }

// export default function PublicarProducto() {
//   const [productData, setProductData] = useState<ProductData>({
//     name: '',
//     description: '',
//     price: '',
//     material: '',
//     stock: '',
//     stl_file_url: null,
//     imageFiles: [],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setProductData({ ...productData, imageFiles: files });

//       // Generate previews for each selected file
//       const previews = files.map(file => {
//         const reader = new FileReader();
//         return new Promise<string>((resolve) => {
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.readAsDataURL(file);
//         });
//       });

//       Promise.all(previews).then(previews => setImagePreviews(previews));
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         throw new Error('User is not authenticated');
//       }

//       // Prepare the FormData object to send all the product data including the image files
//       const formData = new FormData();
//       formData.append('name', productData.name);
//       formData.append('description', productData.description);
//       formData.append('price', productData.price);
//       formData.append('material', productData.material);
//       formData.append('stock', productData.stock);

//       if (productData.stl_file_url) {
//         formData.append('stl_file_url', productData.stl_file_url);
//       }

//       productData.imageFiles.forEach((file, index) => {
//         formData.append('image_files', file);  // Add each image file to the form data
//       });

//       const response = await fetch(`${API_URL}/products/create/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Producto publicado con éxito:', result);
//         // Reset form
//         setProductData({
//           name: '',
//           description: '',
//           price: '',
//           material: '',
//           stock: '',
//           stl_file_url: null,
//           imageFiles: [],
//         });
//         setImagePreviews([]);
//       } else {
//         const errorData = await response.json();
//         console.error('Error al publicar el producto:', errorData);
//       }
//     } catch (error) {
//       console.error('Error al publicar el producto:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
//         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
//             <textarea
//               id="description"
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-medium">Precio</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="material" className="block text-sm font-medium">Material</label>
//             <input
//               type="text"
//               id="material"
//               name="material"
//               value={productData.material}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
//             <input
//               type="number"
//               id="stock"
//               name="stock"
//               value={productData.stock}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="stl_file_url" className="block text-sm font-medium">URL del Archivo STL (opcional)</label>
//             <input
//               type="text"
//               id="stl_file_url"
//               name="stl_file_url"
//               value={productData.stl_file_url || ''}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               placeholder="http://example.com/file.stl"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="imageFiles" className="block text-sm font-medium">Imágenes del Producto</label>
//             <input
//               type="file"
//               id="imageFiles"
//               name="imageFiles"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//               className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
//               required
//             />
//           </div>

//           {/* Display image previews */}
//           {imagePreviews.length > 0 && (
//             <div className="mb-4">
//               {imagePreviews.map((preview, index) => (
//                 <img key={index} src={preview} alt={`Vista previa ${index + 1}`} className="max-w-full h-auto rounded mb-2" />
//               ))}
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Publicando...' : 'Publicar Producto'}
//           </button>
//         </form>
//       </main>
//       <Footer />
//     </div>
//   );
// }


"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from "@/api/api"

interface ProductData {
  name: string;
  description: string;
  price: string;
  material: string;
  stock: string;
  stl_file_url: string | null;
  imageFiles: File[];  // Store multiple image files
}

export default function PublicarProducto() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    material: '',
    stock: '',
    stl_file_url: null,
    imageFiles: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProductData({ ...productData, imageFiles: files });

      // Generate previews for each selected file
      const previews = files.map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previews).then(previews => setImagePreviews(previews));
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('User is not authenticated');
        }

        // Prepare the FormData object to send all the product data including the image files
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('material', productData.material);
        formData.append('stock', productData.stock);

        if (productData.stl_file_url) {
            formData.append('stl_file_url', productData.stl_file_url);
        }
      //   productData.imageFiles.forEach((file) => {
      //     formData.append('image_files[]', file);  // Use 'image_files[]' to indicate it's an array of images
      // });
      productData.imageFiles.forEach((file) => {
        formData.append('image_files', file); // Each file is appended under 'image_files'
      });

        // Send the formData to create the product
        const response = await fetch(`${API_URL}/products/create/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Producto publicado con éxito:', result);
            // Reset form
            setProductData({
                name: '',
                description: '',
                price: '',
                material: '',
                stock: '',
                stl_file_url: null,
                imageFiles: [],
            });
            setImagePreviews([]);
        } else {
            const errorData = await response.json();
            console.error('Error al publicar el producto:', errorData);
        }
    } catch (error) {
        console.error('Error al publicar el producto:', error);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Publicar un Producto</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="material" className="block text-sm font-medium">Material</label>
            <input
              type="text"
              id="material"
              name="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stl_file_url" className="block text-sm font-medium">URL del Archivo STL (opcional)</label>
            <input
              type="text"
              id="stl_file_url"
              name="stl_file_url"
              value={productData.stl_file_url || ''}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="http://example.com/file.stl"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageFiles" className="block text-sm font-medium">Imágenes del Producto</label>
            <input
              type="file"
              id="imageFiles"
              name="imageFiles"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>

          {/* Display image previews */}
          {imagePreviews.length > 0 && (
            <div className="mb-4">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Vista previa ${index + 1}`} className="max-w-full h-auto rounded mb-2" />
              ))}
            </div>
          )}

          <button
            type="submit"
            className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Publicando...' : 'Publicar Producto'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

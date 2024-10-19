// 'use client'

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { API_URL } from "@/api/api"


// export default function SellerPage() {
//   const [address, setAddress] = useState<string>('');
//   const [storeName, setStoreName] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter(); // useRouter hook for redirection

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSuccessMessage(null); // Clear previous messages
//     setErrorMessage(null);

//     // Get the access token from localStorage
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       setErrorMessage('No estás autorizado. Por favor inicia sesión.');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/seller/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
//         },
//         body: JSON.stringify({
//           address: address,
//           store_name: storeName,
//           description: description,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Save the submitted data in localStorage
//         localStorage.setItem('sellerAddress', address);
//         localStorage.setItem('sellerStoreName', storeName);
//         localStorage.setItem('sellerDescription', description);

//         // Set the 'isSeller' status in localStorage to 'true'
//         localStorage.setItem('isSeller', JSON.stringify(true)); 


//         // Display success message or handle success
//         setSuccessMessage('¡Felicidades! Te has convertido en vendedor exitosamente.');

//         // Redirect to the profile page after success
//         setTimeout(() => {
//           router.push('/profile'); // Redirect to profile page
//         }, 200); // Optional delay to show success message
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Ocurrió un error. Inténtalo nuevamente.');
//       }
//     } catch (error) {
//       setErrorMessage('Ocurrió un error. Inténtalo nuevamente.');
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="flex-grow container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-6">Convertirme en Vendedor</h1>

//         <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
//           <div>
//             <label htmlFor="address" className="block text-lg font-medium mb-2">
//               Dirección
//             </label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="storeName" className="block text-lg font-medium mb-2">
//               Nombre de la Tienda
//             </label>
//             <input
//               type="text"
//               id="storeName"
//               value={storeName}
//               onChange={(e) => setStoreName(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-lg font-medium mb-2">
//               Descripción
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 rounded bg-gray-700 text-white"
//               rows={4}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Enviar
//           </button>

//           {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//           {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//         </form>
//       </main>

//       <Footer />
//     </div>
//   );
// }
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from "@/api/api"

export default function SellerPage() {
  const [address, setAddress] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mpMail, setMpMail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); // useRouter hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null); // Clear previous messages
    setErrorMessage(null);

    // Get the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setErrorMessage('No estás autorizado. Por favor inicia sesión.');
      return;
    }

    try {
      // Create FormData object to hold the form data including the image file
      const formData = new FormData();
      formData.append('address', address);
      formData.append('store_name', storeName);
      formData.append('description', description);
      formData.append('mp_mail', mpMail);
      
      if (profilePicture) {
        formData.append('profile_picture_file', profilePicture);
      }

      const response = await fetch(`${API_URL}/seller/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Save the submitted data in localStorage
        localStorage.setItem('sellerAddress', address);
        localStorage.setItem('sellerStoreName', storeName);
        localStorage.setItem('sellerDescription', description);
        localStorage.setItem('sellerMpMail', mpMail);
        if (profilePicture) {
          localStorage.setItem('profile_picture_file', profilePicture.name); // Save file name or appropriate reference
        }

        // Set the 'isSeller' status in localStorage to 'true'
        localStorage.setItem('isSeller', JSON.stringify(true)); 

        // Display success message or handle success
        setSuccessMessage('¡Felicidades! Te has convertido en vendedor exitosamente.');

        // Redirect to the profile page after success
        setTimeout(() => {
          router.push('/profile'); // Redirect to profile page
        }, 200); // Optional delay to show success message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Ocurrió un error. Inténtalo nuevamente.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Convertirme en Vendedor</h1>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <label htmlFor="address" className="block text-lg font-medium mb-2">
              Dirección
            </label>
            <input
              name="address"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="storeName" className="block text-lg font-medium mb-2">
              Nombre de la Tienda
            </label>
            <input
              name="storeName"
              type="text"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="mpMail" className="block text-lg font-medium mb-2">
              Correo de Mercado Pago
            </label>
            <input
              name="email"
              type="email"
              id="mpMail"
              value={mpMail}
              onChange={(e) => setMpMail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="profilePicture" className="block text-lg font-medium mb-2">
              Foto de Perfil
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setProfilePicture(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>

          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}

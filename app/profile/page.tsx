'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false); // Track if user is a seller
  const [sellerAddress, setSellerAddress] = useState<string | null>(null);
  const [sellerStoreName, setSellerStoreName] = useState<string | null>(null);
  const [sellerDescription, setSellerDescription] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user data and seller data from localStorage when the component mounts
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setEmail(localStorage.getItem('email'));

    // Get the seller status from localStorage
    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false'); // Defaults to 'false' if not set
    setIsSeller(sellerStatus);

    // Fetch seller-specific data if the user is a seller
    if (sellerStatus) {
      setSellerAddress(localStorage.getItem('sellerAddress'));
      setSellerStoreName(localStorage.getItem('sellerStoreName'));
      setSellerDescription(localStorage.getItem('sellerDescription'));
    }
  }, []);

  // Handle the button click to redirect to the "start selling" page
  const handleStartSelling = () => {
    router.push('/register_seller'); // Redirect to the start selling page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Perfil de Usuario</h1>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
            <p className="mb-2">
              <strong>Username:</strong> {username || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>First Name:</strong> {firstName || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {lastName || 'N/A'}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {email || 'N/A'}
            </p>

            {/* Conditionally render the "Empezar a vender" button if the user is not a seller */}
            {!isSeller && (
              <button
                onClick={handleStartSelling}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Empezar a vender
              </button>
            )}
          </div>
        </section>

        {/* Conditionally render seller data below the user info if the user is a seller */}
        {isSeller && (
          <section className="mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Información de vendedor</h2>
            <p className="mb-2">
            <strong>Dirección:</strong> {sellerAddress || 'N/A'}
            </p>
            <p className="mb-2">
            <strong>Nombre de la Tienda:</strong> {sellerStoreName || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Descripción:</strong> {sellerDescription || 'N/A'}
            </p>
         
          </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// 'use client'

// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { useRouter } from 'next/navigation';

// export default function ProfilePage() {
//   const [username, setUsername] = useState<string | null>(null);
//   const [firstName, setFirstName] = useState<string | null>(null);
//   const [lastName, setLastName] = useState<string | null>(null);
//   const [email, setEmail] = useState<string | null>(null);
//   const [isSeller, setIsSeller] = useState<boolean>(false);
//   const [sellerAddress, setSellerAddress] = useState<string | null>(null);
//   const [sellerStoreName, setSellerStoreName] = useState<string | null>(null);
//   const [sellerDescription, setSellerDescription] = useState<string | null>(null);
//   const router = useRouter();

//   // Fetch user data and seller data from localStorage when the component mounts
//   useEffect(() => {
//     setUsername(localStorage.getItem('username'));
//     setFirstName(localStorage.getItem('firstName'));
//     setLastName(localStorage.getItem('lastName'));
//     setEmail(localStorage.getItem('email'));

//     const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false');
//     setIsSeller(sellerStatus);

//     if (sellerStatus) {
//       setSellerAddress(localStorage.getItem('sellerAddress'));
//       setSellerStoreName(localStorage.getItem('sellerStoreName'));
//       setSellerDescription(localStorage.getItem('sellerDescription'));
//     }
//   }, []);

//   // Handle the button click to redirect to the "start selling" page
//   const handleStartSelling = () => {
//     router.push('/register_seller');
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       {/* Main content area */}
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <h1 className="text-4xl font-bold mb-6">Perfil de Usuario</h1>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
//             <p className="mb-2">
//               <strong>Username:</strong> {username || 'N/A'}
//             </p>
//             <p className="mb-2">
//               <strong>First Name:</strong> {firstName || 'N/A'}
//             </p>
//             <p className="mb-2">
//               <strong>Last Name:</strong> {lastName || 'N/A'}
//             </p>
//             <p className="mb-4">
//               <strong>Email:</strong> {email || 'N/A'}
//             </p>
//             {isSeller && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4">Información del Vendedor</h2>
//               <p className="mb-2">
//                 <strong>Dirección:</strong> {sellerAddress || 'N/A'}
//               </p>
//               <p className="mb-2">
//                 <strong>Nombre de la Tienda:</strong> {sellerStoreName || 'N/A'}
//               </p>
//               <p className="mb-4">
//                 <strong>Descripción:</strong> {sellerDescription || 'N/A'}
//               </p>
//             </div>
//            )}
//             {!isSeller && (
//               <button
//                 onClick={handleStartSelling}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Empezar a vender
//               </button>
//             )}
//           </div>
//         </section>

//         {/* Conditionally render seller data if the user is a seller */}
       
//       </main>

//       <Footer />
//     </div>
//   );
// }

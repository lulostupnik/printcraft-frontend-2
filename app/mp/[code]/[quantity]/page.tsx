// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useRouter, useParams } from 'next/navigation';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import MercadoPagoComponent from '@/components/MercadoPagoComponent';

// // export default function PaymentPage() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [preferenceId, setPreferenceId] = useState(null);
// //   const router = useRouter();
// //   const params = useParams(); // Get the params from the URL
// //   const { code } = params; // Extract 'code' from params

// //   // Check if tokens exist in localStorage to determine login status
// //   useEffect(() => {
// //     const accessToken = localStorage.getItem('accessToken');
// //     if (accessToken) {
// //       setIsLoggedIn(true);
// //     } else {
// //       setIsLoggedIn(false);
// //     }
// //     setLoading(false);
// //   }, []);

// //   // Redirect if the user is not logged in
// //   useEffect(() => {
// //     if (!loading && !isLoggedIn) {
// //       router.push('/login');
// //     }
// //   }, [loading, isLoggedIn, router]);

// //   // Function to get preference_id from backend view
// //   useEffect(() => {
// //     if (isLoggedIn && code) {
// //       const fetchPreferenceId = async () => {
// //         try {
// //           const accessToken = localStorage.getItem('accessToken');

// //           const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/payment/', {
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json',
// //               'Authorization': `Bearer ${accessToken}`, // Send the access token in the Authorization header
// //             },
// //             body: JSON.stringify({
// //               product_id: code, // Use the code from the URL params
// //               quantity: 1, // Set the quantity as required
// //               //transaction_amount: 100.0, // Set the transaction amount as required
// //               //email: 'TESTUSER1767510206', // Set the client's email as required
// //             }),
// //           });

// //           if (!response.ok) {
// //             throw new Error('Failed to fetch preference_id');
// //           }

// //           const data = await response.json();
// //           setPreferenceId(data.id);
// //         } catch (error) {
// //           console.error('Error fetching preference_id:', error);
// //         }
// //       };

// //       fetchPreferenceId();
// //     }
// //   }, [isLoggedIn, code]);

// //   if (loading) {
// //     // Show a loading indicator while determining if the user is logged in
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
// //         <p>Loading...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
// //       <Header />

// //       <main className="container mx-auto px-4 py-8 flex-grow">
// //         <section className="relative mb-12 bg-gray-800">
// //           <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8 p-8">
// //             <div className="w-1/2 space-y-4 text-center">
// //               <h2 className="text-4xl font-bold mb-4">Completa tu pago</h2>
// //               <h3 className="mb-4">
// //                 Usa el formulario de pago a continuación para completar tu transacción con Mercado Pago.
// //               </h3>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Payment Form Section */}
// //         <section className="relative mb-12">
// //           <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg overflow-hidden p-8">
// //             {preferenceId ? (
// //               <MercadoPagoComponent preferenceId={preferenceId} />
// //             ) : (
// //               <p>Loading payment information...</p>
// //             )}
// //           </div>
// //         </section>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import MercadoPagoComponent from '@/components/MercadoPagoComponent';

// export default function PaymentPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [preferenceId, setPreferenceId] = useState(null);
//   const router = useRouter();
//   const params = useParams(); // Get the params from the URL
//   const { code, quantity } = params; // Extract 'code' and 'quantity' from params

//   // Convert 'code' and 'quantity' to appropriate types
//   const productId = parseInt(code, 10); // Convert code to an integer
//   const productQuantity = parseInt(quantity, 10); // Convert quantity to an integer

//   // Check if tokens exist in localStorage to determine login status
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//     setLoading(false);
//   }, []);

//   // Redirect if the user is not logged in
//   useEffect(() => {
//     if (!loading && !isLoggedIn) {
//       router.push('/login');
//     }
//   }, [loading, isLoggedIn, router]);

//   // Function to get preference_id from backend view
//   useEffect(() => {
//     if (isLoggedIn && !isNaN(productId) && !isNaN(productQuantity)) {
//       const fetchPreferenceId = async () => {
//         try {
//           const accessToken = localStorage.getItem('accessToken');

//           const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/payment/', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`, // Send the access token in the Authorization header
//             },
//             body: JSON.stringify({
//               product_id: productId, // Use the code from the URL params
//               quantity: productQuantity, // Use the quantity from the URL params
//               //transaction_amount: 100.0, // Set the transaction amount as required
//               //email: 'TESTUSER1767510206', // Set the client's email as required
//             }),
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch preference_id');
//           }

//           const data = await response.json();
//           setPreferenceId(data.id);
//         } catch (error) {
//           console.error('Error fetching preference_id:', error);
//         }
//       };

//       fetchPreferenceId();
//     }
//   }, [isLoggedIn, productId, productQuantity]);

//   if (loading) {
//     // Show a loading indicator while determining if the user is logged in
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />

//       <main className="container mx-auto px-4 py-8 flex-grow">
//         <section className="relative mb-12 bg-gray-800">
//           <div className="flex items-center justify-between bg-gray-800 rounded-lg overflow-hidden pl-8 p-8">
//             <div className="w-1/2 space-y-4 text-center">
//               <h2 className="text-4xl font-bold mb-4">Completa tu pago</h2>
//               <h3 className="mb-4">
//                 Usa el formulario de pago a continuación para completar tu transacción con Mercado Pago.
//               </h3>
//             </div>
//           </div>
//         </section>

//         {/* Payment Form Section */}
//         <section className="relative mb-12">
//           <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg overflow-hidden p-8">
//             {preferenceId ? (
//               <MercadoPagoComponent preferenceId={preferenceId} />
//             ) : (
//               <p>Loading payment information...</p>
//             )}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MercadoPagoComponent from '@/components/MercadoPagoComponent';
import { API_URL } from '@/api/api';

export default function PaymentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);
  const router = useRouter();
  const params = useParams(); // Get the params from the URL
  const { code, quantity } = params; // Extract 'code' and 'quantity' from params

  // Check if tokens exist in localStorage to determine login status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  // Redirect if the user is not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [loading, isLoggedIn, router]);

  // Function to get preference_id from backend view
  useEffect(() => {
    if (isLoggedIn && code && quantity) {
      const fetchPreferenceId = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');

          const response = await fetch(`${API_URL}/payment/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Send the access token in the Authorization header
            },
            body: JSON.stringify({
              product_id: code, // Use the code from the URL params as a string
              quantity: quantity, // Use the quantity from the URL params as a string
              //email: 'test@gmail.com'
              //transaction_amount: 100.0, // Set the transaction amount as required
              //email: 'TESTUSER1767510206', // Set the client's email as required
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch preference_id');
          }

          const data = await response.json();
          setPreferenceId(data.preference_id);
        } catch (error) {
          console.error('Error fetching preference_id:', error);
        }
      };

      fetchPreferenceId();
    }
  }, [isLoggedIn, code, quantity]);

  if (loading) {
    // Show a loading indicator while determining if the user is logged in
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="relative mb-12 bg-gray-800 flex items-center justify-center min-h-[300px]">
          <div className="w-full max-w-xl text-center space-y-4">
            <h2 className="text-4xl font-bold mb-4">Completa tu pago</h2>
            <h3 className="mb-4">
              Usa el formulario de pago a continuación para completar tu transacción con Mercado Pago.
            </h3>
          </div>
        </section>


        {/* Payment Form Section */}
        <section className="relative mb-12">
          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg overflow-hidden p-8">
            {preferenceId ? (
              <MercadoPagoComponent preferenceId={preferenceId} />
            ) : (
              <p>Loading payment information...</p>
              
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

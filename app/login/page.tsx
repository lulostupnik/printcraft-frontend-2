'use client'

import { API_URL } from "@/api/api";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';
// Type definition for AuthPageProps, redirectTo is optional
// interface AuthPageProps {
//   redirectTo?: string; // Optional prop for redirection to a specific page
// }

// AuthPage component with optional redirectTo prop
export default function AuthPage(/*{ redirectTo }: AuthPageProps*/) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter(); // useRouter hook for redirection

  // Function to fetch user data and save it in localStorage
  const fetchUserData = async (accessToken: string) => {
    try {
      const userResponse = await fetch(`${API_URL}/user/data/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();

        // Save user data in localStorage
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('firstName', userData.first_name);
        localStorage.setItem('lastName', userData.last_name);
        localStorage.setItem('email', userData.email);

        const sellerStatus = userData.is_seller; // Assuming API sends `is_seller` field
        localStorage.setItem('isSeller', JSON.stringify(sellerStatus));

        // Handle redirection based on the optional `redirectTo` prop or user role
        setTimeout(() => {
         if (userData.is_seller) {
            router.push('/seller_landing'); // Redirect sellers to the seller page
          } else {
            router.push('/'); // Default to home page
          }
        }, 200); // Optional delay of 2 seconds to show success message
      } else {
        const errorData = await userResponse.json();
        setError(errorData.message || 'Failed to fetch user data.');
      }
    } catch (userError) {
      setError('An error occurred while fetching user data. Please try again later.');
    }
  };

  // Handle form submission for login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the tokens in localStorage
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('accessToken', data.access);

        setSuccessMessage('Login successful!');

        // Fetch user data after successful login
        fetchUserData(data.access);
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Handle navigation to the register page
  const handleNavigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <SimpleHeader />

      <main className="container mx-auto mt-16 p-4 flex-grow">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8">Log in</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Log in
            </button>
          </form>

          {/* Add side-by-side text and button for registration */}
          <div className="mt-4 flex justify-center items-center space-x-2">
            <p className="text-gray-400">¿No tenes cuenta?</p>
            <button
              onClick={handleNavigateToRegister}
              className="text-blue-500 underline cursor-pointer"
            >
              Registrate
            </button>
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}

// interface AuthPageProps {
//   redirectTo?: string; // Optional prop for redirection to a specific page
// }

// export default function AuthPage({ redirectTo }: AuthPageProps) {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const router = useRouter(); // useRouter hook for redirection

//   // Function to fetch user data and save it in localStorage
//   const fetchUserData = async (accessToken: string) => {
//     try {
//       const userResponse = await fetch(`${API_URL}/user/data/`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
//         },
//       });

//       if (userResponse.ok) {
//         const userData = await userResponse.json();

//         // Save user data in localStorage
//         localStorage.setItem('userId', userData.id);
//         localStorage.setItem('username', userData.username);
//         localStorage.setItem('firstName', userData.first_name);
//         localStorage.setItem('lastName', userData.last_name);
//         localStorage.setItem('email', userData.email);
        
//         const sellerStatus = userData.is_seller; // Assuming API sends `is_seller` field
//         localStorage.setItem('isSeller', JSON.stringify(sellerStatus));

//         // Handle redirection based on the optional `redirectTo` prop or user role
//         setTimeout(() => {
//           if (redirectTo) {
//             router.push(redirectTo); // If the redirectTo prop is passed, redirect to that page
//           } else if (userData.is_seller) {
//             router.push('/seller_landing'); // If the user is a seller, redirect to the seller page
//           } else {
//             router.push('/'); // Otherwise, redirect to the home page
//           }
//         }, 200); // Optional delay of 2 seconds to show success message
//       } else {
//         const errorData = await userResponse.json();
//         setError(errorData.message || 'Failed to fetch user data.');
//       }
//     } catch (userError) {
//       setError('An error occurred while fetching user data. Please try again later.');
//     }
//   };

//   // Handle form submission for login
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch(`${API_URL}/token/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Save the tokens in localStorage
//         localStorage.setItem('refreshToken', data.refresh);
//         localStorage.setItem('accessToken', data.access);

//         setSuccessMessage('Login successful!');

//         // Fetch user data after successful login
//         fetchUserData(data.access);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   // Handle navigation to the register page
//   const handleNavigateToRegister = () => {
//     router.push('/register');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//       <SimpleHeader />

//       <main className="container mx-auto mt-16 p-4 flex-grow">
//         <div className="max-w-md mx-auto">
//           <h1 className="text-4xl font-bold mb-8">Log in</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="username"
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             {error && <p className="text-red-500">{error}</p>}
//             {successMessage && <p className="text-green-500">{successMessage}</p>}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Log in
//             </button>
//           </form>

//           {/* Add side-by-side text and button for registration */}
//           <div className="mt-4 flex justify-center items-center space-x-2">
//             <p className="text-gray-400">¿No tenes cuenta?</p>
//             <button
//               onClick={handleNavigateToRegister}
//               className="text-blue-500 underline cursor-pointer"
//             >
//               Registrate
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer className="mt-auto" />
//     </div>
//   );
// }

// 'use client'

// import { API_URL } from "@/api/api"
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SimpleHeader from '@/components/SimpleHeader';
// import Footer from '@/components/Footer';

// export default function AuthPage() {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const router = useRouter(); // useRouter hook for redirection

//   // Function to fetch user data and save it in localStorage
//   const fetchUserData = async (accessToken: string) => {
//     try {
//       const userResponse = await fetch(`${API_URL}/user/data/`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
//         },
//       });

//       if (userResponse.ok) {
//         const userData = await userResponse.json();

//         // Save user data in localStorage
//         localStorage.setItem('userId', userData.id);
//         localStorage.setItem('username', userData.username);
//         localStorage.setItem('firstName', userData.first_name);
//         localStorage.setItem('lastName', userData.last_name);
//         localStorage.setItem('email', userData.email);
        
//         const sellerStatus = userData.is_seller; // Assuming API sends `is_seller` field
//         localStorage.setItem('isSeller', JSON.stringify(sellerStatus));

//         // Redirect to the main page after a successful login and fetching user data
//         setTimeout(() => {
//           if(userData.is_seller){
//             router.push('/seller_landing');
//           } else {
//             router.push('/');
//           }
//         }, 200); // Optional delay of 2 seconds to show success message
//       } else {
//         const errorData = await userResponse.json();
//         setError(errorData.message || 'Failed to fetch user data.');
//       }
//     } catch (userError) {
//       setError('An error occurred while fetching user data. Please try again later.');
//     }
//   };

//   // Handle form submission for login
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch(`${API_URL}/token/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Save the tokens in localStorage
//         localStorage.setItem('refreshToken', data.refresh);
//         localStorage.setItem('accessToken', data.access);

//         setSuccessMessage('Login successful!');

//         // Fetch user data after successful login
//         fetchUserData(data.access);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   // Handle navigation to the register page
//   const handleNavigateToRegister = () => {
//     router.push('/register');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//       <SimpleHeader />

//       <main className="container mx-auto mt-16 p-4 flex-grow">
//         <div className="max-w-md mx-auto">
//           <h1 className="text-4xl font-bold mb-8">Log in</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             {error && <p className="text-red-500">{error}</p>}
//             {successMessage && <p className="text-green-500">{successMessage}</p>}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Log in
//             </button>
//           </form>

//           {/* Add side-by-side text and button for registration */}
//           <div className="mt-4 flex justify-center items-center space-x-2">
//             <p className="text-gray-400">¿No tenes cuenta?</p>
//             <button
//               onClick={handleNavigateToRegister}
//               className="text-blue-500 underline cursor-pointer"
//             >
//               Registrate
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer className="mt-auto" />
//     </div>
//   );
// }

// // 'use client'

// // import { API_URL } from "@/api/api"

// // import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import SimpleHeader from '@/components/SimpleHeader';
// // import Footer from '@/components/Footer';

// // export default function AuthPage() {
// //   const [username, setUsername] = useState<string>('');
// //   const [password, setPassword] = useState<string>('');
// //   const [error, setError] = useState<string>('');
// //   const [successMessage, setSuccessMessage] = useState<string>('');
// //   const router = useRouter(); // useRouter hook for redirection

// //   // Function to fetch user data and save it in localStorage
// //   const fetchUserData = async (accessToken: string) => {
// //     try {
// //       const userResponse = await fetch(`${API_URL}/user/data/`, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
// //         },
// //       });

// //       if (userResponse.ok) {
// //         const userData = await userResponse.json();

// //         // Save user data in localStorage
// //         localStorage.setItem('userId', userData.id);
// //         localStorage.setItem('username', userData.username);
// //         localStorage.setItem('firstName', userData.first_name);
// //         localStorage.setItem('lastName', userData.last_name);
// //         localStorage.setItem('email', userData.email);
        
// //         const sellerStatus = userData.is_seller; // Assuming API sends `is_seller` field
// //         localStorage.setItem('isSeller', JSON.stringify(sellerStatus));

// //         // Redirect to the main page after a successful login and fetching user data
// //         setTimeout(() => {
// //           if(userData.is_seller){
// //             router.push('/seller_landing');
// //           } else {
// //             router.push('/');
// //           }
// //         }, 200); // Optional delay of 2 seconds to show success message
// //       } else {
// //         const errorData = await userResponse.json();
// //         setError(errorData.message || 'Failed to fetch user data.');
// //       }
// //     } catch (userError) {
// //       setError('An error occurred while fetching user data. Please try again later.');
// //     }
// //   };

// //   // Handle form submission for login
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccessMessage('');

// //     try {
// //       const response = await fetch(`${API_URL}/token/`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           username: username,
// //           password: password,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         // Save the tokens in localStorage
// //         localStorage.setItem('refreshToken', data.refresh);
// //         localStorage.setItem('accessToken', data.access);

// //         setSuccessMessage('Login successful!');

// //         // Fetch user data after successful login
// //         fetchUserData(data.access);
// //       } else {
// //         const data = await response.json();
// //         setError(data.message || 'Login failed. Please try again.');
// //       }
// //     } catch (err) {
// //       setError('An error occurred. Please try again later.');
// //     }
// //   };

// //   // Handle navigation to the register page
// //   const handleNavigateToRegister = () => {
// //     router.push('/register');
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
// //       <SimpleHeader />

// //       <main className="container mx-auto mt-16 p-4 flex-grow">
// //         <div className="max-w-md mx-auto">
// //           <h1 className="text-4xl font-bold mb-8">Log in</h1>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <input
// //               type="text"
// //               placeholder="Username"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
// //               required
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
// //               required
// //             />
// //             {error && <p className="text-red-500">{error}</p>}
// //             {successMessage && <p className="text-green-500">{successMessage}</p>}
// //             <button
// //               type="submit"
// //               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
// //             >
// //               Log in
// //             </button>
// //           </form>

// //           {/* Add a button for registration */}
// //           <div className="mt-4 text-center">
// //             <p className="text-gray-400">No tiene cuenta?</p>
// //             <button
// //               onClick={handleNavigateToRegister}
// //               className="text-blue-500 underline cursor-pointer"
// //             >
// //               Registrate
// //             </button>
// //           </div>
// //         </div>
// //       </main>

// //       <Footer className="mt-auto" />
// //     </div>
// //   );
// // }

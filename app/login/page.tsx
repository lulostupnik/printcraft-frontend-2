// 'use client'

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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/token/', {
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

//         // Redirect to the main page after a successful login
//         setTimeout(() => {
//           router.push('/'); // Redirect to the main page
//         }, 2000); // Optional delay of 2 seconds to show success message
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//     }
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
//         </div>
//       </main>

//       <Footer className="mt-auto" />
//     </div>
//   );
// }


'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';

export default function AuthPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter(); // useRouter hook for redirection

  // Function to fetch user data and save it in localStorage
  const fetchUserData = async (accessToken: string) => {
    try {
      const userResponse = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/user/data/', {
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
        
        // Redirect to the main page after a successful login and fetching user data
        setTimeout(() => {
          router.push('/'); // Redirect to the main page
        }, 2000); // Optional delay of 2 seconds to show success message
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
      const response = await fetch('https://794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev/printcraft/backend/v1.0/api/token/', {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <SimpleHeader />

      <main className="container mx-auto mt-16 p-4 flex-grow">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8">Log in</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
              required
            />
            <input
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
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}

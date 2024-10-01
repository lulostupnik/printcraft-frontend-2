'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';
import { API_URL } from "@/api/api"


export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          first_name: name,
          last_name: surname,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 200);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed. Please try again.');
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
          <h1 className="text-4xl font-bold mb-8">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">First Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="surname" className="block text-sm font-medium">Surname</label>
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Register
            </button>
          </form>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}

// 'use client'
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import SimpleHeader from '@/components/SimpleHeader';
// import Footer from '@/components/Footer';

// export default function RegisterPage() {
//   const [name, setName] = useState<string>('');
//   const [surname, setSurname] = useState<string>('');
//   const [username, setusername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
//       setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
//       return;
//     }

//     try {
//       const response = await fetch('${API_URL}/user/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           first_name: name,
//           last_name: surname,
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Registration successful! Redirecting to login...');
//         setTimeout(() => {
//           router.push('/login');
//         }, 2000);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Registration failed. Please try again.');
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
//           <h1 className="text-4xl font-bold mb-8">Register</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="name" className="block text-sm font-medium">First Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="surname" className="block text-sm font-medium">Surname</label>
//               <input
//                 id="surname"
//                 type="text"
//                 value={surname}
//                 onChange={(e) => setSurname(e.target.value)}
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="username" className="block text-sm font-medium">Email</label>
//               <input
//                 id="username"
//                 type="username"
//                 value={username}
//                 onChange={(e) => setusername(e.target.value)}
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-sm font-medium">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500">{error}</p>}
//             {successMessage && <p className="text-green-500">{successMessage}</p>}
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
//               Register
//             </button>
//           </form>
//         </div>
//       </main>

//       <Footer className="mt-auto" />
//     </div>
//   );
// }

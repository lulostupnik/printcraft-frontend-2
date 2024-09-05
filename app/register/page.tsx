// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import SimpleHeader from '@/components/SimpleHeader'
// import Footer from '@/components/Footer'

// export default function RegisterPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')

//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }

//     if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
//       setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers')
//       return
//     }

//     // Handle registration logic here
//     console.log('Registration submitted')
//     // Redirect to login page after successful registration
//     router.push('/login')
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <SimpleHeader/>

//       <main className="container mx-auto mt-16 p-4">
//         <div className="max-w-md mx-auto">
//           <h1 className="text-4xl font-bold mb-8">Register</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-sm font-medium">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
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
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
//               Register
//             </button>
//           </form>
//         </div>
//       </main>
//       <Footer className='mt-auto'/>
//     </div>
//   )
// }
'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
      return;
    }

    // Handle registration logic here
    console.log('Registration submitted');
    // Redirect to login page after successful registration
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <SimpleHeader />

      {/* Make the main content flex-grow to fill the remaining space */}
      <main className="container mx-auto mt-16 p-4 flex-grow">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Register
            </button>
          </form>
        </div>
      </main>

      {/* Move Footer outside of main and keep it at the bottom */}
      <Footer className='mt-auto' />
    </div>
  );
}

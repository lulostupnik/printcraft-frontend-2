// "use client"

// import React, { useState } from 'react';
// import Image from 'next/image';
// import SimpleHeader from '@/components/SimpleHeader';
// import Footer from '@/components/Footer';
// // import { useRouter } from 'next/router';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   //const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form submitted');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <SimpleHeader/>

//       <main className="container mx-auto mt-16 p-4">
//         <div className="max-w-md mx-auto">
//           <h1 className="text-4xl font-bold mb-8">
//             {isLogin ? 'Log in' : 'Register'}
//           </h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//               required
//             />
//             {!isLogin && (
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
//                 required
//               />
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               {isLogin ? 'Log in' : 'Register'}
//             </button>
//           </form>
//         </div>

//         <Footer className="mt-auto"/>
   
//       </main>
//     </div>
//   );
// }

'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <SimpleHeader />

      {/* Make the main content flex-grow to fill the remaining space */}
      <main className="container mx-auto mt-16 p-4 flex-grow">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            {isLogin ? 'Log in' : 'Register'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {isLogin ? 'Log in' : 'Register'}
            </button>
          </form>
        </div>
      </main>

      {/* Move Footer outside of main and keep it at the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
}

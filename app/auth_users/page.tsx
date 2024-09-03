"use client"

import React, { useState } from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/router';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  //const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4">
        <Image src="/printcraft.png" alt="Logo" width={40} height={40} />
        <div>
          <input
            type="text"
            placeholder="Buscador de productos, dise..."
            className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2"
          />
          <button
            onClick={() => setIsLogin(true)}
            className="bg-transparent hover:bg-gray-800 px-4 py-2 rounded-md"
          >
            Log in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="bg-transparent hover:bg-gray-800 px-4 py-2 rounded-md"
          >
            Register
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-16 p-4">
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
    </div>
  );
}
'use client'

import { API_URL } from "@/api/api";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '@/components/SimpleHeader';
import Footer from '@/components/Footer';

export default function AuthPage(/*{ redirectTo }: AuthPageProps*/) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter(); // useRouter hook for redirection
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
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

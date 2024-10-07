import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, User } from 'lucide-react';

export default function HeaderForSeller() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null); // State for user's first name

  // Check if tokens exist in localStorage to determine login status and fetch firstName
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedFirstName = localStorage.getItem('firstName');
    
    if (accessToken) {
      setIsLoggedIn(true); // User is logged in
      setFirstName(storedFirstName); // Set the first name if available
    } else {
      setIsLoggedIn(false); // User is not logged in
      setFirstName(null); // Clear the first name if logged out
    }
  }, []);

  const handleLogout = () => {
    // Clear tokens and reload the page to reflect the logged-out state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');      // Remove user id
    localStorage.removeItem('username');    // Remove username
    localStorage.removeItem('firstName');   // Remove first name
    localStorage.removeItem('lastName');    // Remove last name
    localStorage.removeItem('email');       // Remove email
  
    // Redirect to home page to reflect the logged-out state
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <header className="flex items-center p-4 bg-gray-800">
      <a href="/">
        <div className="flex items-center">
          <Image src="/Printcraft.png" alt="Printcraft logo" width={70} height={70} className="mr-2" />
        </div>
      </a>

      <div className="flex flex-grow justify-center">
        <a href="../../">
            <button className="bg-white text-black py-1 px-5 rounded-full font-bold text-lg">Comprar</button>
        </a>

      </div>

      <div className="flex-shrink-0 flex items-center">
        {isLoggedIn ? (
          <>
            {/* Show welcome message and user profile if logged in */}
            <span className="text-white mr-4">Bienvenido {firstName}</span>
            <a href="/profile" className="mr-4">
              <User className="text-gray-400" size={32} />
            </a>
            <button className="bg-gray-700 py-1 px-3 rounded" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show login and register buttons if not logged in */}
            <a href="/login">
              <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
            </a>
            <a href="/register">
              <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
            </a>
          </>
        )}
      </div>
    </header>
  );
}

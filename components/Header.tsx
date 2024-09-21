import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, User } from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if tokens exist in localStorage to determine login status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    // Clear tokens and reload the page to reflect the logged-out state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Buscador de productos, diseñadores..."
            className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 text-lg"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center">
        {isLoggedIn ? (
          <>
            {/* Show user profile and logout button if logged in */}
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

// import Image from 'next/image'
// import { Search } from 'lucide-react'

// export default function Header() {
//     return (
//         <header className="flex items-center p-4 bg-gray-800">
//               <a href="/">
//                  <div className="flex items-center">
//                      <Image src="/Printcraft.png" alt="Printcraft logo" width={70} height={70} className="mr-2" />
//                  </div>
//              </a>
            
//             <div className="flex flex-grow justify-center">
//                 <div className="relative w-full max-w-lg">
//                     <input
//                         type="text"
//                         placeholder="Buscador de productos, diseñadores..."
//                         className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 text-lg"
//                     />
//                     <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                 </div>
//             </div>

//             <div className="flex-shrink-0">
//                 <a href="../login">
//                     <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
//                 </a>
//                 <a href="../register">
//                     <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
//                 </a>
//             </div>
//         </header>
//     )
// }

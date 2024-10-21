// /*import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Search, User } from 'lucide-react';

// export default function Header() {
//   const [isLoading, setIsLoading] = useState(true); // New loading state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [firstName, setFirstName] = useState<string | null>(null); // State for user's first name

//   // Check if tokens exist in localStorage to determine login status and fetch firstName
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const storedFirstName = localStorage.getItem('firstName');
    
//     if (accessToken) {
//       setIsLoggedIn(true); // User is logged in
//       setFirstName(storedFirstName); // Set the first name if available
//     } else {
//       setIsLoggedIn(false); // User is not logged in
//       setFirstName(null); // Clear the first name if logged out
//     }

//     setIsLoading(false); // Set loading to false after checking
//   }, []);

//   const handleLogout = () => {
//     // Clear tokens and reload the page to reflect the logged-out state
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userId');      // Remove user id
//     localStorage.removeItem('username');    // Remove username
//     localStorage.removeItem('firstName');   // Remove first name
//     localStorage.removeItem('lastName');    // Remove last name
//     localStorage.removeItem('email');       // Remove email
  
//     // Redirect to home page to reflect the logged-out state
//     window.location.href = '/'; // Redirect to home page
//   };

//   return (
//     <header className="flex items-center p-4 bg-gray-800">
//       <a href="/">
//         <div className="flex items-center">
//           <Image src="/3DCAPYBARALOGOWHITE.png" alt="3dCapybara logo" width={80} height={80} className="mr-2" />
//         </div>
//       </a>

//       <div className="flex flex-grow justify-center">
//       </div>

//       <div className="flex-shrink-0 flex items-center">
//         {!isLoading && (
//           isLoggedIn ? (
//             <>
//               <span className="text-white mr-4">Bienvenido {firstName}</span>
//               <a type="profile" href="/profile" className="mr-4">
//                 <User className="text-gray-400" size={32} />
//               </a>
//               <button className="bg-gray-700 py-1 px-3 rounded" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <a href="/login">
//                 <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
//               </a>
//               <a href="/register">
//                 <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
//               </a>
//             </>
//           )
//         )}
//       </div>
//     </header>
//   );
// }*/


// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { User } from 'lucide-react';

// export default function Header() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [firstName, setFirstName] = useState<string | null>(null);
//   const [profilePicture, setProfilePicture] = useState<string | null>(null); // Profile picture state
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<number | null>(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const storedFirstName = localStorage.getItem('firstName');
//     const storedProfilePicture = localStorage.getItem('profilePicture'); // Retrieve profile picture from localStorage

//     if (accessToken) {
//       setIsLoggedIn(true);
//       setFirstName(storedFirstName);
//       setProfilePicture(storedProfilePicture); // Set profile picture if available
//     } else {
//       setIsLoggedIn(false);
//       setFirstName(null);
//       setProfilePicture(null); // Clear profile picture if not logged in
//     }

//     setIsLoading(false);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('username');
//     localStorage.removeItem('firstName');
//     localStorage.removeItem('lastName');
//     localStorage.removeItem('email');
//     localStorage.removeItem('profilePicture'); // Clear profile picture on logout
    
//     window.location.href = '/';
//   };

//   const showMenu = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     setMenuVisible(true);
//   };

//   const hideMenu = () => {
//     const id = setTimeout(() => {
//       setMenuVisible(false);
//     }, 300);
//     setTimeoutId(id as unknown as number); // Cast setTimeout result to 'number'
//   };

//   return (
//     <header className="flex items-center p-4 bg-gray-800">
//       <a href="/">
//         <div className="flex items-center">
//           <Image src="/3DCAPYBARALOGOWHITE.png" alt="3dCapybara logo" width={80} height={80} className="mr-2" />
//         </div>
//       </a>

//       <div className="flex flex-grow justify-center">
//       </div>

//       <div className="flex-shrink-0 flex items-center space-x-4">
//         {!isLoading && (
//           isLoggedIn ? (
//             <>
//               <span className="text-white">Bienvenido {firstName}</span>
//               <div
//                 className="relative cursor-pointer flex items-center"
//                 onMouseEnter={showMenu}
//                 onMouseLeave={hideMenu}>

//                 <a href="/profile" className="flex items-center">
//                   {profilePicture ? (
//                     <Image 
//                       src={profilePicture} 
//                       alt="Profile Picture" 
//                       width={32} 
//                       height={32} 
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <User className="text-gray-400" size={32} />
//                   )}
//                 </a>
//                 {menuVisible && (
//                   <div 
//                     className="absolute right-0 mt-4 w-48 bg-gray-700 rounded shadow-lg z-50" // Adjusted margin-top to mt-4
//                     onMouseEnter={showMenu}
//                     onMouseLeave={hideMenu}
//                   >
//                     <a href="/profile" className="block px-4 py-2 text-white hover:bg-gray-600">Tus datos</a>
//                     <a href="/mis_compras" className="block px-4 py-2 text-white hover:bg-gray-600">Tus compras</a>
//                     <button 
//                       className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
//                       onClick={handleLogout}
//                     >
//                       Cerrar sesión
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <a href="/login">
//                 <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
//               </a>
//               <a href="/register">
//                 <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
//               </a>
//             </>
//           )
//         )}
//       </div>
//     </header>
//   );
// }

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Profile picture state
  const [menuVisible, setMenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedFirstName = localStorage.getItem('firstName');
    const storedProfilePicture = localStorage.getItem('profilePicture'); // Retrieve profile picture from localStorage

    if (accessToken) {
      setIsLoggedIn(true);
      setFirstName(storedFirstName);
      setProfilePicture(storedProfilePicture); // Set profile picture if available
    } else {
      setIsLoggedIn(false);
      setFirstName(null);
      setProfilePicture(null); // Clear profile picture if not logged in
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('profilePicture'); // Clear profile picture on logout
    
    window.location.href = '/';
  };

  const showMenu = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setMenuVisible(true);
  };

  const hideMenu = () => {
    const id = setTimeout(() => {
      setMenuVisible(false);
    }, 300);
    setTimeoutId(id as unknown as number); // Cast setTimeout result to 'number'
  };

  return (
    <header className="flex items-center p-4 bg-gray-800">
      <a href="/">
        <div className="flex items-center">
          <Image src="/3DCAPYBARALOGOWHITE.png" alt="3dCapybara logo" width={80} height={80} className="mr-2" />
        </div>
      </a>

      <div className="flex flex-grow justify-center">
      </div>

      <div className="flex-shrink-0 flex items-center space-x-4">
        {!isLoading && (
          isLoggedIn ? (
            <>
              <span className="text-white">Bienvenido {firstName}</span>
              <div
                className="relative cursor-pointer flex items-center"
                onMouseEnter={showMenu}
                onMouseLeave={hideMenu}
              >
                <a href="/profile" className="flex items-center">
                  {profilePicture ? (
                    <Image 
                      src={profilePicture} 
                      alt="Profile Picture" 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  ) : (
                    <User className="text-gray-400" size={32} />
                  )}
                </a>
                {menuVisible && (
                  <div 
                    className="absolute right-0 w-48 bg-gray-700 rounded shadow-lg z-50"
                    style={{ top: '48px' }} // Set the top value to position the menu below the profile picture
                    onMouseEnter={showMenu}
                    onMouseLeave={hideMenu}
                  >
                    <a href="/profile" className="block px-4 py-2 text-white hover:bg-gray-600">Tus datos</a>
                    <a href="/mis_compras" className="block px-4 py-2 text-white hover:bg-gray-600">Tus compras</a>
                    <button 
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="/login">
                <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
              </a>
              <a href="/register">
                <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
              </a>
            </>
          )
        )}
      </div>
    </header>
  );
}

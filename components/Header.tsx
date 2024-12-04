// "use client";

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { User, ShoppingCart, Search, XCircle } from 'lucide-react';
// import { useRouter, usePathname } from 'next/navigation';

// interface HeaderProps {
//   showCart?: boolean;
//   showSearchBar?: boolean;
//   initialSearchTerm?: string;
// }

// export default function Header({
//   showCart = false,
//   showSearchBar = true,
//   initialSearchTerm = '',
// }: HeaderProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [firstName, setFirstName] = useState<string | null>(null);
//   const [profilePicture, setProfilePicture] = useState<string | null>(null);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<number | null>(null);

//   // Manage local search input state here
//   const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

//   useEffect(() => {
//     // Sync local search term if initialSearchTerm changes
//     setLocalSearchTerm(initialSearchTerm);
//   }, [initialSearchTerm]);

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const storedFirstName = localStorage.getItem('firstName');
//     const storedProfilePicture = localStorage.getItem('profilePicture');

//     if (accessToken) {
//       setIsLoggedIn(true);
//       setFirstName(storedFirstName);
//       setProfilePicture(storedProfilePicture);
//     } else {
//       setIsLoggedIn(false);
//       setFirstName(null);
//       setProfilePicture(null);
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
//     localStorage.removeItem('profilePicture');
//     localStorage.removeItem('isSeller');

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
//     setTimeoutId(id as unknown as number);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLocalSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     const term = localSearchTerm.trim();
//     if (term !== '') {
//       router.push(`/products_catalog?search=${encodeURIComponent(term)}`);
//     } else {
//       router.push('/products_catalog');
//     }
//   };

//   const handleClearSearch = () => {
//     setLocalSearchTerm('');
//     if (pathname === '/products_catalog') {
//       router.push('/products_catalog');
//     }
//   };


//   return (
//     <header className="flex items-center p-4 bg-gray-800">
//       <a href="/">
//         <div className="flex items-center">
//           <Image
//             src="/3DCAPYBARALOGOWHITE.png"
//             alt="3dCapybara logo"
//             width={80}
//             height={80}
//             className="mr-2"
//           />
//         </div>
//       </a>

//       <div className="flex flex-grow justify-center">
//         {showSearchBar && (
//           <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
//             <div className="relative flex-1 flex gap-3">
//               <input
//                 type="text"
//                 value={localSearchTerm}
//                 onChange={handleSearchChange}
//                 onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//                 placeholder="Buscar productos..."
//                 className="w-full px-6 py-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="px-5 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 aria-label="Buscar"
//               >
//                 <Search className="w-6 h-6" />
//               </button>
//               {localSearchTerm.trim() !== "" && (
//                 <button
//                   onClick={handleClearSearch}
//                   className="px-5 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                   aria-label="Limpiar"
//                 >
//                   <XCircle className="w-6 h-6" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex-shrink-0 flex items-center space-x-4">
//         {!isLoading && (
//           isLoggedIn ? (
//             <>
//               <span className="text-white">Bienvenido {firstName}</span>
//               {showCart && (
//                 <button
//                   onClick={() => router.push("/cart")}
//                   className="text-white hover:text-gray-300 transition-colors"
//                 >
//                   <ShoppingCart size={32} />
//                 </button>
//               )}
//               <div
//                 className="relative cursor-pointer flex items-center"
//                 onMouseEnter={showMenu}
//                 onMouseLeave={hideMenu}
//               >
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
//                     <User className="text-white" size={32} />
//                   )}
//                 </a>
//                 {menuVisible && (
//                   <div
//                     className="absolute right-0 w-48 bg-gray-700 rounded shadow-lg z-50"
//                     style={{ top: "48px" }}
//                     onMouseEnter={showMenu}
//                     onMouseLeave={hideMenu}
//                   >
//                     <a
//                       href="/profile"
//                       className="block px-4 py-2 text-white hover:bg-gray-600"
//                     >
//                       Tus datos
//                     </a>
//                     <a
//                       href="/mis_compras"
//                       className="block px-4 py-2 text-white hover:bg-gray-600"
//                     >
//                       Tus compras
//                     </a>
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
//                 <button className="bg-gray-700 py-1 px-3 rounded mr-2">
//                   Log in
//                 </button>
//               </a>
//               <a href="/register">
//                 <button className="bg-gray-700 py-1 px-3 rounded">
//                   Register
//                 </button>
//               </a>
//             </>
//           )
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, ShoppingCart, Search, XCircle } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface HeaderProps {
  showCart?: boolean;
  showSearchBar?: boolean;
  initialSearchTerm?: string;
}

export default function Header({
  showCart = false,
  showSearchBar = true,
  initialSearchTerm = "",
}: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  // Manage local search input state here
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  // Sync local search term with the search query in the URL
  useEffect(() => {
    const currentSearchTerm = searchParams.get("search") || "";
    setLocalSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedFirstName = localStorage.getItem("firstName");
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (accessToken) {
      setIsLoggedIn(true);
      setFirstName(storedFirstName);
      setProfilePicture(storedProfilePicture);
    } else {
      setIsLoggedIn(false);
      setFirstName(null);
      setProfilePicture(null);
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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
    setTimeoutId(id as unknown as number);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const term = localSearchTerm.trim();
    if (term !== "") {
      router.push(`/products_catalog?search=${encodeURIComponent(term)}`);
    } else {
      router.push("/products_catalog");
    }
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    if (pathname === "/products_catalog") {
      router.push("/products_catalog");
    }
  };

  return (
    <header className="flex items-center p-4 bg-gray-800">
      <a href="/">
        <div className="flex items-center">
          <Image
            src="/3DCAPYBARALOGOWHITE.png"
            alt="3dCapybara logo"
            width={80}
            height={80}
            className="mr-2"
          />
        </div>
      </a>

      <div className="flex flex-grow justify-center">
        {showSearchBar && (
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
            <div className="relative flex-1 flex gap-3">
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Buscar productos..."
                className="w-full px-6 py-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-5 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-6 h-6" />
              </button>
              {localSearchTerm.trim() !== "" && (
                <button
                  onClick={handleClearSearch}
                  className="px-5 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label="Limpiar"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center space-x-4">
        {!isLoading &&
          (isLoggedIn ? (
            <>
              <span className="text-white">Bienvenido {firstName}</span>
              {showCart && (
                <button
                  onClick={() => router.push("/cart")}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <ShoppingCart size={32} />
                </button>
              )}
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
                    <User className="text-white" size={32} />
                  )}
                </a>
                {menuVisible && (
                  <div
                    className="absolute right-0 w-48 bg-gray-700 rounded shadow-lg z-50"
                    style={{ top: "48px" }}
                    onMouseEnter={showMenu}
                    onMouseLeave={hideMenu}
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                    >
                      Tus datos
                    </a>
                    <a
                      href="/mis_compras"
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                    >
                      Tus compras
                    </a>
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
                <button className="bg-gray-700 py-1 px-3 rounded mr-2">
                  Log in
                </button>
              </a>
              <a href="/register">
                <button className="bg-gray-700 py-1 px-3 rounded">
                  Register
                </button>
              </a>
            </>
          ))}
      </div>
    </header>
  );
}

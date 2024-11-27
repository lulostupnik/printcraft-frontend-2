import { useEffect, useState } from 'react';
import Image from 'next/image';
import { User, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showCart?: boolean;
}

export default function Header({ showCart = false }: HeaderProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedFirstName = localStorage.getItem('firstName');
    const storedProfilePicture = localStorage.getItem('profilePicture');

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('profilePicture');
    
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
    setTimeoutId(id as unknown as number);
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
              {showCart && (
                <button 
                  onClick={() => router.push('/cart')}
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
                    style={{ top: '48px' }}
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

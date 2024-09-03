import Image from 'next/image'
import { Search, User } from 'lucide-react'

export default function Header(){
    return(
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <a href="/">
            <div className="flex items-center">
                <Image src="/printcraft.jpg" alt="Printcraft logo" width={60} height={60} className="mr-2" />
            </div>
            </a>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Buscador de productos, diseñadores..."
              className="py-1 px-3 pr-10 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
          <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
        </div>
      </header>
    )
}
import React from 'react';
import Image from 'next/image'
import { Search } from 'lucide-react'

export default function Header() {
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

            <div className="flex-shrink-0">
                <a href="../login">
                    <button className="bg-gray-700 py-1 px-3 rounded mr-2">Log in</button>
                </a>
                <a href="../register">
                    <button className="bg-gray-700 py-1 px-3 rounded">Register</button>
                </a>
            </div>
        </header>
    )
}

// import Image from 'next/image'
// import { Search, User } from 'lucide-react'

// export default function Header(){
//     return(
//         <header className="flex justify-between items-center p-4 bg-gray-800">
//             <a href="/">
//                 <div className="flex items-center">
//                     <Image src="/printcraft.jpg" alt="Printcraft logo" width={60} height={60} className="mr-2" />
//                 </div>
//             </a>
            
//             <div className="flex items-center flex-1 justify-center">
//                 <div className="relative w-full max-w-lg">
//                     <input
//                         type="text"
//                         placeholder="Buscador de productos, diseñadores..."
//                         className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 text-lg"
//                     />
//                     <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                 </div>
//             </div>

//             <div className="flex items-center">
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


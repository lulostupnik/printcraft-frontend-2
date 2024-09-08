import Image from 'next/image'

export default function SimpleHeader(){
    return(
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <a href="/">
            <div className="flex items-center">
                <Image src="/Printcraft.png" alt="Printcraft logo" width={60} height={60} className="mr-2" />
            </div>
            </a>
      </header>
    )
}
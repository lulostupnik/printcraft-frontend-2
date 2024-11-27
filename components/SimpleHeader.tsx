import Image from 'next/image'

export default function SimpleHeader(){
    return(
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <a href="/">
            <div className="flex items-center">
            <Image src="/3DCAPYBARALOGOWHITE.png" alt="3dCapybara logo" width={80} height={80} className="mr-2" />
            </div>
            </a>
      </header>
    )
}
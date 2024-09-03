export default function Footer() {
    return (
        <footer className="bg-gray-800 py-4 px-8 flex justify-between items-center mt-12">
            <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
                <a href="#" className="text-gray-300 hover:text-white">Términos y Condiciones</a>
                <a href="#" className="text-gray-300 hover:text-white">Política de Privacidad</a>
            </div>
            <div>
                <p className="text-gray-300 text-right">&copy; 2023 Printcraft. All rights reserved.</p>
            </div>

            
        </footer>
    );
}

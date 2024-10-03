interface FooterProps { //ahora se le puede poner un className
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Comprar</h3>
          <ul>
            <li className="mb-2"><a href="/products_catalog" className="hover:underline">Catálogo</a></li>
            <li className="mb-2"><a href="/lookfor_designer" className="hover:underline">Diseñadores</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Vender</h3>
          <ul>
          <li className="mb-2"><a href="/publish_product" className="hover:underline">Publicar</a></li>
            <li className="mb-2"><a href="/offer_services" className="hover:underline">Ofrecer Servicios</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="mb-2"><a href="/publish_product" className="hover:underline">FAQ</a></li>
            <li className="mb-2"><a href="/offer_services" className="hover:underline">Terminos y Condiciones</a></li>
            <li className="mb-2"><a href="/choose_request" className="hover:underline">Politica de Privacidad</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-right">&copy; 2023 Printcraft.<br/> All rights reserved.</h3>
        </div>
      </div>
    </div>
  </footer>
  );
}

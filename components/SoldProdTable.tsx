import React from 'react';
import { SoldProductRequest } from '@/types/SoldProduct';

type SoldProdTableProps = {
  title: string;
  requests: SoldProductRequest[];
  isExpanded: boolean;
  onExpand: () => void;
  finalizeRequest: (request: SoldProductRequest) => void;
};

const SoldProdTable: React.FC<SoldProdTableProps> = ({
  title,
  requests,
  isExpanded,
  onExpand,
  finalizeRequest,
}) => {
  // Define el alto máximo de la tabla dependiendo del estado expandido
  const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';

  return (
    <div className="mt-8">
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center"></p>
      ) : (
        <div className="overflow-x-auto">
          {/* Encabezado de la tabla con el título y el icono de expandir/contraer en la parte superior derecha */}
          <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            {/* Icono para expandir/contraer la tabla */}
            <button
              onClick={onExpand}
              className="text-white hover:text-gray-300 focus:outline-none ml-auto flex items-center space-x-2"
              aria-label={isExpanded ? "Contraer tabla" : "Expandir tabla"}
            >
            </button>
          </div>

          {/* Mostrar el contenido de la tabla */}
          <div className={`${maxHeight} overflow-y-auto`}>
            <table className="min-w-full bg-gray-700 text-white rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-center">Correo</th>
                  <th className="px-4 py-2 text-center">Cantidad</th>
                  <th className="px-4 py-2 text-center">Nombre</th>
                  <th className="px-4 py-2 text-center">Producto</th>
                  <th className="px-4 py-2 text-center">Precio</th>
                  <th className="px-4 py-2 text-center">Fecha</th>
                 {title != 'Entregadas' && ( <th className="px-4 py-2 text-center">Acciones</th>)} 
                 
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-600">
                {requests.map((request) => (
                  <tr key={request.requestID} className="hover:bg-gray-800">
                    <td className="px-4 py-2 text-center">{request.email}</td>
                    <td className="px-4 py-2 text-center">{request.quantity}</td>
                    <td className="px-4 py-2 text-center">{request.name}</td>
                    <td className="px-4 py-2 text-center">{request.price}</td>
                    <td className="px-4 py-2 text-center">
                      <a href={`/products/${request.productCode}`} className="text-blue-500 underline hover:text-blue-700">
                        Ver producto aquí
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(request.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                   
                      {( request.status == 'En proceso') && (
                         <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => finalizeRequest(request)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Finalizar
                        </button>
                        </td>
                      )}
                    
                      
                    {(request.status === 'Completada') && (
                          <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => finalizeRequest(request)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Marcar como entregada
                        </button>
                        </td>
                      )}
                
                    
                  


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoldProdTable;


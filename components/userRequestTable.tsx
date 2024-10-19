import React from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { PrintRequestUser } from '@/types/UserPrintRequests2'; // Import your actual type
import { useRouter } from 'next/navigation';

type UserRequestsTableProps = {
  title: string;
  requests: PrintRequestUser[];
  type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
  isExpanded: boolean;
  onExpand: () => void;
  priceInputs?: { [key: number]: string };
  handleAcceptRequest?: (requestID: number) => void;
  handleDeclineRequest?: (requestID: number) => void;
  handleMarkAsDelivered?: (requestID: number) => void;
  requestType: 'print-requests' | 'design-requests';
};

const UserRequestsTable: React.FC<UserRequestsTableProps> = ({
  title,
  requests,
  type,
  isExpanded,
  onExpand,
  priceInputs,
  handleAcceptRequest,
  handleDeclineRequest,
  handleMarkAsDelivered,
  requestType,
}) => {
  const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';
  const router = useRouter();

  const handleNavigateToDesigner = (sellerID: number) => {
    router.push(`/designers/designer/${sellerID}`);
  };

  
  return (
    <div className="mt-8">
      {requests.length === 0 ? null : (
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <button
              onClick={onExpand}
              className="text-white hover:text-gray-300 focus:outline-none ml-auto flex items-center space-x-2"
              aria-label={isExpanded ? 'Contraer tabla' : 'Expandir tabla'}
            >
              {isExpanded ? (
                <>
                  <span>Contraer</span>
                  <MinusCircleIcon className="w-6 h-6" />
                </>
              ) : (
                <>
                  <span>Expandir</span>
                  <PlusCircleIcon className="w-6 h-6" />
                </>
              )}
            </button>
          </div>

          <div className={`${maxHeight} overflow-y-auto`}>
            <table className="min-w-full bg-gray-700 text-white rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-center">Descripción</th>
                  <th className="px-4 py-2 text-center">Cantidad</th>
                  <th className="px-4 py-2 text-center">Material</th>
                  <th className="px-4 py-2 text-center">
                    {requestType === 'design-requests' ? 'Imágenes' : 'Archivo STL'}
                  </th>
                  {(type === 'quoted' || type === 'delivered') && (
                    <th className="px-4 py-2 text-center">Precio</th>
                  )}
                  {type === 'quoted' && (
                    <th className="px-4 py-2 text-center">Vendedor</th>
                  )}
                  {type === 'accepted' && (
                    <th className="px-4 py-2 text-center">Status</th>
                  )}
                  {type !== 'accepted' && type !== 'delivered' && (
                    <th className="px-4 py-2 text-center">Acciones</th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-600">
                {requests.map((request) => (
                  <tr key={request.requestID} className="hover:bg-gray-800">
                    <td className="px-4 py-2 text-center">{request.description}</td>
                    <td className="px-4 py-2 text-center">{request.quantity}</td>
                    <td className="px-4 py-2 text-center">{request.material}</td>

                    <td className="px-4 py-2 text-center">
                      {requestType === 'print-requests' ? (
                        request.stl_url ? (
                          <a
                            href={request.stl_url}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver STL
                          </a>
                        ) : (
                          'No disponible'
                        )
                      ) : request.design_images && request.design_images.length > 0 ? (
                        <div>
                          {request.design_images.map((file, index) => (
                            <a
                              key={index}
                              href={file.image_url}
                              className="text-blue-500 underline block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver Imagen {index + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        'No disponible'
                      )}
                    </td>

                    {type === 'quoted' && (
                      <>
                        <td className="px-4 py-2 text-center">{request.price}</td>
                        <td className="px-4 py-2 text-center">
                            {request.store_name ? (
                              <span
                                className="text-blue-500 underline cursor-pointer"
                                onClick={() => handleNavigateToDesigner(request.sellerID)} // Make the store name clickable
                              >
                                {request.store_name}
                              </span>
                            ) : (
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleNavigateToDesigner(request.sellerID)}
                              >
                                View Profile
                              </button>
                            )}
                          </td>
                      </>
                    )}

                    {type === 'accepted' && (
                      <td className="px-4 py-2 text-center">Waiting</td>
                    )}

                    {type === 'delivered' && (
                      <td className="px-4 py-2 text-center">{request.price}</td>
                    )}

                    {type !== 'delivered' && type !== 'accepted' && (
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center space-x-2">
                          {type === 'pending' && (
                            <>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleDeclineRequest?.(request.requestID)}
                              >
                                Borrar
                              </button>
                            </>
                          )}
                          {type === 'quoted' && (
                            <>
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleAcceptRequest?.(request.requestID)}
                              >
                                Aceptar
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleDeclineRequest?.(request.requestID)}
                              >
                                Declinar
                              </button>
                            </>
                          )}

                          {type === 'finalized' && (
                            <button
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                              onClick={() => handleMarkAsDelivered?.(request.requestID)}
                            >
                              Marcar como entregado
                            </button>
                          )}
                        </div>
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

export default UserRequestsTable;

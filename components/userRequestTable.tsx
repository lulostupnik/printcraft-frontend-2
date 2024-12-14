import React, { useState, useRef } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { PrintRequestUser } from '@/types/UserPrintRequests2'; // Import your actual type
import { useRouter } from 'next/navigation';
import STLViewer from '@/components/RotatingStlView';  // Importamos STLViewer
import { API_URL } from "@/api/api";
import { AuctionResponse } from '@/types/AuctionResponse';

type UserRequestsTableProps = {
  title: string;
  requests: PrintRequestUser[];
  type: 'pending' | 'quoted' | 'accepted-finalized' | 'delivered';
  isExpanded: boolean;
  onExpand: () => void;
  handleAcceptResponse?: (requestID: number, responseID: number) => void;
  handleDeclineRequest?: (requestID: number) => void;
  handleAcceptRequest?: (requestID: number) => void;
  handleMarkAsDelivered?: (requestID: number) => void;
  requestType: 'print-requests' | 'design-requests' | 'design-reverse-auctions' | 'print-reverse-auctions';
  handleRequestResponses?: (requestID: number) => void;
  responses?: AuctionResponse[];
};

const UserRequestsTable: React.FC<UserRequestsTableProps> = ({
  title,
  requests,
  type,
  isExpanded,
  onExpand,
  handleAcceptResponse,
  handleDeclineRequest,
  handleAcceptRequest,
  handleMarkAsDelivered,
  requestType,
  handleRequestResponses,
  responses,
}) => {
  const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';
  const [tooltipStl, setTooltipStl] = useState<string | null>(null);
  const [tooltipImage, setTooltipImage] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);

  const handleNavigateToDesigner = (sellerID: number) => {
    router.push(`/designers/designer/${sellerID}`);
  };

  const handleStlMouseEnter = (event: React.MouseEvent, stlUrl: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 410,
      y: rect.top
    });
    setTooltipStl(stlUrl);
    setTooltipImage(null);
  };

  const handleImageMouseEnter = (event: React.MouseEvent, imageUrl: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 410,
      y: rect.top
    });
    setTooltipImage(imageUrl);
    setTooltipStl(null);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipStl(null);
      setTooltipImage(null);
    }, 300);
  };

  const handleDeleteRequest = async (requestId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      try {
        const response = await fetch(`${API_URL}/${requestType}/delete/${requestId}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al borrar la solicitud');
        }

        alert('Solicitud eliminada exitosamente');
        window.location.reload();
        /*setTimeout(() => {
          window.location.reload();
        }, 1000);*/

      } catch (error) {
        console.error('Error al borrar la solicitud:', error);
        alert('No se pudo borrar la solicitud');
      }
    }
  };

  const handleShowResponses = async (requestId: number) => {
    if (handleRequestResponses) {
      await handleRequestResponses(requestId);
      setCurrentRequestId(requestId);
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                  {type !== 'pending' && (
                    <th className="px-4 py-2 text-center">Vendedor</th>
                  )}
                  {type === 'accepted-finalized' && (
                    <th className="px-4 py-2 text-center">Status</th>
                  )}
                  {type !== 'accepted-finalized' && type !== 'delivered' && (
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
                            onMouseEnter={(e) => handleStlMouseEnter(e, request.stl_url || '')}
                            onMouseLeave={handleMouseLeave}
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
                              onMouseEnter={(e) => handleImageMouseEnter(e, file.image_url)}
                              onMouseLeave={handleMouseLeave}
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
                        <td className="px-4 py-2 text-center">{request.price}</td>
                    )}

                    {type === 'delivered' && (
                      <td className="px-4 py-2 text-center">{request.price}</td>
                    )}

                    {
                      type !== 'pending' && (
                        <td className="px-4 py-2 text-center">
                        {request.seller_name ? (
                          <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => handleNavigateToDesigner(request.sellerID)} // Make the store name clickable
                          >
                            {request.seller_name}
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
                      )
                    }

          
                    {/* {type === 'accepted-finalized' && (
                      <td className="px-4 py-2 text-center">   {request.status === 'Realizada' ? 'Lista para ser buscada':'Esperando al vendedor'}</td>
                    )} */}
                    {type === 'accepted-finalized' && (
                      <td className="px-4 py-2 text-center">
                          {request.status === 'Realizada' ? `Buscar en: ${request.direccion_del_vendedor || 'dirección no disponible'}`: 'Esperando al vendedor'}
                      </td>
                    )}

                    {type !== 'accepted-finalized' && type !== 'delivered' && (
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center space-x-2">
                          {type === 'quoted' && (
                            <>
                              <button
                                onClick={() => handleAcceptRequest && handleAcceptRequest(request.requestID)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Aceptar
                              </button>
                              <button
                                onClick={() => handleDeclineRequest && handleDeclineRequest(request.requestID)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                              >
                                Rechazar
                              </button>
                            </>
                          )}
                          
                          {(requestType === 'design-reverse-auctions' || requestType === 'print-reverse-auctions') && (
                            <button
                              onClick={() => handleShowResponses(request.requestID)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                              Respuestas
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteRequest(request.requestID)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Borrar
                          </button>
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

      {/* Tooltip con STL Viewer */}
      {tooltipStl && (
        <div 
          className="fixed z-[9999]"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '400px',
            pointerEvents: 'auto'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-64">
              <STLViewer
                url={tooltipStl}
                rotate
              />
            </div>
          </div>
        </div>
      )}

      {/* Tooltip con Imagen */}
      {tooltipImage && (
        <div 
          className="fixed z-[9999]"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '400px',
            pointerEvents: 'auto'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-64">
              <img
                src={tooltipImage}
                alt="Imagen de diseño"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Snackbar modificado para manejar el caso sin respuestas */}
      {showSnackbar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-[90%] max-w-6xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">Respuestas recibidas:</h4>
              <button
                className="text-gray-300 hover:text-white"
                onClick={handleCloseSnackbar}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {responses && responses.length > 0 ? (
                responses.map((response, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-4 gap-8 flex-grow">
                        <p><span className="font-semibold">Vendedor:</span> {response.sellerName}</p>
                        <p><span className="font-semibold">Precio:</span> ${response.price}</p>
                        <p><span className="font-semibold">Dirección:</span> {response.sellerAddress || 'Sin dirección'}</p>
                        <p><span className="font-semibold">Creado el:</span> {formatDate(response.created_at)}</p>
                      </div>
                      <div className="ml-8">
                        <button
                          onClick={() => {
                            if (handleAcceptResponse && currentRequestId) {
                              console.log('Accepting response:', response.responseID, 'for request:', currentRequestId);
                              handleAcceptResponse(currentRequestId, response.responseID);
                              handleCloseSnackbar();
                            }
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Aceptar Oferta
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-700 rounded text-center">
                  <p>No hay respuestas disponibles.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequestsTable;

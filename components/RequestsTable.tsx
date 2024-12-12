import React, { useState, useRef } from 'react';
import { PrintRequest } from '@/types/PrintRequests';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path
import STLViewer from '@/components/RotatingStlView';  // Importamos STLViewer

type RequestsTableProps = {
  title: string;
  requests: PrintRequest[];
  type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
  isExpanded: boolean; // New prop to control expanded state
  onExpand: () => void; // New prop for handling expand action
  priceInputs?: { [key: number]: string };
  handlePriceChange?: (requestID: number, value: string) => void;
  handleAcceptRequest?: (requestID: number, price: number) => void;
  handleDeclineRequest?: (requestID: number) => void;
  handleFinalizeRequest?: (requestID: number) => void;
  handleMarkAsDelivered?: (requestID: number) => void;
  requestType: 'print-requests' | 'design-requests';
};

const RequestsTable: React.FC<RequestsTableProps> = ({
  title,
  requests,
  type,
  isExpanded,
  onExpand,
  priceInputs,
  handlePriceChange,
  handleAcceptRequest,
  handleDeclineRequest,
  handleFinalizeRequest,
  handleMarkAsDelivered,
  requestType
}) => {
  const [tooltipStl, setTooltipStl] = useState<string | null>(null);
  const [tooltipImage, setTooltipImage] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    setTooltipImage(null); // Aseguramos que solo se muestre un tooltip a la vez
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
    setTooltipStl(null); // Aseguramos que solo se muestre un tooltip a la vez
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

  // Determine the max height based on the expanded state
  const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';

  return (
    <div className="mt-8">
      {requests.length === 0 ? null : (
        <div className="overflow-x-auto">
          {/* Table header with title and expand/collapse icon in the top-right */}
          <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            {/* Expand/Collapse Icon placed on the top-right */}
            <button
              onClick={onExpand}
              className="text-white hover:text-gray-300 focus:outline-none ml-auto flex items-center space-x-2"
              aria-label={isExpanded ? "Contraer tabla" : "Expandir tabla"}
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

          {/* Show the table content */}
          <div className={`${maxHeight} overflow-y-auto`}>
            <table className="min-w-full bg-gray-700 text-white rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-center">Descripción</th>
                  <th className="px-4 py-2 text-center">Cantidad</th>
                  <th className="px-4 py-2 text-center">Material</th>
                  {/* <th className="px-4 py-2 text-center">
                     {requestType === 'design-requests' ? 'Image files' : 'STL file'}
                  </th> */}
                  <th className="px-4 py-2 text-center">
                     {requestType === 'design-requests' ? 'Imagenes' : 'Archivo STL'}
                  </th>
                  {(type === 'pending' || type === 'quoted' || type === 'delivered') && (
                    <th className="px-4 py-2 text-center">Precio</th>
                  )}
                  {type !== 'quoted' && type !== 'delivered' && (
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
                              onMouseEnter={(e) => handleStlMouseEnter(e, request.stl_url  || '')}
                              onMouseLeave={handleMouseLeave}
                            >
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )
                        ) : (
                          request.design_images && request.design_images.length > 0 ? (
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
                          )
                        )}
                      </td>

                    {type === 'pending' && (
                      <td className="px-4 py-2 text-center">
                        {request.price ? (
                          <span className="font-medium">{request.price}</span>
                        ) : (
                          <div className="flex items-center justify-center">
                            <span className="text-gray-400 mr-1">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={priceInputs?.[request.requestID] || ''}
                              onChange={(e) => handlePriceChange?.(request.requestID, e.target.value)}
                              className="w-20 px-2 py-1.5 bg-gray-600 border border-gray-500 rounded-md 
                                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                        focus:ring-blue-500 focus:border-transparent transition-all
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none text-center"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        )}
                      </td>
                    )}

                    {type === 'quoted' && (
                      <td className="px-4 py-2 text-center">{request.price}</td>
                    )}

                    {type === 'delivered' && (
                      <td className="px-4 py-2 text-center">{request.price}</td>
                    )}

                    {type !== 'quoted' && type !== 'delivered' && (
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center space-x-2">
                          {type === 'pending' && (
                            <>
                              <button
                                className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                                  !request.price && !priceInputs?.[request.requestID] ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={() => {
                                  const price = request.price || Number(priceInputs?.[request.requestID]);
                                  if (price) {
                                    handleAcceptRequest?.(request.requestID, Number(price));
                                  }
                                }}
                                disabled={!request.price && !priceInputs?.[request.requestID]}
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

                          {type === 'accepted' && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                              onClick={() => handleFinalizeRequest?.(request.requestID)}
                            >
                              Finalizar
                            </button>
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

      {/* Tooltip para STL */}
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

      {/* Tooltip para imágenes */}
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
            <div className="w-full h-64 flex items-center justify-center">
              <img 
                src={tooltipImage} 
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsTable;

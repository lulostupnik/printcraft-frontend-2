// import React from 'react';
// import { PrintRequest } from '@/types/PrintRequests';
// import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

// type UserRequestsTableProps = {
//   title: string;
//   requests: PrintRequest[];
//   type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
//   isExpanded: boolean; // New prop to control expanded state
//   onExpand: () => void; // New prop for handling expand action
//   priceInputs?: { [key: number]: string };
//   handleAcceptRequest?: (requestID: number) => void;
//   handleDeclineRequest?: (requestID: number) => void;
//   handleFinalizeRequest?: (requestID: number) => void;
//   handleMarkAsDelivered?: (requestID: number) => void;
//   requestType: 'print-requests' | 'design-requests';
// };

// const UserRequestsTable: React.FC<UserRequestsTableProps> = ({
//   title,
//   requests,
//   type,
//   isExpanded,
//   onExpand,
//   priceInputs,
//   handleAcceptRequest,
//   handleDeclineRequest,
//   handleFinalizeRequest,
//   handleMarkAsDelivered,
//   requestType
// }) => {
//   // Determine the max height based on the expanded state
//   const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';

//   return (
//     <div className="mt-8">
//       {requests.length === 0 ? null : (
//         <div className="overflow-x-auto">
//           {/* Table header with title and expand/collapse icon in the top-right */}
//           <div className="flex justify-between items-center mb-4 bg-gray-800 py-2 px-4 rounded-lg">
//             <h3 className="text-2xl font-bold text-white">{title}</h3>
//             {/* Expand/Collapse Icon placed on the top-right */}
//             <button
//               onClick={onExpand}
//               className="text-white hover:text-gray-300 focus:outline-none ml-auto flex items-center space-x-2"
//               aria-label={isExpanded ? "Contraer tabla" : "Expandir tabla"}
//             >
//               {isExpanded ? (
//                 <>
//                   <span>Contraer</span>
//                   <MinusCircleIcon className="w-6 h-6" />
//                 </>
//               ) : (
//                 <>
//                   <span>Expandir</span>
//                   <PlusCircleIcon className="w-6 h-6" />
//                 </>
//               )}
//             </button>

//           </div>

//           {/* Show the table content */}
//           <div className={`${maxHeight} overflow-y-auto`}>
//             <table className="min-w-full bg-gray-700 text-white rounded-lg">
//               <thead>
//                 <tr className="bg-gray-600">
//                   <th className="px-4 py-2 text-center">Descripción</th>
//                   <th className="px-4 py-2 text-center">Cantidad</th>
//                   <th className="px-4 py-2 text-center">Material</th>
//                   {/* <th className="px-4 py-2 text-center">
//                      {requestType === 'design-requests' ? 'Image files' : 'STL file'}
//                   </th> */}
//                   <th className="px-4 py-2 text-center">
//                      {requestType === 'design-requests' ? 'Imagenes' : 'Archivo STL'}
//                   </th>
//                   {(type === 'quoted' || type === 'delivered') && (
//                     <th className="px-4 py-2 text-center">Precio</th>
//                   )}
//                   {type !== 'accepted' && type !== 'delivered' && (
//                     <th className="px-4 py-2 text-center">Acciones</th>
//                   )}
    
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-600">
//                 {requests.map((request) => (
//                   <tr key={request.requestID} className="hover:bg-gray-800">
//                     <td className="px-4 py-2 text-center">{request.description}</td>
//                     <td className="px-4 py-2 text-center">{request.quantity}</td>
//                     <td className="px-4 py-2 text-center">{request.material}</td>
                    
//                     <td className="px-4 py-2 text-center">
//                         {requestType === 'print-requests' ? (
//                           request.stl_url ? (
//                             <a
//                               href={request.stl_url}
//                               className="text-blue-500 underline"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               Ver STL
//                             </a>
//                           ) : (
//                             'No disponible'
//                           )
//                         ) : (
//                           // For 'design-requests', display something else (e.g., link to image files)
//                           request.design_images && request.design_images.length > 0 ? (
                             
//                             <div>
//                             {request.design_images.map((file, index) => {
//                               console.log(request.design_images);
//                             //console.log(`Image URL ${index}: ${request.design_images[index]}`); // Log each URL
//                               //console.log(`Image URL ${index}: ${file}`); //
//                               return (
//                                 <a
//                                   key={index}
//                                   href={file.image_url}  // Should be a string URL
//                                   className="text-blue-500 underline block"
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                 >
//                                   Ver Imagen {index + 1}
//                                 </a>
//                               );
//                             })}
//                           </div>
//                           ) : (
//                             'No disponible'
//                           )
//                         )}
//                       </td>

//                     {type === 'pending' && (
//                       <></>
//                     )}

//                     {type === 'quoted' && (
//                       <td className="px-4 py-2 text-center">{request.price}</td>
//                     )}

//                     {type === 'delivered' && (
//                       <td className="px-4 py-2 text-center">{request.price}</td>
//                     )}

//                     {  type !== 'delivered' && type !== 'accepted' && (
//                       <td className="px-4 py-2 text-center">
//                         <div className="flex justify-center space-x-2">
//                           {type === 'pending' && (
//                             <>
//                               <button
//                                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                                 onClick={() => handleDeclineRequest?.(request.requestID)} //@Todo cambiar
//                               >
//                                 Borrar
//                               </button>
//                             </>
//                           )}
//                           {type === 'quoted' && (
//                             <>
//                               <button
//                                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                                 onClick={() => handleAcceptRequest?.(request.requestID)}
//                               >
//                                 Aceptar
//                               </button>
//                               <button
//                                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                                 onClick={() => handleDeclineRequest?.(request.requestID)}
//                               >
//                                 Declinar
//                               </button>
//                             </>
//                           )}
                         
//                           {type === 'finalized' && (
//                             <button
//                               className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                               onClick={() => handleMarkAsDelivered?.(request.requestID)}
//                             >
//                               Marcar como entregado
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRequestsTable;


import React from 'react';
import { PrintRequest } from '@/types/PrintRequests';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

type UserRequestsTableProps = {
  title: string;
  requests: PrintRequest[];
  type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
  isExpanded: boolean; // New prop to control expanded state
  onExpand: () => void; // New prop for handling expand action
  priceInputs?: { [key: number]: string };
  handleAcceptRequest?: (requestID: number) => void;
  handleDeclineRequest?: (requestID: number) => void;
  handleFinalizeRequest?: (requestID: number) => void;
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
  handleFinalizeRequest,
  handleMarkAsDelivered,
  requestType
}) => {
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
                  <th className="px-4 py-2 text-center">
                     {requestType === 'design-requests' ? 'Imagenes' : 'Archivo STL'}
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
                        ) : (
                          request.design_images && request.design_images.length > 0 ? (
                            <div>
                              {request.design_images.map((file, index) => (
                                <a
                                  key={index}
                                  href={file.image_url}  // Should be a string URL
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
                          )
                        )}
                    </td>

                    {type === 'quoted' && (
                      <>
                        <td className="px-4 py-2 text-center">{request.price}</td>
                        <td className="px-4 py-2 text-center">{request.seller}</td>
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

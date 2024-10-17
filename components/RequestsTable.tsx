
// // import React from 'react';
// // import { PrintRequest } from '@/types/PrintRequests';
// // import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

// // type RequestsTableProps = {
// //   title: string;
// //   requests: PrintRequest[];
// //   type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
// //   isExpanded: boolean; // New prop to control expanded state
// //   onExpand: () => void; // New prop for handling expand action
// //   priceInputs?: { [key: number]: string };
// //   handlePriceChange?: (requestID: number, value: string) => void;
// //   handleAcceptRequest?: (requestID: number) => void;
// //   handleDeclineRequest?: (requestID: number) => void;
// //   handleFinalizeRequest?: (requestID: number) => void;
// //   handleMarkAsDelivered?: (requestID: number) => void;
// // };

// // const RequestsTable: React.FC<RequestsTableProps> = ({
// //   title,
// //   requests,
// //   type,
// //   isExpanded,
// //   onExpand,
// //   priceInputs,
// //   handlePriceChange,
// //   handleAcceptRequest,
// //   handleDeclineRequest,
// //   handleFinalizeRequest,
// //   handleMarkAsDelivered,
// // }) => {
// //   // Determine the max height based on the expanded state
// //   const maxHeight = isExpanded ? 'max-h-[24rem]' : 'max-h-[12rem]';

// //   return (
// //     <div className="mt-8">
     
// //       {requests.length === 0 ? null : (
// //         <div className="overflow-x-auto">
// //              <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
// //           {/* Table container with always scrollable behavior */}
// //           <div className={`${maxHeight} overflow-y-auto`}>
// //             <table className="min-w-full mx-auto bg-gray-700 text-white rounded-lg">
// //               <thead>
// //                 <tr className="bg-gray-600">
// //                   <th className="px-4 py-2 text-center">Descripción</th>
// //                   <th className="px-4 py-2 text-center">Cantidad</th>
// //                   <th className="px-4 py-2 text-center">Material</th>
// //                   <th className="px-4 py-2 text-center">Archivo STL</th>
// //                   {(type === 'pending' || type === 'quoted' || type === 'delivered') && (
// //                     <th className="px-4 py-2 text-center">Precio</th>
// //                   )}
// //                   {type !== 'quoted' && type !== 'delivered' && (
// //                     <th className="px-4 py-2 text-center">Acciones</th>
// //                   )}
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-gray-600">
// //                 {requests.map((request) => (
// //                   <tr key={request.requestID} className="hover:bg-gray-800">
// //                     <td className="px-4 py-2 text-center">{request.description}</td>
// //                     <td className="px-4 py-2 text-center">{request.quantity}</td>
// //                     <td className="px-4 py-2 text-center">{request.material}</td>
// //                     <td className="px-4 py-2 text-center">
// //                       {request.stl_url ? (
// //                         <a
// //                           href={request.stl_url}
// //                           className="text-blue-500 underline"
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                         >
// //                           Ver STL
// //                         </a>
// //                       ) : (
// //                         'No disponible'
// //                       )}
// //                     </td>

// //                     {type === 'pending' && (
// //                       <td className="px-4 py-2 text-center">
// //                         <input
// //                           type="number"
// //                           value={priceInputs?.[request.requestID] || ''}
// //                           onChange={(e) => handlePriceChange?.(request.requestID, e.target.value)}
// //                           placeholder="Precio"
// //                           className="bg-gray-800 text-white p-2 rounded-lg text-center"
// //                         />
// //                       </td>
// //                     )}

// //                     {type === 'quoted' && (
// //                       <td className="px-4 py-2 text-center">{request.price}</td>
// //                     )}

// //                     {type === 'delivered' && (
// //                       <td className="px-4 py-2 text-center">{request.price}</td>
// //                     )}

// //                     {type !== 'quoted' && type !== 'delivered' && (
// //                       <td className="px-4 py-2 text-center">
// //                         <div className="flex justify-center space-x-2">
// //                           {type === 'pending' && (
// //                             <>
// //                               <button
// //                                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
// //                                 onClick={() => handleAcceptRequest?.(request.requestID)}
// //                               >
// //                                 Aceptar
// //                               </button>
// //                               <button
// //                                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
// //                                 onClick={() => handleDeclineRequest?.(request.requestID)}
// //                               >
// //                                 Declinar
// //                               </button>
// //                             </>
// //                           )}

// //                           {type === 'accepted' && (
// //                             <button
// //                               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
// //                               onClick={() => handleFinalizeRequest?.(request.requestID)}
// //                             >
// //                               Finalizar
// //                             </button>
// //                           )}

// //                           {type === 'finalized' && (
// //                             <button
// //                               className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
// //                               onClick={() => handleMarkAsDelivered?.(request.requestID)}
// //                             >
// //                               Marcar como entregado
// //                             </button>
// //                           )}
// //                         </div>
// //                       </td>
// //                     )}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Expand table button */}
// //           {requests.length > 3 && (
// //             <div className="text-center mt-4">
// //               <button onClick={onExpand} className="text-white focus:outline-none">
// //           {isExpanded ? (
// //             <MinusCircleIcon className="w-6 h-6" /> // Collapse icon when expanded
// //           ) : (
// //             <PlusCircleIcon className="w-6 h-6" /> // Expand icon when collapsed
// //           )}
// //         </button>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RequestsTable;
// import React from 'react';
// import { PrintRequest } from '@/types/PrintRequests';
// import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

// type RequestsTableProps = {
//   title: string;
//   requests: PrintRequest[];
//   type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
//   isExpanded: boolean; // New prop to control expanded state
//   onExpand: () => void; // New prop for handling expand action
//   priceInputs?: { [key: number]: string };
//   handlePriceChange?: (requestID: number, value: string) => void;
//   handleAcceptRequest?: (requestID: number) => void;
//   handleDeclineRequest?: (requestID: number) => void;
//   handleFinalizeRequest?: (requestID: number) => void;
//   handleMarkAsDelivered?: (requestID: number) => void;
// };

// const RequestsTable: React.FC<RequestsTableProps> = ({
//   title,
//   requests,
//   type,
//   isExpanded,
//   onExpand,
//   priceInputs,
//   handlePriceChange,
//   handleAcceptRequest,
//   handleDeclineRequest,
//   handleFinalizeRequest,
//   handleMarkAsDelivered,
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
//               className="text-white hover:text-gray-300 focus:outline-none ml-auto"
//               aria-label={isExpanded ? "Contraer tabla" : "Expandir tabla"}
//             >
//               {isExpanded ? (
//                 <>
//                 <MinusCircleIcon className="w-6 h-6" /> // Collapse icon when expanded
//                 <span> Contraer</span>
//                 </>
                
//             ) : (
//                 <PlusCircleIcon className="w-6 h-6" /> // Expand icon when collapsed
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
//                   <th className="px-4 py-2 text-center">Archivo STL</th>
//                   {(type === 'pending' || type === 'quoted' || type === 'delivered') && (
//                     <th className="px-4 py-2 text-center">Precio</th>
//                   )}
//                   {type !== 'quoted' && type !== 'delivered' && (
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
//                       {request.stl_url ? (
//                         <a
//                           href={request.stl_url}
//                           className="text-blue-500 underline"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           Ver STL
//                         </a>
//                       ) : (
//                         'No disponible'
//                       )}
//                     </td>

//                     {type === 'pending' && (
//                       <td className="px-4 py-2 text-center">
//                         <input
//                           type="number"
//                           value={priceInputs?.[request.requestID] || ''}
//                           onChange={(e) => handlePriceChange?.(request.requestID, e.target.value)}
//                           placeholder="Precio"
//                           className="bg-gray-800 text-white p-2 rounded-lg text-center"
//                         />
//                       </td>
//                     )}

//                     {type === 'quoted' && (
//                       <td className="px-4 py-2 text-center">{request.price}</td>
//                     )}

//                     {type === 'delivered' && (
//                       <td className="px-4 py-2 text-center">{request.price}</td>
//                     )}

//                     {type !== 'quoted' && type !== 'delivered' && (
//                       <td className="px-4 py-2 text-center">
//                         <div className="flex justify-center space-x-2">
//                           {type === 'pending' && (
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

//                           {type === 'accepted' && (
//                             <button
//                               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                               onClick={() => handleFinalizeRequest?.(request.requestID)}
//                             >
//                               Finalizar
//                             </button>
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

// export default RequestsTable;
import React from 'react';
import { PrintRequest } from '@/types/PrintRequests';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

type RequestsTableProps = {
  title: string;
  requests: PrintRequest[];
  type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
  isExpanded: boolean; // New prop to control expanded state
  onExpand: () => void; // New prop for handling expand action
  priceInputs?: { [key: number]: string };
  handlePriceChange?: (requestID: number, value: string) => void;
  handleAcceptRequest?: (requestID: number) => void;
  handleDeclineRequest?: (requestID: number) => void;
  handleFinalizeRequest?: (requestID: number) => void;
  handleMarkAsDelivered?: (requestID: number) => void;
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
            {/* Expand/Collapse Icon and Text placed on the top-right */}
            <button
              onClick={onExpand}
              className="flex items-center text-white hover:text-gray-300 focus:outline-none ml-auto"
              aria-label={isExpanded ? "Contraer tabla" : "Expandir tabla"}
            >
              {isExpanded ? (
                <>
                 <span className="mr-2">Contraer </span> {/* Text for collapsing */}
                  <MinusCircleIcon className="w-6 h-6 mr-2" /> {/* Collapse icon */}
                 
                </>
              ) : (
                <>
                    <span className="mr-2">Expandir</span> {/* Text for expanding */}
                  <PlusCircleIcon className="w-6 h-6 mr-2" /> {/* Expand icon */}
                  
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
                  <th className="px-4 py-2 text-center">Archivo STL</th>
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
                      {request.stl_url ? (
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
                      )}
                    </td>

                    {type === 'pending' && (
                      <td className="px-4 py-2 text-center">
                        <input
                          type="number"
                          value={priceInputs?.[request.requestID] || ''}
                          onChange={(e) => handlePriceChange?.(request.requestID, e.target.value)}
                          placeholder="Precio"
                          className="bg-gray-800 text-white p-2 rounded-lg text-center"
                        />
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
    </div>
  );
};

export default RequestsTable;

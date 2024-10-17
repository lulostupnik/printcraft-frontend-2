import React from 'react';
import RequestsTable from '@/components/RequestsTable';
import usePrintRequests from '@/hooks/usePrintRequest';

type TableType = 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';

const PrintReqDashboard: React.FC = () => {
  const {
    pendingRequests,
    quotedRequests,
    acceptedRequests,
    finalizedRequests,
    deliveredRequests,
    priceInputs,
    expandedTable,
    setExpandedTable,
    handlePriceChange,
    handleAcceptRequest,
    handleDeclineRequest,
    handleFinalizeRequest,
    handleMarkAsDelivered,
  } = usePrintRequests();

  // Define the tables and their properties
  const tables: {
    key: TableType;
    title: string;
    requests: any[];
    type: TableType;
    priceInputs?: { [key: number]: string };
    handlePriceChange?: (requestID: number, value: string) => void;
    handleAcceptRequest?: (requestID: number) => void;
    handleDeclineRequest?: (requestID: number) => void;
    handleFinalizeRequest?: (requestID: number) => void;
    handleMarkAsDelivered?: (requestID: number) => void;
  }[] = [
    {
      key: 'pending',
      title: 'Solicitudes Pendientes',
      requests: pendingRequests,
      type: 'pending',
      priceInputs,
      handlePriceChange,
      handleAcceptRequest,
      handleDeclineRequest,
    },
    {
      key: 'quoted',
      title: 'Solicitudes Cotizadas',
      requests: quotedRequests,
      type: 'quoted',
    },
    {
      key: 'accepted',
      title: 'Solicitudes Aceptadas',
      requests: acceptedRequests,
      type: 'accepted',
      handleFinalizeRequest,
    },
    {
      key: 'finalized',
      title: 'Solicitudes Finalizadas',
      requests: finalizedRequests,
      type: 'finalized',
      handleMarkAsDelivered,
    },
    {
      key: 'delivered',
      title: 'Solicitudes Entregadas',
      requests: deliveredRequests,
      type: 'delivered',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">Dashboard de Vendedor</h2>

        {/* Loop over tables to render them */}
        {expandedTable === null
          ? tables.map((table) => (
              <RequestsTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                type={table.type} // The type is now explicitly typed
                priceInputs={table.priceInputs}
                handlePriceChange={table.handlePriceChange}
                handleAcceptRequest={table.handleAcceptRequest}
                handleDeclineRequest={table.handleDeclineRequest}
                handleFinalizeRequest={table.handleFinalizeRequest}
                handleMarkAsDelivered={table.handleMarkAsDelivered}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <RequestsTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  type={table.type}
                  priceInputs={table.priceInputs}
                  handlePriceChange={table.handlePriceChange}
                  handleAcceptRequest={table.handleAcceptRequest}
                  handleDeclineRequest={table.handleDeclineRequest}
                  handleFinalizeRequest={table.handleFinalizeRequest}
                  handleMarkAsDelivered={table.handleMarkAsDelivered}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                />
              ))}
      </section>
    </div>
  );
};

export default PrintReqDashboard;

// import React from 'react';
// import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 import path

// type RequestsTableProps = {
//   title: string;
//   requests: any[];
//   type: 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';
//   priceInputs?: { [key: number]: string };
//   handlePriceChange?: (requestID: number, value: string) => void;
//   handleAcceptRequest?: (requestID: number) => void;
//   handleDeclineRequest?: (requestID: number) => void;
//   handleFinalizeRequest?: (requestID: number) => void;
//   handleMarkAsDelivered?: (requestID: number) => void;
//   isExpanded: boolean;
//   onExpand: () => void;
// };

// const RequestsTable: React.FC<RequestsTableProps> = ({
//   title,
//   requests,
//   type,
//   priceInputs,
//   handlePriceChange,
//   handleAcceptRequest,
//   handleDeclineRequest,
//   handleFinalizeRequest,
//   handleMarkAsDelivered,
//   isExpanded,
//   onExpand,
// }) => {
//   return (
//     <div className="mt-8">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-2xl font-bold text-white">{title}</h3>
//         {/* Expand/Collapse Icon */}
//         <button onClick={onExpand} className="text-white focus:outline-none">
//           {isExpanded ? (
//             <MinusCircleIcon className="w-6 h-6" /> // Show collapse icon when expanded
//           ) : (
//             <PlusCircleIcon className="w-6 h-6" /> // Show expand icon when collapsed
//           )}
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-700 text-white rounded-lg">
//             <thead>
//               <tr className="bg-gray-600">
//                 <th className="px-4 py-2 text-center">Descripción</th>
//                 <th className="px-4 py-2 text-center">Cantidad</th>
//                 <th className="px-4 py-2 text-center">Material</th>
//                 <th className="px-4 py-2 text-center">Archivo STL</th>
//                 {(type === 'pending' || type === 'quoted' || type === 'delivered') && (
//                   <th className="px-4 py-2 text-center">Precio</th>
//                 )}
//                 {type !== 'quoted' && type !== 'delivered' && (
//                   <th className="px-4 py-2 text-center">Acciones</th>
//                 )}
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-600">
//               {requests.map((request) => (
//                 <tr key={request.requestID} className="hover:bg-gray-800">
//                   <td className="px-4 py-2 text-center">{request.description}</td>
//                   <td className="px-4 py-2 text-center">{request.quantity}</td>
//                   <td className="px-4 py-2 text-center">{request.material}</td>
//                   <td className="px-4 py-2 text-center">
//                     {request.stl_url ? (
//                       <a
//                         href={request.stl_url}
//                         className="text-blue-500 underline"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Ver STL
//                       </a>
//                     ) : (
//                       'No disponible'
//                     )}
//                   </td>

//                   {type === 'pending' && (
//                     <td className="px-4 py-2 text-center">
//                       <input
//                         type="number"
//                         value={priceInputs?.[request.requestID] || ''}
//                         onChange={(e) => handlePriceChange?.(request.requestID, e.target.value)}
//                         placeholder="Precio"
//                         className="bg-gray-800 text-white p-2 rounded-lg text-center"
//                       />
//                     </td>
//                   )}

//                   {type === 'quoted' && <td className="px-4 py-2 text-center">{request.price}</td>}

//                   {type === 'delivered' && <td className="px-4 py-2 text-center">{request.price}</td>}

//                   {type !== 'quoted' && type !== 'delivered' && (
//                     <td className="px-4 py-2 text-center">
//                       <div className="flex justify-center space-x-2">
//                         {type === 'pending' && (
//                           <>
//                             <button
//                               className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                               onClick={() => handleAcceptRequest?.(request.requestID)}
//                             >
//                               Aceptar
//                             </button>
//                             <button
//                               className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                               onClick={() => handleDeclineRequest?.(request.requestID)}
//                             >
//                               Declinar
//                             </button>
//                           </>
//                         )}

//                         {type === 'accepted' && (
//                           <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                             onClick={() => handleFinalizeRequest?.(request.requestID)}
//                           >
//                             Finalizar
//                           </button>
//                         )}

//                         {type === 'finalized' && (
//                           <button
//                             className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                             onClick={() => handleMarkAsDelivered?.(request.requestID)}
//                           >
//                             Marcar como entregado
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestsTable;

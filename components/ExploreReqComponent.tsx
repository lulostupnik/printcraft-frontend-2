// import React, { useState, useEffect } from 'react';
// import { API_URL } from '@/api/api';
// import { useRouter } from 'next/navigation';
// import STLViewer from '@/components/RotatingStlView';

// interface ReverseAuctionRequest {
//   requestID: number;
//   userID: number;
//   description: string;
//   quantity: number;
//   material: string;
//   stl_file_url: string;
//   status: string;
//   accepted_response: string | null;
//   response_count: number;
// }

// interface ExploreReqComponentProps {
//   type: 'print-requests' | 'design-requests';
// }

// const ExploreReqComponent: React.FC<ExploreReqComponentProps> = ({ type }) => {
//   const [requests, setRequests] = useState<ReverseAuctionRequest[]>([]);
//   const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
//   const [loading, setLoading] = useState<boolean>(true);  // Start with loading = true
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const [tooltipStl, setTooltipStl] = useState<string | null>(null);
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
//   const timeoutRef = React.useRef<NodeJS.Timeout>();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const endpoint =
//           type === 'print-requests'
//             ? `${API_URL}/print-reverse-auction/open/` 
//             : `${API_URL}/design-reverse-auctions/open/`;

//         // Start fetching data
//         const response = await fetch(endpoint);
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error('Error fetching reverse auction requests:', error);
//       } finally {
//         // Once data is fetched or an error occurred, stop loading
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [type]);

//   const handlePriceChange = (requestID: number, value: string) => {
//     setPriceInputs((prev) => ({
//       ...prev,
//       [requestID]: value,
//     }));
//   };

//   const handleSubmitOffer = async (requestID: number) => {
//     const price = priceInputs[requestID];
  
//     if (!price) {
//       setError('Please enter a price before submitting.');
//       return;
//     }
  
//     setLoading(true);
//     setError(null);
  
//     try {
//       const endpoint =
//         type === 'print-requests'
//           ? `${API_URL}/print-reverse-auction/${requestID}/create-response/`
//           : `${API_URL}/design-reverse-auctions/${requestID}/create-response/`;

//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         throw new Error('User is not authenticated');
//       }
  
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         },
//         body: JSON.stringify({
//           price: parseFloat(price),
//         }),
//       });
  
//       if (response.ok) {
//         alert(`Offer submitted successfully for request ${requestID}`);
//         setPriceInputs((prev) => ({ ...prev, [requestID]: '' }));
//       } else {
//         setError(`Failed to submit the offer for request ${requestID}.`);
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(`Error: ${err.message}`);
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStlMouseEnter = (event: React.MouseEvent, stlUrl: string) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
    
//     const rect = event.currentTarget.getBoundingClientRect();
//     setTooltipPosition({
//       x: rect.left - 410,
//       y: rect.top
//     });
//     setTooltipStl(stlUrl);
//   };

//   const handleTooltipMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setTooltipStl(null);
//     }, 300);
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   // If still loading, show a loading indicator
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-white">Cargando datos...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8 relative">
//       {requests.length === 0 ? (
//         <p className="text-center text-white"></p>
//       ) : (
//         <section className="mb-12 bg-gray-800 p-8 rounded-lg">
//           <div className="overflow-x-auto">
//             <div className="max-h-96 overflow-y-auto">
//               <table className="min-w-full bg-gray-700 text-white rounded-lg">
//                 <thead>
//                   <tr className="bg-gray-600">
//                     <th className="px-4 py-2 text-center">Descripción</th>
//                     <th className="px-4 py-2 text-center">Cantidad</th>
//                     <th className="px-4 py-2 text-center">Material</th>
//                     <th className="px-4 py-2 text-center">
//                       {type === 'print-requests' ? 'Archivo STL' : 'Archivo Diseño'}
//                     </th>
//                     <th className="px-4 py-2 text-center">Precio</th>
//                     <th className="px-4 py-2 text-center">Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-600">
//                   {requests.map((request) => (
//                     <tr key={request.requestID} className="hover:bg-gray-800">
//                       <td className="px-4 py-2 text-center">{request.description}</td>
//                       <td className="px-4 py-2 text-center">{request.quantity}</td>
//                       <td className="px-4 py-2 text-center">{request.material}</td>
//                       <td className="px-4 py-2 text-center">
//                         {request.stl_file_url ? (
//                           <a
//                             href={request.stl_file_url}
//                             className="text-blue-500 underline"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             onMouseEnter={(e) => handleStlMouseEnter(e, request.stl_file_url)}
//                             onMouseLeave={handleMouseLeave}
//                           >
//                             Ver {type === 'print-requests' ? 'STL' : 'Diseño'}
//                           </a>
//                         ) : (
//                           'No disponible'
//                         )}
//                       </td>
//                       <td className="px-4 py-2 text-center">
//                         <input
//                           type="number"
//                           value={priceInputs[request.requestID] || ''}
//                           onChange={(e) => handlePriceChange(request.requestID, e.target.value)}
//                           placeholder="Precio"
//                           className="bg-gray-800 text-white p-2 rounded-lg text-center"
//                         />
//                       </td>
//                       <td className="px-4 py-2 text-center">
//                         <button
//                           className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                           onClick={() => handleSubmitOffer(request.requestID)}
//                           disabled={loading}
//                         >
//                           {loading ? 'Enviando...' : 'Enviar Oferta'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {error && <p className="text-red-500 mt-4">{error}</p>}
//             </div>
//           </div>
//         </section>
//       )}

//       {tooltipStl && (
//         <div 
//           className="fixed z-50"
//           style={{
//             left: `${tooltipPosition.x}px`,
//             top: `${tooltipPosition.y}px`,
//             width: '400px'
//           }}
//           onMouseEnter={handleTooltipMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//             <div className="w-full h-64">
//               <STLViewer
//                 url={tooltipStl}
//                 rotate
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExploreReqComponent;

import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import { useRouter } from 'next/navigation';
import STLViewer from '@/components/RotatingStlView';

interface ReverseAuctionRequest {
  requestID: number;
  userID: number;
  description: string;
  quantity: number;
  material: string;
  stl_file_url: string;
  status: string;
  accepted_response: string | null;
  response_count: number;
}

interface ExploreReqComponentProps {
  type: 'print-requests' | 'design-requests';
}

const ExploreReqComponent: React.FC<ExploreReqComponentProps> = ({ type }) => {
  const [requests, setRequests] = useState<ReverseAuctionRequest[]>([]);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true); // Only for initial data load
  const [error, setError] = useState<string | null>(null);
  const [submittingOfferForID, setSubmittingOfferForID] = useState<number | null>(null); // Track which request is being submitted

  const router = useRouter();
  const [tooltipStl, setTooltipStl] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          type === 'print-requests'
            ? `${API_URL}/print-reverse-auction/open/`
            : `${API_URL}/design-reverse-auctions/open/`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching reverse auction requests:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, [type]);

  const handlePriceChange = (requestID: number, value: string) => {
    setPriceInputs((prev) => ({
      ...prev,
      [requestID]: value,
    }));
  };

  const handleSubmitOffer = async (requestID: number) => {
    const price = priceInputs[requestID];
    if (!price) {
      setError('Please enter a price before submitting.');
      return;
    }

    setError(null);
    setSubmittingOfferForID(requestID); // Indicate this specific request is submitting

    try {
      const endpoint =
        type === 'print-requests'
          ? `${API_URL}/print-reverse-auction/${requestID}/create-response/`
          : `${API_URL}/design-reverse-auctions/${requestID}/create-response/`;

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          price: parseFloat(price),
        }),
      });

      if (response.ok) {
        alert(`Offer submitted successfully for request ${requestID}`);
        setPriceInputs((prev) => ({ ...prev, [requestID]: '' }));
      } else {
        setError(`Failed to submit the offer for request ${requestID}.`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setSubmittingOfferForID(null); // Done submitting this offer
    }
  };

  const handleStlMouseEnter = (event: React.MouseEvent, stlUrl: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - 410,
      y: rect.top,
    });
    setTooltipStl(stlUrl);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipStl(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    // Still loading initial data
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="mt-8 relative">
      {requests.length === 0 ? (
        <p className="text-center text-white"></p>
      ) : (
        <section className="mb-12 bg-gray-800 p-8 rounded-lg">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-4 py-2 text-center">Descripción</th>
                    <th className="px-4 py-2 text-center">Cantidad</th>
                    <th className="px-4 py-2 text-center">Material</th>
                    <th className="px-4 py-2 text-center">
                      {type === 'print-requests' ? 'Archivo STL' : 'Archivo Diseño'}
                    </th>
                    <th className="px-4 py-2 text-center">Precio</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {requests.map((request) => {
                    const isSubmittingThisRequest = submittingOfferForID === request.requestID;
                    return (
                      <tr key={request.requestID} className="hover:bg-gray-800">
                        <td className="px-4 py-2 text-center">{request.description}</td>
                        <td className="px-4 py-2 text-center">{request.quantity}</td>
                        <td className="px-4 py-2 text-center">{request.material}</td>
                        <td className="px-4 py-2 text-center">
                          {request.stl_file_url ? (
                            <a
                              href={request.stl_file_url}
                              className="text-blue-500 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseEnter={(e) => handleStlMouseEnter(e, request.stl_file_url)}
                              onMouseLeave={handleMouseLeave}
                            >
                              Ver {type === 'print-requests' ? 'STL' : 'Diseño'}
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={priceInputs[request.requestID] || ''}
                            onChange={(e) => handlePriceChange(request.requestID, e.target.value)}
                            placeholder="Precio"
                            className="bg-gray-800 text-white p-2 rounded-lg text-center"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleSubmitOffer(request.requestID)}
                            disabled={isSubmittingThisRequest}
                          >
                            {isSubmittingThisRequest ? 'Enviando...' : 'Enviar Oferta'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </section>
      )}

      {tooltipStl && (
        <div
          className="fixed z-50"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '400px',
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-64">
              <STLViewer url={tooltipStl} rotate />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreReqComponent;

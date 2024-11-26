import React, { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import { useRouter } from 'next/navigation';


interface AuctionResponse {
  responseID: number;
  auction: number;
  seller: string;
  sellerName: string;
  price: number;
  created_at: string;
  status: string; // Pending, Accepted, Rejected
}

interface AuctionRequest {
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

interface AuctionRequestComponentProps {
  type: 'design-requests' | 'print-requests'; // Restrict to two possible types
}

const AuctionRequestComponent: React.FC<AuctionRequestComponentProps> = ({ type }) => {
  const [requests, setRequests] = useState<AuctionRequest[]>([]);
  const [expandedRequests, setExpandedRequests] = useState<number[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: AuctionResponse[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptingResponse, setAcceptingResponse] = useState<boolean>(false);
  const router = useRouter(); 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const access_token = localStorage.getItem('accessToken');
        if (!access_token) {
          throw new Error('User is not authenticated');
        }

        const endpoint =
          type === 'print-requests'
            ? `${API_URL}/print-reverse-auction/mine/`
            : `${API_URL}/design-reverse-auctions/mine/`;

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
  
        const data = await response.json();
        setRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching auction requests:', error);
        setError('Failed to load auction requests.');
      }
    };
  
    fetchRequests();
  }, [type]);

  const toggleExpand = async (requestID: number) => {
    if (expandedRequests.includes(requestID)) {
      setExpandedRequests(expandedRequests.filter(id => id !== requestID));
    } else {
      if (!responses[requestID]) {
        try {
          setLoading(true);
          const url = type === 'print-requests' ? `${API_URL}/print-reverse-auction/${requestID}/responses/`:`${API_URL}/design-reverse-auctions/${requestID}/responses/`;
          const response = await fetch(url);
          const data = await response.json();
          setResponses(prev => ({ ...prev, [requestID]: data }));
        } catch (error) {
          console.error(`Error fetching responses for request ${requestID}:`, error);
          setError(`Failed to load responses for request ${requestID}.`);
        } finally {
          setLoading(false);
        }
      }
      setExpandedRequests([...expandedRequests, requestID]);
    }
  };

  const acceptResponse = async (auctionID: number, responseID: number) => {
    setAcceptingResponse(true);
    try {
      const access_token = localStorage.getItem('accessToken');
    const endpoint = type === 'print-requests' ? `${API_URL}/print-reverse-auction/${auctionID}/accept-response/${responseID}/`:`${API_URL}/design-reverse-auctions/${auctionID}/accept-response/${responseID}/`;
    
    // const endpoint = `${API_URL}/print-reverse-auction/${auctionID}/accept-response/${responseID}/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        const preferenceID = data.preference_id; // Extract preference ID
        if (preferenceID) {
            router.push(`/mp_pref/${preferenceID}`);
        }else{
            throw new Error('Failed to accept response');
        }
    }
      if (!response.ok) {
        throw new Error('Failed to accept response');
      }

      alert('Response accepted successfully!');
    } catch (error) {
      console.error('Error accepting response:', error);
      setError('Failed to accept response.');
    } finally {
      setAcceptingResponse(false);
    }
  };

  const pendingRequests = requests.filter(request => request.response_count === 0);
  const respondedRequests = requests.filter(request => request.response_count > 0);

  return (
    <div className="mt-8">
      {error && <p className="text-red-500">{error}</p>}
      {requests.length === 0 ? (
        null
      ) : (
        <>
          {pendingRequests.length > 0 && (
            <section className="mb-12 bg-gray-800 p-8 rounded-lg">
              <h1 className="text-4xl font-bold mb-4 text-center">Publicaciones pendientes</h1>
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-4 py-2 text-center">Descripción</th>
                    <th className="px-4 py-2 text-center">Cantidad</th>
                    <th className="px-4 py-2 text-center">Material</th>
                    <th className="px-4 py-2 text-center">Archivo STL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {pendingRequests.map((request) => (
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
                          >
                            Ver STL
                          </a>
                        ) : (
                          'No disponible'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {respondedRequests.length > 0 && (
            <section className="mb-12 bg-gray-800 p-8 rounded-lg">
              <h1 className="text-4xl font-bold mb-4 text-center">Solicitudes con respuestas</h1>
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-4 py-2 text-center">Descripción</th>
                    <th className="px-4 py-2 text-center">Cantidad</th>
                    <th className="px-4 py-2 text-center">Material</th>
                    <th className="px-4 py-2 text-center">Archivo STL</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {respondedRequests.map((request) => (
                    <React.Fragment key={request.requestID}>
                      <tr className="hover:bg-gray-800">
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
                            >
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => toggleExpand(request.requestID)}
                          >
                            {expandedRequests.includes(request.requestID) ? 'Ocultar Respuestas' : 'Ver Respuestas'}
                          </button>
                        </td>
                      </tr>
                      {expandedRequests.includes(request.requestID) && (
                        <tr>
                          <td colSpan={6} className="px-4 py-2">
                            {loading ? (
                              <p className="text-center text-white">Cargando respuestas...</p>
                            ) : (
                              <div className="bg-gray-600 p-4 rounded-lg">
                                {responses[request.requestID]?.length > 0 ? (
                                  <table className="min-w-full bg-gray-700 text-white rounded-lg">
                                    <thead>
                                      <tr className="bg-gray-600">
                                        <th className="px-4 py-2 text-center">Vendedor</th>
                                        <th className="px-4 py-2 text-center">Precio</th>
                                        <th className="px-4 py-2 text-center">Fecha</th>
                                        <th className="px-4 py-2 text-center">Acciones</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                      {responses[request.requestID].map((response) => (
                                        <tr key={response.responseID} className="hover:bg-gray-800">
                                        
                                          <td className="px-4 py-2 text-center">
                                          <a href={`designers/designer/${response.seller}`}   className="text-blue-500 hover:underline">
                                              {response.sellerName}     
                                          </a></td>
                                         
                                          {/* <td className="px-4 py-2 text-center">{response.sellerName}</td> */}
                                          <td className="px-4 py-2 text-center">
                                            {response.price ? `$${Number(response.price).toFixed(2)}` : 'N/A'}
                                          </td>
                                          <td className="px-4 py-2 text-center">
                                            {new Date(response.created_at).toLocaleDateString()}
                                          </td>
                                          <td className="px-4 py-2 text-center">
                                            <button
                                              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                              onClick={() => acceptResponse(request.requestID, response.responseID)}
                                              disabled={acceptingResponse}
                                            >
                                              {acceptingResponse ? 'Aceptando...' : 'Aceptar'}
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="text-center text-white">No hay respuestas para esta solicitud.</p>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default AuctionRequestComponent;

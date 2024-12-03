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
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({}); // Store price inputs
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [tooltipStl, setTooltipStl] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Fetch data from API based on requestType
    const fetchData = async () => {
      try {
        const endpoint =
          type === 'print-requests'
            ? `${API_URL}/print-reverse-auction/open/` // Print requests endpoint
            : `${API_URL}/design-reverse-auctions/open/`; // Design requests endpoint

        const response = await fetch(endpoint);
        const data = await response.json();
        setRequests(data.results);                 //ACA AGREGUE .results
      } catch (error) { 
        console.error('Error fetching reverse auction requests:', error);
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
  
    setLoading(true);
    setError(null);
  
    try {
      // Determine the correct POST endpoint based on the request type
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
        setPriceInputs((prev) => ({ ...prev, [requestID]: '' })); // Clear the input after success
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
      setLoading(false);
    }
    
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

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-8 relative">
      {requests.length === 0 ? (
        <p className="text-center text-white"></p>
      ) : (
        <section className="mb-12 bg-gray-800 p-8 rounded-lg">
          <div className="overflow-x-auto">
            {/* Table header with title */}
            <h1 className="text-4xl font-bold mb-4 text-center">
              {type === 'print-requests' ? 'Explorar print requests' : 'Explorar design requests'}
            </h1>

            {/* Show the table content */}
            <div className="max-h-96 overflow-y-auto"> {/* Set max height and scroll */}
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
                  {requests.map((request) => (
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
                          disabled={loading}
                        >
                          {loading ? 'Enviar Oferta'  : 'Enviar Oferta'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Tooltip con STL Viewer */}
      {tooltipStl && (
        <div 
          className="fixed z-50"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '400px'
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
    </div>
  );
};

export default ExploreReqComponent;

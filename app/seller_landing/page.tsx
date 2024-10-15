'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from '@/api/api';

// Define the PrintRequest type based on the structure you provided
type PrintRequest = {
  requestID: number;
  userID: number;
  quantity: number;
  sellerID: number;
  stl_url: string;
  description: string;
  material: string;
  status: string;
  price: string | null;
};

export default function SellerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const [showDelivered, setShowDelivered] = useState(false)

  // Check if tokens exist in localStorage to determine login status and seller status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const sellerStatus = JSON.parse(localStorage.getItem('isSeller') || 'false');

    if (accessToken) {
      setIsLoggedIn(true);
      setIsSeller(sellerStatus);
    } else {
      setIsLoggedIn(false);
      router.push('/login');
    }
  }, [router]);

  // Fetch print requests from the API
  useEffect(() => {
    const fetchPrintRequests = async () => {
      try {
        const response = await fetch(`${API_URL}/print-requests/seller/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data: PrintRequest[] = await response.json();
          setPrintRequests(data);
        } else {
          console.error('Failed to fetch print requests');
        }
      } catch (error) {
        console.error('Error fetching print requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrintRequests();
  }, []);

  // Handle price input change
  const handlePriceChange = (requestID: number, value: string) => {
    setPriceInputs((prev) => ({ ...prev, [requestID]: value }));
  };

  // Handle Accept Request with price
  const handleAcceptRequest = async (requestID: number) => {
    const price = priceInputs[requestID]; // Get the price for the request
    if (!price || isNaN(Number(price))) {
      alert('Please enter a valid price.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/print-requests/${requestID}/accept-or-reject/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: 'Accept',
          price: Number(price),
        }),
      });

      if (response.ok) {
        // Update the status of the request to 'Cotizada'
        setPrintRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestID === requestID
              ? { ...request, status: 'Cotizada', price: Number(price).toString() }
              : request
          )
        );
        alert('Request accepted!');
      } else {
        console.error('Failed to accept the request');
      }
    } catch (error) {
      console.error('Error accepting the request:', error);
    }
  };

  // Handle Decline Request
  const handleDeclineRequest = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/print-requests/${requestID}/accept-or-reject/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: 'Reject',
        }),
      });

      if (response.ok) {
        // Remove the request from the list after declining
        setPrintRequests((prevRequests) =>
          prevRequests.filter((request) => request.requestID !== requestID)
        );
        alert('Request declined!');
      } else {
        console.error('Failed to decline the request');
      }
    } catch (error) {
      console.error('Error declining the request:', error);
    }
  };

  // Handle Finalize Request (status: 'Aceptada')
  const handleFinalizeRequest = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/print-requests/${requestID}/finalize-print-request/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setPrintRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestID === requestID ? { ...request, status: 'Realizada' } : request
          )
        );
        alert('Request finalized!');
      } else {
        console.error('Failed to finalize the request');
      }
    } catch (error) {
      console.error('Error finalizing the request:', error);
    }
  };

  // Handle Mark as Delivered Request (status: 'Finalizada')
  const handleMarkAsDelivered = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/print-requests/${requestID}/mark-as-delivered-print-request/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setPrintRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestID === requestID ? { ...request, status: 'Entregada' } : request
          )
        );
        alert('Request marked as delivered!');
      } else {
        console.error('Failed to mark as delivered');
      }
    } catch (error) {
      console.error('Error marking as delivered:', error);
    }
  };
  

  // Filter requests into different statuses
  const pendingRequests = printRequests.filter((req: PrintRequest) => req.status === 'Pendiente');
  const quotedRequests = printRequests.filter((req: PrintRequest) => req.status === 'Cotizada');
  const acceptedRequests = printRequests.filter((req: PrintRequest) => req.status === 'Aceptada');
  const finalizedRequests = printRequests.filter((req: PrintRequest) => req.status === 'Realizada');
  const deliveredRequests = printRequests.filter((req: PrintRequest) => req.status === 'Entregada');

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-12 bg-gray-800 p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-center">Dashboard de Vendedor</h2>
        

          {/* Pending Requests Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Solicitudes Pendientes</h3>
            {pendingRequests.length === 0 ? (
              <p className="text-center">No hay solicitudes pendientes.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full mx-auto table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-4 text-left">Descripción</th>
                      <th className="px-6 py-4 text-left">Cantidad</th>
                      <th className="px-6 py-4 text-left">Material</th>
                      <th className="px-6 py-4 text-left">Archivo STL</th>
                      <th className="px-6 py-4 text-left">Precio</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((request) => (
                      <tr key={request.requestID} className="border-t border-gray-600 hover:bg-gray-800 transition">
                        <td className="px-6 py-4">{request.description}</td>
                        <td className="px-6 py-4">{request.quantity}</td>
                        <td className="px-6 py-4">{request.material}</td>
                        <td className="px-6 py-4">
                          {request.stl_url ? (
                            <a href={request.stl_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={priceInputs[request.requestID] || ''}
                            onChange={(e) => handlePriceChange(request.requestID, e.target.value)}
                            placeholder="Precio"
                            className="bg-gray-800 text-white p-2 rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={() => handleAcceptRequest(request.requestID)}
                          >
                            Aceptar
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleDeclineRequest(request.requestID)}
                          >
                            Rechazar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quoted Requests Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-center">Solicitudes Cotizadas</h3>
            {quotedRequests.length === 0 ? (
              <p className="text-center">No hay solicitudes cotizadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full mx-auto table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-4 text-left">Descripción</th>
                      <th className="px-6 py-4 text-left">Cantidad</th>
                      <th className="px-6 py-4 text-left">Material</th>
                      <th className="px-6 py-4 text-left">Archivo STL</th>
                      <th className="px-6 py-4 text-left">Precio Cotizado</th>
                      <th className="px-6 py-4 text-left">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotedRequests.map((request) => (
                      <tr key={request.requestID} className="border-t border-gray-600 hover:bg-gray-800 transition">
                        <td className="px-6 py-4">{request.description}</td>
                        <td className="px-6 py-4">{request.quantity}</td>
                        <td className="px-6 py-4">{request.material}</td>
                        <td className="px-6 py-4">
                          {request.stl_url ? (
                            <a href={request.stl_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-6 py-4">{request.price}</td>
                        <td className="px-6 py-4">Status: esperando al comprador</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Accepted Requests Section (with 'Finalizado' button) */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-center">Solicitudes Aceptadas</h3>
            {acceptedRequests.length === 0 ? (
              <p className="text-center">No hay solicitudes aceptadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full mx-auto table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-4 text-left">Descripción</th>
                      <th className="px-6 py-4 text-left">Cantidad</th>
                      <th className="px-6 py-4 text-left">Material</th>
                      <th className="px-6 py-4 text-left">Archivo STL</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedRequests.map((request) => (
                      <tr key={request.requestID} className="border-t border-gray-600 hover:bg-gray-800 transition">
                        <td className="px-6 py-4">{request.description}</td>
                        <td className="px-6 py-4">{request.quantity}</td>
                        <td className="px-6 py-4">{request.material}</td>
                        <td className="px-6 py-4">
                          {request.stl_url ? (
                            <a href={request.stl_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleFinalizeRequest(request.requestID)}
                          >
                            Finalizado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Finalized Requests Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-center">Solicitudes Finalizadas</h3>
            {finalizedRequests.length === 0 ? (
              <p className="text-center">No hay solicitudes finalizadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full mx-auto table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-4 text-left">Descripción</th>
                      <th className="px-6 py-4 text-left">Cantidad</th>
                      <th className="px-6 py-4 text-left">Material</th>
                      <th className="px-6 py-4 text-left">Archivo STL</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalizedRequests.map((request) => (
                      <tr key={request.requestID} className="border-t border-gray-600 hover:bg-gray-800 transition">
                        <td className="px-6 py-4">{request.description}</td>
                        <td className="px-6 py-4">{request.quantity}</td>
                        <td className="px-6 py-4">{request.material}</td>
                        <td className="px-6 py-4">
                          {request.stl_url ? (
                            <a href={request.stl_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleMarkAsDelivered(request.requestID)}
                          >
                            Entregado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

    
           <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 text-center">Historial de Solicitudes Entregadas</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={() => setShowDelivered(!showDelivered)} // Toggle button
          >
            {showDelivered ? 'Ocultar Entregados' : 'Mostrar Entregados'}
          </button>
          {showDelivered && ( // Conditionally render based on toggle state
            deliveredRequests.length === 0 ? (
              <p className="text-center">No hay solicitudes entregadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full mx-auto table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="px-6 py-4 text-left">Descripción</th>
                      <th className="px-6 py-4 text-left">Cantidad</th>
                      <th className="px-6 py-4 text-left">Material</th>
                      <th className="px-6 py-4 text-left">Archivo STL</th>
                      <th className="px-6 py-4 text-left">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveredRequests.map((request) => (
                      <tr key={request.requestID} className="border-t border-gray-600 hover:bg-gray-800 transition">
                        <td className="px-6 py-4">{request.description}</td>
                        <td className="px-6 py-4">{request.quantity}</td>
                        <td className="px-6 py-4">{request.material}</td>
                        <td className="px-6 py-4">
                          {request.stl_url ? (
                            <a href={request.stl_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              Ver STL
                            </a>
                          ) : (
                            'No disponible'
                          )}
                        </td>
                        <td className="px-6 py-4">{request.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

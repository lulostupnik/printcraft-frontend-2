'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_URL } from '@/api/api';
import RequestsTable from '@/components/RequestsTable';
import { PrintRequest } from '@/types/PrintRequests';

export default function SellerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [expandedTable, setExpandedTable] = useState<string | null>(null); // Manage which table is expanded
  const router = useRouter();

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
    const price = priceInputs[requestID];
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

          {/* Show only one table if expanded, otherwise show all tables */}
          {expandedTable === null && (
            <>
              {/* Pending Requests Table */}
              <RequestsTable
                title="Solicitudes Pendientes"
                requests={pendingRequests}
                type="pending"
                priceInputs={priceInputs}
                handlePriceChange={handlePriceChange}
                handleAcceptRequest={handleAcceptRequest}
                handleDeclineRequest={handleDeclineRequest}
                isExpanded={false}
                onExpand={() => setExpandedTable('pending')}
              />

              {/* Quoted Requests Table */}
              <RequestsTable
                title="Solicitudes Cotizadas"
                requests={quotedRequests}
                type="quoted"
                isExpanded={false}
                onExpand={() => setExpandedTable('quoted')}
              />

              {/* Accepted Requests Table */}
              <RequestsTable
                title="Solicitudes Aceptadas"
                requests={acceptedRequests}
                type="accepted"
                handleFinalizeRequest={handleFinalizeRequest}
                isExpanded={false}
                onExpand={() => setExpandedTable('accepted')}
              />

              {/* Finalized Requests Table */}
              <RequestsTable
                title="Solicitudes Finalizadas"
                requests={finalizedRequests}
                type="finalized"
                handleMarkAsDelivered={handleMarkAsDelivered}
                isExpanded={false}
                onExpand={() => setExpandedTable('finalized')}
              />

              {/* Delivered Requests Table */}
              <RequestsTable
                title="Solicitudes Entregadas"
                requests={deliveredRequests}
                type="delivered"
                isExpanded={false}
                onExpand={() => setExpandedTable('delivered')}
              />
            </>
          )}

          {/* Show only the expanded table */}
          {expandedTable === 'pending' && (
            <RequestsTable
              title="Solicitudes Pendientes"
              requests={pendingRequests}
              type="pending"
              priceInputs={priceInputs}
              handlePriceChange={handlePriceChange}
              handleAcceptRequest={handleAcceptRequest}
              handleDeclineRequest={handleDeclineRequest}
              isExpanded={true}
              onExpand={() => setExpandedTable(null)}
            />
          )}

          {expandedTable === 'quoted' && (
            <RequestsTable
              title="Solicitudes Cotizadas"
              requests={quotedRequests}
              type="quoted"
              isExpanded={true}
              onExpand={() => setExpandedTable(null)}
            />
          )}

          {expandedTable === 'accepted' && (
            <RequestsTable
              title="Solicitudes Aceptadas"
              requests={acceptedRequests}
              type="accepted"
              handleFinalizeRequest={handleFinalizeRequest}
              isExpanded={true}
              onExpand={() => setExpandedTable(null)}
            />
          )}

          {expandedTable === 'finalized' && (
            <RequestsTable
              title="Solicitudes Finalizadas"
              requests={finalizedRequests}
              type="finalized"
              handleMarkAsDelivered={handleMarkAsDelivered}
              isExpanded={true}
              onExpand={() => setExpandedTable(null)}
            />
          )}

          {expandedTable === 'delivered' && (
            <RequestsTable
              title="Solicitudes Entregadas"
              requests={deliveredRequests}
              type="delivered"
              isExpanded={true}
              onExpand={() => setExpandedTable(null)}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

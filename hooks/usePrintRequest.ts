import { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import { PrintRequest } from '@/types/PrintRequests';
import { useRouter } from 'next/navigation';

const usePrintRequests = () => {
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [expandedTable, setExpandedTable] = useState<string | null>(null); // Manage expanded table
  const router = useRouter();

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

  return {
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
  };
};

export default usePrintRequests;

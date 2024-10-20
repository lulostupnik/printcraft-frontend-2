import { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import { PrintRequest } from '@/types/PrintRequests';

const usePrintRequestsUser = (requestType: 'print-requests' | 'design-requests' ) => {
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [expandedTable, setExpandedTable] = useState<string | null>(null); // Manage expanded table



  // Function to fetch the print requests and their store names
 
  // Fetch print requests from the API
  useEffect(() => {
    const fetchPrintRequests = async () => {
      try {
        const response = await fetch(`${API_URL}/${requestType}/mine/`, {
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
  }, [requestType]);




  // Handle Accept Request with price
  const handleAcceptRequest = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/user-respond/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: 'Accept',
        }),
      });

      if (response.ok) {
        // Update the status of the request to 'Cotizada'
        setPrintRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestID === requestID
              ? { ...request, status: 'Cotizada' }
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
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/user-respond/`, {
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
    expandedTable,
    setExpandedTable,
    handleAcceptRequest,
    handleDeclineRequest,
  };
};

export default usePrintRequestsUser;



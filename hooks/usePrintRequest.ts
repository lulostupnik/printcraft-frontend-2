// import { useState, useEffect } from 'react';
// import { API_URL } from '@/api/api';
// import { PrintRequest } from '@/types/PrintRequests';
// import { useRouter } from 'next/navigation';

// const usePrintRequests = (requestType: 'print-requests' | 'design-requests' ) => {
//   const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
//   const [printRequestsQuoted, setPrintRequestsQuoted] = useState<PrintRequest[]>([]);
//   const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
//   const [expandedTable, setExpandedTable] = useState<string | null>(null); // Manage expanded table
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         // Define the endpoints for both fetches
//         const endQuoted = requestType === 'print-requests' ? 'print-reverse-auction' : 'design-reverse-auctions';
        
//         // Fetch both print requests and quoted requests in parallel
//         const [printResponse, quotedResponse] = await Promise.all([
//           fetch(`${API_URL}/${requestType}/seller/`, {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//           }),
//           fetch(`${API_URL}/${endQuoted}/seller/`, {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//           }),
//         ]);
  
//         // Handle the print requests response
//         if (printResponse.ok) {
//           const printData: PrintRequest[] = await printResponse.json();
//           // Exclude requests with 'quoted' status
//           const filteredPrintData = printData.filter(request => request.status !== 'quoted');
//           setPrintRequests(filteredPrintData);
//         } else {
//           console.error('Failed to fetch print requests');
//         }
  
//         // Handle the quoted requests response
//         if (quotedResponse.ok) {
//           const quotedData: PrintRequest[] = await quotedResponse.json();
//           setPrintRequestsQuoted(quotedData); // Save quoted requests to state
//         } else {
//           console.error('Failed to fetch quoted requests');
//         }
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };
  
//     fetchRequests();
//   }, [requestType]);
  
//   const handlePriceChange = (requestID: number, value: string) => {
//     setPriceInputs((prev) => ({ ...prev, [requestID]: value }));
//   };

//   const addToQuotedArray = (request: PrintRequest) => {
//     setPrintRequestsQuoted((prevQuotedRequests) => [...prevQuotedRequests, request]);
//   };
//   // Handle Accept Request with price
//   const handleAcceptRequest = async (requestID: number) => {
//     const price = priceInputs[requestID];
//     if (!price || isNaN(Number(price))) {
//       alert('Please enter a valid price.');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/${requestType}/${requestID}/accept-or-reject/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           response: 'Accept',
//           price: Number(price),
//         }),
//       });

//       if (response.ok) {
 
//       const updatedRequest = { status: 'Cotizada', price: Number(price).toString() };

//       setPrintRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.requestID === requestID
//             ? { ...request, ...updatedRequest }
//             : request
//         )
//       );

//       // Find the accepted request and add it to the `printRequestsQuoted` array
//       const acceptedRequest = printRequests.find((request) => request.requestID === requestID);
//       if (acceptedRequest) {
//         setPrintRequestsQuoted((prevRequests) => [
//           ...prevRequests, 
//           { ...acceptedRequest, ...updatedRequest } // Add the updated request to the Quoted array
//         ]);
//       }

//         alert('Request accepted!');
//       } else {
//         console.error('Failed to accept the request');
//       }
//     } catch (error) {
//       console.error('Error accepting the request:', error);
//     }
//   };

//   // Handle Decline Request
//   const handleDeclineRequest = async (requestID: number) => {
//     try {
//       const response = await fetch(`${API_URL}/${requestType}/${requestID}/accept-or-reject/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           response: 'Reject',
//         }),
//       });

//       if (response.ok) {
//         // Remove the request from the list after declining
//         setPrintRequests((prevRequests) =>
//           prevRequests.filter((request) => request.requestID !== requestID)
//         );
//         alert('Request declined!');
//       } else {
//         console.error('Failed to decline the request');
//       }
//     } catch (error) {
//       console.error('Error declining the request:', error);
//     }
//   };

//   // Handle Finalize Request (status: 'Aceptada')
//   const handleFinalizeRequest = async (requestID: number) => {
//     try {
//       const response = await fetch(`${API_URL}/${requestType}/${requestID}/finalize/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}),
//       });

//       if (response.ok) {
//         setPrintRequests((prevRequests) =>
//           prevRequests.map((request) =>
//             request.requestID === requestID ? { ...request, status: 'Realizada' } : request
//           )
//         );
//         alert('Request finalized!');
//       } else {
//         console.error('Failed to finalize the request');
//       }
//     } catch (error) {
//       console.error('Error finalizing the request:', error);
//     }
//   };

//   // Handle Mark as Delivered Request (status: 'Finalizada')
//   const handleMarkAsDelivered = async (requestID: number) => {
//     try {
//       const response = await fetch(`${API_URL}/${requestType}/${requestID}/mark-as-delivered/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}),
//       });

//       if (response.ok) {
//         setPrintRequests((prevRequests) =>
//           prevRequests.map((request) =>
//             request.requestID === requestID ? { ...request, status: 'Entregada' } : request
//           )
//         );
//         alert('Request marked as delivered!');
//       } else {
//         console.error('Failed to mark as delivered');
//       }
//     } catch (error) {
//       console.error('Error marking as delivered:', error);
//     }
//   };

//   const pendingRequests = printRequests.filter((req: PrintRequest) => req.status === 'Pendiente');
//   const quotedRequests = printRequestsQuoted;
//   const acceptedRequests = printRequests.filter((req: PrintRequest) => req.status === 'Aceptada');
//   const finalizedRequests = printRequests.filter((req: PrintRequest) => req.status === 'Realizada');
//   const deliveredRequests = printRequests.filter((req: PrintRequest) => req.status === 'Entregada');

//   return {
//     pendingRequests,
//     quotedRequests,
//     acceptedRequests,
//     finalizedRequests,
//     deliveredRequests,
//     priceInputs,
//     expandedTable,
//     setExpandedTable,
//     handlePriceChange,
//     handleAcceptRequest,
//     handleDeclineRequest,
//     handleFinalizeRequest,
//     handleMarkAsDelivered,
//     addToQuotedArray
//   };
// };

// export default usePrintRequests;


import { useState, useEffect } from 'react';
import { API_URL } from '@/api/api';
import { PrintRequest } from '@/types/PrintRequests';
import { useRouter } from 'next/navigation';

const usePrintRequests = (requestType: 'print-requests' | 'design-requests') => {
  const [printRequests, setPrintRequests] = useState<PrintRequest[]>([]);
  const [printRequestsQuoted, setPrintRequestsQuoted] = useState<PrintRequest[]>([]);
  const [priceInputs, setPriceInputs] = useState<{ [key: number]: string }>({});
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const endQuoted =
          requestType === 'print-requests' ? 'print-reverse-auction' : 'design-reverse-auctions';

        // Start loading when starting the fetch
        setLoading(true);

        const [printResponse, quotedResponse] = await Promise.all([
          fetch(`${API_URL}/${requestType}/seller/`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }),
          fetch(`${API_URL}/${endQuoted}/seller/`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }),
        ]);

        // Handle the print requests response
        if (printResponse.ok) {
          const printData: PrintRequest[] = await printResponse.json();
          // Exclude requests with 'quoted' status
          const filteredPrintData = printData.filter((request) => request.status !== 'quoted');
          setPrintRequests(filteredPrintData);
        } else {
          console.error('Failed to fetch print requests');
        }

        // Handle the quoted requests response
        if (quotedResponse.ok) {
          const quotedData: PrintRequest[] = await quotedResponse.json();
          setPrintRequestsQuoted(quotedData);
        } else {
          console.error('Failed to fetch quoted requests');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        // Stop loading once done
        setLoading(false);
      }
    };

    fetchRequests();
  }, [requestType]);

  const handlePriceChange = (requestID: number, value: string) => {
    setPriceInputs((prev) => ({ ...prev, [requestID]: value }));
  };

  const addToQuotedArray = (request: PrintRequest) => {
    setPrintRequestsQuoted((prevQuotedRequests) => [...prevQuotedRequests, request]);
  };

  const handleAcceptRequest = async (requestID: number) => {
    const price = priceInputs[requestID];
    if (!price || isNaN(Number(price))) {
      alert('Please enter a valid price.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/accept-or-reject/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: 'Accept',
          price: Number(price),
        }),
      });

      if (response.ok) {
        const updatedRequest = { status: 'Cotizada', price: Number(price).toString() };

        setPrintRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestID === requestID ? { ...request, ...updatedRequest } : request
          )
        );

        const acceptedRequest = printRequests.find((r) => r.requestID === requestID);
        if (acceptedRequest) {
          setPrintRequestsQuoted((prevRequests) => [
            ...prevRequests,
            { ...acceptedRequest, ...updatedRequest },
          ]);
        }

        alert('Request accepted!');
      } else {
        console.error('Failed to accept the request');
      }
    } catch (error) {
      console.error('Error accepting the request:', error);
    }
  };

  const handleDeclineRequest = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/accept-or-reject/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: 'Reject' }),
      });

      if (response.ok) {
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

  const handleFinalizeRequest = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/finalize/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

  const handleMarkAsDelivered = async (requestID: number) => {
    try {
      const response = await fetch(`${API_URL}/${requestType}/${requestID}/mark-as-delivered/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

  const pendingRequests = printRequests.filter((req: PrintRequest) => req.status === 'Pendiente');
  const quotedRequests = printRequestsQuoted;
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
    addToQuotedArray,
    loading 
  };
};

export default usePrintRequests;

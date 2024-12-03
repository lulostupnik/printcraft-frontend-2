
'use client';

import { API_URL } from "@/api/api";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MPResponsePage() {
  const searchParams = useSearchParams(); // Access query parameters
  const [status, setStatus] = useState<string | null>(null); // State to store status

  useEffect(() => {
    // Extract the status from the URL before the "?" symbol
    const url = window.location.href;
    const statusFromUrl = url.split('?')[0].split('/').pop(); // Get the last part of the URL path
    setStatus(statusFromUrl || 'unknown'); // Default to 'unknown' if status is not found

    // Extract necessary parameters from query parameters
    const collectionStatus = searchParams.get('collection_status');
    const preferenceId = searchParams.get('preference_id');
    const externalReference = searchParams.get('external_reference');

    const modelTypeFromUrl = statusFromUrl?.startsWith('success_') ? statusFromUrl.replace('success_', '') : null;
   
    console.log(modelTypeFromUrl);

    // Prepare the data object
    const data_fede2 = {
      data: {
        status: collectionStatus,
        id: preferenceId,
        // model: modelTypeFromUrl,
      },
    };

    const data2 = {
      
        status: collectionStatus,
        id: preferenceId,
        model: modelTypeFromUrl,
    };

    
    const data_fede = {
      status: collectionStatus,
      id: preferenceId,
    //  model: modelTypeFromUrl,
  };

    // Retrieve the access token from localStorage or any other storage you use
    const accessToken = localStorage.getItem('accessToken');

    // Check if accessToken exists
    if (!accessToken) {
      console.error('User is not authenticated');
      return;
    }

    fetch(`${API_URL}/mpresponse/success/${modelTypeFromUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data_fede2),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Backend response:', responseData);
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header showCart={false} />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Payment Response</h1>

        {/* Display status message */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
    
            <h2 className="text-2xl font-semibold text-green-500">{status}</h2>
          
        </div>

        {/* Display all query details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <ul>
            {Array.from(searchParams.entries()).map(([key, value]) => (
              <li key={key} className="mb-2">
                <strong>{key}: </strong>
                {value || 'Not provided'}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

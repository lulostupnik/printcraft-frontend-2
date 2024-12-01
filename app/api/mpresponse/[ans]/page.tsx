'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MPResponsePage() {
  const searchParams = useSearchParams(); // Access query parameters
  const [status, setStatus] = useState<string | null>(null); // State to store status

  useEffect(() => {
    // Extract the status from the URL before the "?" symbol
    const url = window.location.href;
    const statusFromUrl = url.split('?')[0].split('/').pop(); // Get the last part of the URL path
    setStatus(statusFromUrl || 'unknown'); // Default to 'unknown' if status is not found
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Payment Response</h1>
      
      {/* Display status message */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        {status === 'success' && (
          <h2 className="text-2xl font-semibold text-green-500">Payment Successful!</h2>
        )}
        {status === 'failure' && (
          <h2 className="text-2xl font-semibold text-red-500">Payment Failed.</h2>
        )}
        {status === 'pending' && (
          <h2 className="text-2xl font-semibold text-yellow-500">Payment Pending.</h2>
        )}
        {(status !== 'success' && status !== 'failure' && status !== 'pending')   && (
          <h2 className="text-2xl font-semibold text-gray-400">Unknown Payment Status.</h2>
        )}
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
  );
}


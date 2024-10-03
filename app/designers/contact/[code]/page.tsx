'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [hasDesign, setHasDesign] = useState<boolean>(false);
  const params = useParams();
  const code = params.code;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Seller for Designer {code}</h1>

        {/* Form Section */}
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={hasDesign}
              onChange={() => setHasDesign(!hasDesign)}
            />
            <span>I already have a 3D design (STL file)</span>
          </label>

          {/* STL Upload Section - Always Present */}
          

          {/* Description Section - Always Present */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Describe Your Idea</h3>
            {hasDesign ? (
              <p className="text-gray-300 mb-4">You can add any additional information about your design here.</p>
            ) : (
              <p className="text-gray-300 mb-4">
                Please describe your idea in detail, so we can assist you with the design and printing.
              </p>
            )}
            <textarea
              className="w-full p-2 rounded text-gray-900"
              placeholder="Describe your idea or provide additional information here..."
              rows={4}
            ></textarea>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Upload Your Design (Optional)</h3>
            {hasDesign ? (
              <p className="text-gray-300 mb-4">Since you have a design, please upload your STL file below.</p>
            ) : (
              <p className="text-gray-300 mb-4">
                If you already have a design, feel free to upload your STL file here.
              </p>
            )}
            <input
              type="file"
              accept=".stl"
              className="mb-4 text-gray-900"
            />
          </div>

          {/* Reference Image Section - Always Present */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Upload a Reference Image (Optional)</h3>
            <p className="text-gray-300 mb-4">If you have any reference images, please upload them here.</p>
            <input
              type="file"
              accept="image/*"
              className="mb-4 text-gray-900"
            />
          </div>

          {/* Submit Button - Always Present */}
          <button className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500">
            Submit
          </button>
        </div>

      </main>
      <Footer/>
    </div>
  );
};

export default ContactPage;

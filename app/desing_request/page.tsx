'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

type DesignRequest = {
  id: number
  description: string
  responses: string[]
}

export default function DesignRequestsPage() {
  const [requests, setRequests] = useState<DesignRequest[]>([])
  const [newRequest, setNewRequest] = useState('')
  const [newResponse, setNewResponse] = useState('')
  const [respondingTo, setRespondingTo] = useState<number | null>(null)
  const router = useRouter()

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRequest.trim()) {
      setRequests([...requests, { id: Date.now(), description: newRequest, responses: [] }])
      setNewRequest('')
    }
  }

  const handleSubmitResponse = (e: React.FormEvent, requestId: number) => {
    e.preventDefault()
    if (newResponse.trim()) {
      setRequests(requests.map(req => 
        req.id === requestId 
          ? { ...req, responses: [...req.responses, newResponse] }
          : req
      ))
      setNewResponse('')
      setRespondingTo(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto mt-16 p-4 flex-grow">
        <h1 className="text-4xl font-bold mb-8">Design Requests</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Post a Design Request</h2>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <textarea
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
              placeholder="I need a design for..."
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
              rows={4}
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Post Request
            </button>
          </form>
        </div>

        <div className="space-y-8">
          {requests.map(request => (
            <div key={request.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Design Request</h3>
              <p className="mb-4">{request.description}</p>
              <div className="space-y-4">
                {request.responses.map((response, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <p>{response}</p>
                  </div>
                ))}
              </div>
              {respondingTo === request.id ? (
                <form onSubmit={(e) => handleSubmitResponse(e, request.id)} className="mt-4 space-y-4">
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Your response..."
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
                    rows={4}
                    required
                  />
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                    Submit Response
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setRespondingTo(request.id)} 
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Respond
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}

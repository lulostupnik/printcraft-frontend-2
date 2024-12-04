"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Request {
  id: number;
  description: string;
  clientName: string;
}

const mockRequests: Request[] = [
  { id: 1, description: "Necesito una carcasa personalizada para mi teléfono.", clientName: "Juan Pérez" },
  { id: 2, description: "Quiero un soporte para bicicleta con diseño único.", clientName: "María López" },
  { id: 3, description: "Requiero una maceta en 3D con forma de elefante.", clientName: "Carlos Rodríguez" },
  { id: 4, description: "Busco un modelo de gafas estilo vintage impreso en 3D.", clientName: "Ana Gómez" },
];

export default function RequestSelection() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleSelectRequest = (request: Request) => {
    setSelectedRequest(request);
  };

  const handleConfirmRequest = () => {
    if (selectedRequest) {
      // Aquí iría la lógica para que el vendedor confirme que va a tomar la request
      console.log("Request confirmada:", selectedRequest);
      alert(`Request confirmada: ${selectedRequest.description}`);
      setSelectedRequest(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
    <Header />

    <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Requests Disponibles</h1>
        <div className="grid grid-cols-2 gap-4">
          {mockRequests.map((request) => (
            <div key={request.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Cliente: {request.clientName}</h3>
              <p className="mb-4">{request.description}</p>
              <button
                onClick={() => handleSelectRequest(request)}
                className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500"
              >
                Seleccionar Request
              </button>
            </div>
          ))}
        </div>

        {selectedRequest && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Request Seleccionada</h2>
            <p><strong>Cliente:</strong> {selectedRequest.clientName}</p>
            <p><strong>Descripción:</strong> {selectedRequest.description}</p>
            <button
              onClick={handleConfirmRequest}
              className="bg-green-600 text-white py-2 px-4 rounded-full mt-4 hover:bg-green-500"
            >
              Confirmar Request
            </button>
            <button
              onClick={() => setSelectedRequest(null)}
              className="bg-red-600 text-white py-2 px-4 rounded-full mt-4 hover:bg-red-500 ml-4"
            >
              Cancelar
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

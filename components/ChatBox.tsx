'use client';

import React, { useState } from 'react';
import { API_URL } from '@/api/api';
//import ReactMarkdown from 'react-markdown';

export default function ChatBox() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string, text: string, productId?: number }>>([
    {
      role: 'assistant',
      text: '¡Hola! Soy CositoAI, tu asistente personal. Estoy aquí para ayudarte a encontrar ese producto de impresión 3D que necesitas. Pregúntame por cualquier artículo y te ayudaré a localizarlo.',
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;

    const inputToSend = userInput;
    setUserInput('');
    setIsChatLoading(true);

    const newMessages = [...messages, { role: 'user', text: inputToSend }];
    setMessages(newMessages);

    try {
      const response = await fetch(`${API_URL}/cosito/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputToSend }),
      });

      let assistantMessage: { role: string, text: string, productId?: number } = {
        role: 'assistant',
        text: 'No se encontró una respuesta.',
      };

      if (response.ok) {
        const data = await response.json();
        assistantMessage = { 
          role: 'assistant', 
          text: data.output,
          productId: data.product_id
        };
      } else {
        assistantMessage = { 
          role: 'assistant', 
          text: 'Error en el servidor al procesar tu solicitud.' 
        };
      }

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending chat request:', error);
      setMessages([...newMessages, { role: 'assistant', text: 'Ha ocurrido un error.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" >
      {isChatOpen ? (
        <div className="w-96 border border-gray-700 shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-medium">CositoAI - Tu Asistente</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          {/* Chat messages container */}
          <div className="bg-gray-900 p-4 h-[450px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded mb-2 ${
                  message.role === 'user' 
                    ? 'bg-blue-500 ml-auto text-right' 
                    : 'bg-gray-600 mr-auto text-left'
                }`}
              >
                <p className="text-white">{message.text}</p>
                {message.productId && (
                  <a 
                    href={`./products/${message.productId}`} 
                    className="underline text-blue-200"
                  >
                    Ver producto
                  </a>
                )}
              </div>
            ))}
            {isChatLoading && <div className="text-gray-400">Escribiendo...</div>}
          </div>

          {/* Input container */}
          <div className="bg-gray-700 p-3 rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Escribe un mensaje..."
                className="flex-1 min-w-0 bg-white text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              <button 
                onClick={handleChatSubmit}
                disabled={isChatLoading || !userInput.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Botón flotante para abrir el chat
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

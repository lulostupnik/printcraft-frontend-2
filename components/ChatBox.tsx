'use client';

import React, { useState } from 'react';
import { API_URL } from '@/api/api';

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

    const inputToSend = userInput; // Save current input
    setUserInput(''); // Clear the input immediately

    setIsChatLoading(true);

    // Add the user's message to the chat before the API call
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
        assistantMessage = { role: 'assistant', text: data.output };
        if (data.product_id) {
          assistantMessage.productId = data.product_id;
        }
      } else {
        assistantMessage = { role: 'assistant', text: 'Error en el servidor al procesar tu solicitud.' };
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
    <div className="fixed bottom-4 right-4">
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬
        </button>
      )}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-lg shadow-2xl w-64 sm:w-80 h-96 flex flex-col">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-t-lg">
            <span className="font-bold">CositoAI - Tu Asistente</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-2 rounded ${
                  message.role === 'user' ? 'bg-blue-500 ml-auto text-right' : 'bg-gray-600 mr-auto text-left'
                }`}
              >
                <p>{message.text}</p>
                {message.productId && (
                  <a href={`./products/${message.productId}`} className="underline text-blue-200">
                    Ver producto
                  </a>
                )}
              </div>
            ))}
            {isChatLoading && <div className="text-gray-400">Escribiendo...</div>}
          </div>
          <div className="p-3 bg-gray-700 rounded-b-lg">
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 rounded text-black mr-2"
                placeholder="Escribe un mensaje..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleChatSubmit();
                }}
              />
              <button
                onClick={handleChatSubmit}
                disabled={isChatLoading || !userInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'image' | 'stl';
  fileUrl?: string;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Fize @fizemusic',
      messages: [
        {
          id: 1,
          sender: 'L',
          text: 'Hola, Fize, ¿puedes ayudarme con: un mix?',
          timestamp: '03 oct 2024, 17:43',
          type: 'text',
        },
      ],
    },
    {
      id: 2,
      name: 'Designer @john_doe',
      messages: [
        {
          id: 1,
          sender: 'L',
          text: 'Hola, John, ¿cómo estás?',
          timestamp: '02 oct 2024, 10:00',
          type: 'text',
        },
        {
          id: 2,
          sender: 'John',
          text: 'Hola! Estoy bien, ¿y tú?',
          timestamp: '02 oct 2024, 10:15',
          type: 'text',
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' || attachment) {
      const newMsg: Message = {
        id: activeChat?.messages.length ? activeChat.messages.length + 1 : 1,
        sender: 'L',
        text: newMessage,
        timestamp: new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' }),
        type: attachment ? (attachment.type.includes('stl') ? 'stl' : 'image') : 'text',
        fileUrl: attachment ? URL.createObjectURL(attachment) : undefined,
      };
      const updatedChats = chats.map((chat) =>
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, newMsg] } : chat
      );
      setChats(updatedChats);
      setNewMessage('');
      setAttachment(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Todos los mensajes</h2>
          <div className="flex flex-col gap-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`cursor-pointer p-3 rounded-lg ${
                  activeChatId === chat.id ? 'bg-blue-600' : 'bg-gray-700'
                } hover:bg-blue-500`}
              >
                <p className="font-bold">{chat.name}</p>
                <p className="text-gray-400">
                  Último mensaje: {chat.messages[chat.messages.length - 1]?.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-grow bg-gray-800 p-6 rounded-lg flex flex-col">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <h3 className="text-2xl font-bold">{activeChat?.name}</h3>
            <p className="text-gray-400">
              Visto por última vez: Hace 19 horas | Hora local: 03 oct 2024, 17:43
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto mb-4">
            {activeChat?.messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 p-3 rounded-lg ${
                  message.sender === 'L' ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {message.type === 'text' && <p className="text-sm">{message.text}</p>}
                {message.type === 'image' && (
                  <img src={message.fileUrl} alt="Attachment" className="w-48 h-48 rounded-lg mb-2" />
                )}
                {message.type === 'stl' && (
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-300"
                  >
                    Descargar archivo STL
                  </a>
                )}
                <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
              </div>
            ))}
          </div>

          {/* Input Field for New Message */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enviar mensaje..."
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white"
            />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-gray-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-500 cursor-pointer"
            >
              Adjuntar
            </label>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-500"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatPage;

import React, { useState, useEffect } from 'react';
import { Share2, Clipboard, Trash2 } from 'lucide-react';
import TextList from './components/TextList';
import RoomLink from './components/RoomLink';
import { initializeWebSocket, sendMessage } from './utils/websocket';

function App() {
  const [receivedTexts, setReceivedTexts] = useState<string[]>([]);
  const [sentTexts, setSentTexts] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const ws = initializeWebSocket((message) => {
      setReceivedTexts((prev) => [...prev, message]);
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleSendText = () => {
    navigator.clipboard.readText().then((text) => {
      sendMessage(text);
      setSentTexts((prev) => [...prev, text]);
    });
  };

  const handleClearHistory = () => {
    setReceivedTexts([]);
    setSentTexts([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TextShare</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <button
          onClick={handleSendText}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center w-full mb-4"
        >
          <Share2 className="mr-2" size={18} />
          Enviar texto copiado
        </button>
        <TextList title="Textos recibidos" texts={receivedTexts} icon={<Clipboard size={18} />} />
        <TextList title="Textos enviados" texts={sentTexts} icon={<Share2 size={18} />} />
        <button
          onClick={handleClearHistory}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center w-full mt-4"
        >
          <Trash2 className="mr-2" size={18} />
          Limpiar historial
        </button>
      </div>
      <RoomLink roomId={roomId} />
    </div>
  );
}

export default App;
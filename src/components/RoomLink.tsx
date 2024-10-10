import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface RoomLinkProps {
  roomId: string;
}

const RoomLink: React.FC<RoomLinkProps> = ({ roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://textshare.app/room/${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshRoom = () => {
    // Implementar la lógica para generar un nuevo roomId
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Enlace de la sala</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={`https://textshare.app/room/${roomId}`}
          readOnly
          className="flex-grow bg-gray-100 p-2 rounded-l-md"
        />
        <button
          onClick={handleCopyLink}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          {copied ? 'Copiado' : <Copy size={18} />}
        </button>
      </div>
      <button
        onClick={handleRefreshRoom}
        className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center w-full"
      >
        <RefreshCw className="mr-2" size={18} />
        Generar nueva sala
      </button>
    </div>
  );
};

export default RoomLink;
let ws: WebSocket;

export function initializeWebSocket(onMessage: (message: string) => void): WebSocket {
  // Reemplazar con la URL real del servidor WebSocket
  ws = new WebSocket('wss://textshare.app/ws');

  ws.onopen = () => {
    console.log('Conexión WebSocket establecida');
  };

  ws.onmessage = (event) => {
    onMessage(event.data);
  };

  ws.onerror = (error) => {
    console.error('Error en la conexión WebSocket:', error);
  };

  ws.onclose = () => {
    console.log('Conexión WebSocket cerrada');
  };

  return ws;
}

export function sendMessage(message: string) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error('La conexión WebSocket no está abierta');
  }
}
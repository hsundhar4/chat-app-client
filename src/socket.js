// socket.js
import { io } from 'socket.io-client';

// Replace with your server URL (e.g., http://localhost:3000 or your deployed backend)
const SOCKET_SERVER_URL = 'http://localhost:3000';

// Create and export the socket instance
const socket = io(SOCKET_SERVER_URL, {
  transports: ['websocket'], // Optional: forces WebSocket transport
  reconnectionAttempts: 5,   // Optional: retry limit
  timeout: 10000             // Optional: connection timeout
});

export default socket;

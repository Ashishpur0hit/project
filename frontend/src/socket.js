import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        transports: ['websocket'], // WebSocket is required for communication
        reconnectionAttempts: Infinity,
        timeout: 10000,
    };

    try {
        const socket = io("http://localhost:3000", options); // Ensure the URL matches your server
        return socket;
    } catch (error) {
        console.error("Socket connection failed:", error);
    }
};

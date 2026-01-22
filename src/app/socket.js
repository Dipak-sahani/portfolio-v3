import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : import.meta.env.VITE_API_BACKEND_URL;


const socket = io(import.meta.env.VITE_API_BACKEND_URL, {
  transports: ["websocket"], // IMPORTANT
  autoConnect: false, // ❗ IMPORTANT
  withCredentials: true,
});

export default socket;
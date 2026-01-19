import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';


const socket = io("http://localhost:8000", {
  transports: ["websocket"], // IMPORTANT
  autoConnect: false, // ❗ IMPORTANT
  withCredentials: true,
});

export default socket;
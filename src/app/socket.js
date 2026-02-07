import { io } from 'socket.io-client';
import { getAuthToken } from '../services/auth.service';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : import.meta.env.VITE_API_BACKEND_URL;
const token = getAuthToken();

let socket;
try {

  socket = io(import.meta.env.VITE_API_BACKEND_URL, {
    transports: ["websocket"], // IMPORTANT
    auth: {
      token, // 🔥 send JWT here
    },
    autoConnect: false, // ❗ IMPORTANT
    withCredentials: true,
  });
} catch (error) {


}

export default socket;
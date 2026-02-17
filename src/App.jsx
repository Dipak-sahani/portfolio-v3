

import AppRoutes from "./routes/route";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import socket from "./app/socket";
function App() {



  const user = useAuthStore((state) => state.user);



  useEffect(() => {
    if (!user?._id) return;

    // connect once
    socket.connect();


    socket.on("connect", () => {
      console.log("✅ Global socket connected:", socket.id);

      // Register user to backend
      socket.emit("register_user", {
        userId: user._id,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Global socket disconnected");
    });

    return () => {
      // only disconnect if user logs out
      socket.disconnect();
    };
  }, [user?._id]);


  return <>

    <AppRoutes />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      limit={1}
      newestOnTop={true}
      preventDuplicates={true}
    />


  </>;
}

export default App;

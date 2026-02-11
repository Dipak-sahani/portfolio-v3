import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import socket from "../app/socket";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Layout() {

  const location = useLocation();

  const hideFooter = location.pathname.startsWith("/chat");

  useEffect(() => {
    // if (!socket.connected) {
    //   toast.info("Socket not connected at startup", {
    //     autoClose: 2000
    //   });
    // }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white h-20">
        <Header />
      </div>

      <div className="mt-20 flex-grow">
        <Outlet />
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}



export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
function Layout() {

  const location=useLocation();

  const hideFooter = location.pathname.startsWith("/chat");

  return (
    <div>
  <div className="fixed top-0 left-0 w-full z-50 bg-white h-20">
    <Header />
  </div>

  <div className="mt-20">
    <Outlet />

    {!hideFooter && <Footer />}
  </div>
</div>

  );
}

export default Layout;

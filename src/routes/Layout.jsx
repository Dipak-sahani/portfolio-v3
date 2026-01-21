import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
function Layout() {
  return (
    <div>
  <div className="fixed top-0 left-0 w-full z-50 bg-white h-20">
    <Header />
  </div>

  <div className="mt-20">
    <Outlet />
  </div>
</div>

  );
}

export default Layout;

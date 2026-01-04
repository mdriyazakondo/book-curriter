import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className=" min-h-[92vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

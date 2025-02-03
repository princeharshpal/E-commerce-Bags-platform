import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

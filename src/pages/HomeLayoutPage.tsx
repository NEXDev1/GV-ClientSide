import React from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const HomeLayoutPage: React.FC = () => {
  return (
    <>
      <Header />
      <Sidebar />

      <main className="p-4 md:ml-64  h-auto pt-20">
        <div className="">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayoutPage;

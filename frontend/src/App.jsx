import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header"; // Adjust the import path as needed

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2024 E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;

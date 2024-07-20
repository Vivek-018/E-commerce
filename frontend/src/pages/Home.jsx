import React from "react";
import { Cart } from "../components";

function Home() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Cart  />
      <Cart />
      <Cart />
      <Cart />
      <Cart />
      <Cart />
      <Cart />
      <Cart />
     
    </div>
  </>
  );
}

export default Home;

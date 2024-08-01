import React from "react";

const Unauthorized = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-xl">
        You do not have permission to view this page. Please contact the
        administrator if you believe this is an error.
      </p>
    </div>
  );
};

export default Unauthorized;

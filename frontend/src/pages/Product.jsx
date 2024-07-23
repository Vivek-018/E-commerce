import React from "react";

const Product = ({ product }) => {
  // Assuming product object has id, name, price, and imageUrl properties
  const { name, price, imageUrl } = {
    name: "abc",
    price: 400,
    imageUrl: "/http:.",
  };

  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log("Added to cart:", name);
  };

  const handleBuyNow = () => {
    // Implement buy now logic here
    console.log("Buying now:", name);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">${price.toFixed(2)}</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 flex-grow"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 flex-grow"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

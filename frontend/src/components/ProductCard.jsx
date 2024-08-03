// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addItemToCart } from "../store/cartSlice";
// import { saveCartToAppwrite } from "../Services/appwrite.js";

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user ? user.$id : null;

//   const addToCartHandler = async () => {
//     if (!userId) {
//       alert("Please log in to add items to the cart.");
//       return;
//     }

//     const cartItem = { ...product, quantity: 1 };

//     dispatch(addItemToCart(cartItem));

//     // Save cart data to Appwrite
//     try {
//       await saveCartToAppwrite(userId, [...cart.items, cartItem]);
//       console.log("Cart saved successfully!");
//     } catch (error) {
//       console.error("Failed to save cart:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-between border p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 max-w-xs w-full">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-full h-40 object-cover mb-4 rounded"
//       />
//       <h2 className="text-xl font-bold text-center">{product.title}</h2>
//       <p className="text-lg text-center">{product.price}</p>
//       <div className="mt-4 flex space-x-2">
//         <button
//           onClick={addToCartHandler}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
//         >
//           Add to Cart
//         </button>
//         <Link
//           to={`/product/${product.id}`}
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full text-center"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.$id : null;

  const addToCartHandler = () => {
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }
    dispatch(addItemToCart({ ...product, userId }));
  };

  return (
    <div className="flex flex-col items-center justify-between border p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105">
      <img
        src={product.image}
        alt={product.title}
        className="w-40 h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p className="text-lg">{product.price}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={addToCartHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

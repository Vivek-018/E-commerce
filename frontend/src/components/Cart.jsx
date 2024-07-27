// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeItemFromCart } from "../store/cartSlice";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);
//   const totalPrice = useSelector((state) => state.cart.totalPrice);

//   const removeFromCartHandler = (id) => {
//     dispatch(removeItemFromCart(id));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Your Cart</h2>
//       <p>Total Items: {totalQuantity}</p>
//       <p>Total Price: ${totalPrice.toFixed(2)}</p>
//       {cartItems.length === 0 && <p>Your cart is empty!</p>}
//       {cartItems.map((item) => (
//         <div key={item.id} className="border p-4 rounded mb-4">
//           <h2 className="font-bold">{item.name}</h2>
//           <p>Quantity: {item.quantity}</p>
//           <p>Total: ${item.totalPrice.toFixed(2)}</p>
//           <button
//             onClick={() => removeFromCartHandler(item.id)}
//             className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Remove from Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const buyNowHandler = () => {
    // Handle the buy now functionality, e.g., navigate to the checkout page
    alert("Proceed to checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold text-xl">{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${item.totalPrice}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                  <button
                    onClick={() => removeFromCartHandler(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4 sm:mb-0">
              <p className="text-lg font-semibold">
                Total Items: {totalQuantity}
              </p>
              <p className="text-lg font-semibold">
                Total Price: ${totalPrice}
              </p>
            </div>
            <button
              onClick={buyNowHandler}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

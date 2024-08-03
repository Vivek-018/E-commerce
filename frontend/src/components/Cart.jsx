// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeItem } from "../store/cartSlice";
// import {
//   saveCartToAppwrite,
//   fetchCartFromAppwrite,
// } from "../Services/appwrite.js";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const userId = useSelector((state) => state.auth.userId);

//   useEffect(() => {
//     const loadCart = async () => {
//       const savedCart = await fetchCartFromAppwrite(userId);
//       savedCart.forEach((item) => dispatch(addItem(item)));
//     };

//     if (userId) {
//       loadCart();
//     }
//   }, [userId, dispatch]);

//   const handleRemoveItem = (id) => {
//     dispatch(removeItem(id));
//     saveCartToAppwrite(
//       userId,
//       cartItems.filter((item) => item.id !== id)
//     );
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             {item.name} - ${item.price} x {item.quantity}
//             <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { removeItem, clearCart } from '../store/cartSlice';

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleRemoveItem = (id) => {
//     dispatch(removeItem(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {cart.items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cart.items.map((item) => (
//               <li key={item.id} className="flex justify-between items-center mb-2">
//                 <div>
//                   <h2 className="font-bold">{item.title}</h2>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Price: {item.price}</p>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveItem(item.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <p className="font-bold">Total Amount:{cart.totalAmount}</p>
//             <button
//               onClick={handleClearCart}
//               className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//             >
//               Clear Cart
//             </button>
//             <Link
//               to="/checkout"
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2"
//             >
//               Checkout
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

// update

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const removeItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-600">{item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItemHandler(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-lg font-bold">
                Total Quantity: {totalQuantity}
              </p>
              <p className="text-lg font-bold">Total Amount: {totalAmount}</p>
              <button
                onClick={checkoutHandler}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../store/cartSlice";
// import { saveOrderToAppwrite } from "../Services/appwrite.js";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const userId = useSelector((state) => state.auth.userId);
//   const [address, setAddress] = useState("");

//   const handleCheckout = async () => {
//     const order = {
//       userId,
//       items: cartItems,
//       address,
//       totalAmount: cartItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//     };
//     await saveOrderToAppwrite(order);
//     dispatch(clearCart());
//     // Redirect to confirmation page
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <button onClick={handleCheckout}>Place Order</button>
//     </div>
//   );
// };

// export default Checkout;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../store/cartSlice";
// import { saveOrderToAppwrite } from "../Services/appwrite";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user ? user.$id : null;

//   const placeOrderHandler = async () => {
//     if (!userId) {
//       alert("Please log in to place the order.");
//       return;
//     }

//     const orderData = {
//       userId: userId,
//       items: cart.items,
//       totalAmount: cart.totalAmount,
//       orderStatus: "Pending",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       await saveOrderToAppwrite(orderData);
//       dispatch(clearCart());
//       alert("Order placed successfully!");
//     } catch (error) {
//       console.error("Failed to place order:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <button onClick={placeOrderHandler}>Place Order</button>
//     </div>
//   );
// };

// export default Checkout;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { saveOrderToAppwrite } from "../Services/appwrite";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const userId = user ? user.$id : null;

  const placeOrderHandler = async () => {
    if (!userId) {
      alert("Please log in to place the order.");
      return;
    }

    const orderData = {
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      orderStatus: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveOrderToAppwrite(orderData);
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div>
        <p className="font-bold">Total Amount: {cart.totalAmount}</p>
        <button
          onClick={placeOrderHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;

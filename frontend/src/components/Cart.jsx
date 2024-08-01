import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, fetchCartData } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const userId = useSelector((state) => state.auth.user?.$id); // Assuming userId is in auth state

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartData(userId));
    }
  }, [dispatch, userId]);

  if (!userId) {
    return (
      <p className="text-red-600">
        User not logged in. Please log in to view your cart.
      </p>
    );
  }

  const removeFromCartHandler = (id) => {
    // dispatch(removeItemFromCart({ id, userId }));
    dispatch(removeItemFromCart({ id }));
    dispatch(saveCartData({ cartState: getState().cart, userId }));
  };

  const buyNowHandler = () => {
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

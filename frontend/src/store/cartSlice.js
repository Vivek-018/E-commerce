import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0,
  totalPrice: JSON.parse(localStorage.getItem("cartTotalPrice")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalPrice += newItem.price;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem("cartTotalPrice", JSON.stringify(state.totalPrice));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalPrice -= existingItem.price;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem("cartTotalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;

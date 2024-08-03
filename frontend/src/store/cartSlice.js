// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalAmount: 0,

//   },
//   reducers: {
//     addItem(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find((item) => item.id === newItem.id);
//       if (existingItem) {
//         existingItem.quantity += newItem.quantity;
//       } else {
//         state.items.push(newItem);
//       }
//       state.totalAmount += newItem.price * newItem.quantity;
//     },
//     removeItem(state, action) {
//       const id = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);
//       if (existingItem) {
//         state.items = state.items.filter((item) => item.id !== id);
//         state.totalAmount -= existingItem.price * existingItem.quantity;
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addItem, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.id === newItem.id);
//       if (!existingItem) {
//         state.items.push({
//           id: newItem.id,
//           title: newItem.title,
//           price: newItem.price,
//           quantity: 1,
//         });
//         state.totalQuantity++;
//       } else {
//         existingItem.quantity++;
//         state.totalQuantity++;
//       }
//     },
//     removeItem: (state, action) => {
//       const id = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         state.items = state.items.filter(item => item.id !== id);
//         state.totalQuantity -= existingItem.quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.totalQuantity = 0;
//     },
//   },
// });

// export const { addItemToCart, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// update
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalQuantity++;
      }
      state.totalAmount = state.items.reduce(
        (total, item) => Number(total) + Number(item.totalPrice),
        0
      );
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        state.totalQuantity--;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

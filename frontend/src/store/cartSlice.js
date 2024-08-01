import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases, Query } from "../Services/appwrite";
import conf from "../conf/conf";

const DATABASE_ID = conf.appwriteDatabaseId;
const COLLECTION_ID = conf.appwriteCartCollectionId;

// Fetch cart data from Appwrite
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (userId, thunkAPI) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      if (response.documents.length === 0) {
        return { items: [], totalQuantity: 0, totalPrice: 0 };
      }
      const cartData = response.documents[0];
      return {
        items: JSON.parse(cartData.items),
        totalQuantity: cartData.totalQuantity,
        totalPrice: cartData.totalPrice,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Save cart data to Appwrite
// Save cart data to Appwrite
const saveCartData = async (cartState, userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('userId', userId)]
    );

    // Create a plain JavaScript object from the cart state
    const cartData = {
      userId,
      items: JSON.stringify(JSON.parse(JSON.stringify(cartState.items))),
      totalQuantity: cartState.totalQuantity,
      totalPrice: cartState.totalPrice,
    };

    if (response.documents.length === 0) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        cartData
      );
    } else {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        response.documents[0].$id,
        cartData
      );
    }
  } catch (error) {
    console.error("Error saving cart data:", error);
  }
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, price, title, userId } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id,
          price,
          quantity: 1,
          totalPrice: price,
          name: title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += price;
      }

      state.totalPrice += price;

      saveCartData(state, userId);
    },

    removeItemFromCart(state, action) {
      const { id, userId } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        state.totalPrice -= existingItem.price;
      }
      saveCartData(state, userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;


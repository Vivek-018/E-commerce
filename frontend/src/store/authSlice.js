import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../Services/appwrite";
import conf from "../conf/conf";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }) => {
    const response = await account.create("unique()", email, password, name);
    await account.createEmailPasswordSession(email, password);
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await account.deleteSession("current");
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  try {
    const user = await account.get();
    const isAdmin = user.$id === conf.adminUserId;
    // console.log(user);
    // console.log(user.$id);
    // console.log(conf.adminUserId);
    // console.log(isAdmin);
    return { ...user, isAdmin };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading state
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false; // Set loading to false on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true; // Set loading to true while fetching
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false; // Set loading to false when fetching is complete
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false; // Set loading to false on error
      });
  },
});

export default authSlice.reducer;

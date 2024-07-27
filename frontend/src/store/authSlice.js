import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../Services/appwrite";

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
  const user = await account.get();
  return user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Logout case
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FetchUser cases
      .addCase(fetchUser.pending, (state) => {
        // Don't set loading to true for fetchUser
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

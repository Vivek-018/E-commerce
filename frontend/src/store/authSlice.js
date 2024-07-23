
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { account } from '../Services/appwrite';

export const signup = createAsyncThunk('auth/signup', async ({ email, password, name }) => {
  const response = await account.create('unique()', email, password, name);
  await account.createEmailPasswordSession(email, password);
  return response;
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const session = await account.createEmailPasswordSession(email, password);
  return session;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await account.deleteSession('current');
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const user = await account.get();
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default authSlice.reducer;
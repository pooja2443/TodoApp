import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signUpUser, signInUser } from '@/Redux/Thunks/authThunk';

interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthPayload {
  token: string;
  name: string | undefined;
  email: string | undefined;
}

// Initialize auth state
const initialState: AuthState = {
  token: null,
  name: null,
  email: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    signout: (state) => {
        state.token = null;
        state.name = null;
        state.email = null;
        state.isAuthenticated = false;

        AsyncStorage.removeItem('userToken');
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.name = action.payload.name || null;
        state.email = action.payload.email || null;
        state.isAuthenticated = true;

        AsyncStorage.setItem('userToken', action.payload.token);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //signIn
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
        state.isLoading = true;
        state.token = action.payload.token;
        state.name = action.payload.name || null;
        state.email = action.payload.email || null;
        state.isAuthenticated = true;

        AsyncStorage.setItem('userToken', action.payload.token);
      })
      .addCase(signInUser.rejected,(state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
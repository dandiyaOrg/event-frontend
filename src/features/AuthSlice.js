import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user: null, // store logged-in user info here
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload; // payload contains user data (e.g. firstName)
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

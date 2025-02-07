import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  cookieFallback:JSON.parse(localStorage.getItem('cookieFallback') || 'null' ),
  error: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinStart: (state) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.cookieFallback = localStorage.getItem('cookieFallback')
      state.isLoading = false;
      state.error = '';
      localStorage.setItem('currentUser', JSON.stringify(action.payload.currentUser));
    },
    signinFailure: (state) => {
      state.currentUser = null;
      state.error = '';
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = '';
      state.isLoading = false;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, logoutUser } = userSlice.actions;
export default userSlice.reducer;
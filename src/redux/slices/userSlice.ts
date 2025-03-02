import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  token?: string;
}

interface UserState {
  currentUser: User | null;
  error: string;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem("user") || "null"), 
  error: "",
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = "";
      localStorage.setItem("user", JSON.stringify(action.payload)); // Changed to "user"
    },
    signinFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload || "Login failed";
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = "";
      state.isLoading = false;
      localStorage.removeItem("user"); 
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, logoutUser } = userSlice.actions;
export default userSlice.reducer;
// // authService.ts
// import axios from "axios";
// import { Dispatch } from "@reduxjs/toolkit";
// import { signinStart, signinSuccess, signinFailure, logoutUser, setAuthStatus } from "../redux/slices/userSlice";

// export const googleSignIn = () => {
//   window.location.href = "http://localhost:3003/auth/google";
// };

// export const checkAuthStatus:any = () => async (dispatch: Dispatch) => {
//   try {
//     dispatch(signinStart());
//     const response = await axios.get("http://localhost:3003/check-auth", {
//       withCredentials: true
//     });
    
//     if (response.data.isAuthenticated) {
//       dispatch(signinSuccess(response.data.user));
//     } else {
//       dispatch(setAuthStatus(false));
//     }
//   } catch (error) {
//     dispatch(signinFailure("Authentication check failed"));
//   }
// };

// export const logout :any= () => async (dispatch: Dispatch) => {
//   try {
//     await axios.get("http://localhost:3003/logout", {
//       withCredentials: true
//     });
//     dispatch(logoutUser());
//   } catch (error) {
//     dispatch(signinFailure("Logout failed"));
//   }
// };
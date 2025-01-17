import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: !!localStorage.getItem("token"), 
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

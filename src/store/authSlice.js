// this is for authentication reducer aka slice

import { createSlice } from "@reduxjs/toolkit";

//slice ki initial state
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth", //name
  initialState, //initial state
  reducers: {
    //reducers
    login: (state, action) => {
      //if logged in make status true and get user data
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

//as well as individual reducers -->single reducer ko action bolte h
export const { login, logout } = authSlice.actions;

// main slice export
export default authSlice.reducer;

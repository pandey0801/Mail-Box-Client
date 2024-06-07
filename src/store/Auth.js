
import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: 'log',
  initialState: {
    islogin: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.islogin = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.islogin = false;
      state.token = null;
    }
  }
});

export const { login, logout } = logSlice.actions;
export default logSlice.reducer;

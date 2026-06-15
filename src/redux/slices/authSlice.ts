import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  token: null | string;
  loggedUser: TUser | null;
};

const initialState: TAuthState = {
  token: null,
  loggedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.loggedUser = action.payload.user;
    },
    userLogout: (state) => {
      state.token = null;
      state.loggedUser = null;
    },
  },
});

export const { userLoggedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;

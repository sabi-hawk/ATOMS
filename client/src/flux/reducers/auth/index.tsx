import { createSlice } from "@reduxjs/toolkit";

type appUser = {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  isClient: Boolean;
  organization?: string;
  email: string;
  password?: string;
  country?: string;
  __v: number;
  token: string;
  expiresAt: string;
};
type authType = {
  user: appUser;
};
// @ts-ignore
const initialState: authType = {};

const defaultState = {};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, user: action.payload };
      }
      return action.payload;

      // state.user = action.payload;
    },
    // logout: (state = initialState, action) => {
    //   return defaultState;
    // },
  },
});

export default auth.reducer;
export const { setUser } = auth.actions;

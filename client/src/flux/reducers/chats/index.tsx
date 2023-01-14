import { createSlice } from "@reduxjs/toolkit";

type chatType = {
  chats: Array<any>;
};
// @ts-ignore
const initialState: chatType = {};

const chats = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsData: (state = initialState, action) => {
      state.chats = action.payload;
    },
  },
});

export default chats.reducer;
export const { setChatsData } = chats.actions;

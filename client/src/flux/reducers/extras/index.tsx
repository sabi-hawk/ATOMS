import { createSlice } from "@reduxjs/toolkit";

type typeExtras = {
  templates: Array<any>;
};
// @ts-ignore
const initialState: typeExtras = {};

const extras = createSlice({
  name: "extras",
  initialState,
  reducers: {
    setTemplates: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, templates: action.payload };
      }
      return action.payload;
    },
  },
});
export default extras.reducer;

export const { setTemplates } = extras.actions;

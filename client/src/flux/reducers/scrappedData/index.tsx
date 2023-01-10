import { createSlice } from "@reduxjs/toolkit";

type ScrappedDataState = {
  emailRecords: Array<any>;
  //   foundPosts: any;
};
// @ts-ignore
const initialState: ScrappedDataState = {};

const scrappedData = createSlice({
  name: "scrapedData",
  initialState,
  reducers: {
    getEmailRecords: (state = initialState, action) => {
      state.emailRecords = action.payload;
    },
  },
});

export default scrappedData.reducer;
export const { getEmailRecords } = scrappedData.actions;

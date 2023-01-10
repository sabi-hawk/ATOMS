import { createSlice } from "@reduxjs/toolkit";

type ScrappedDataState = {
  search: Object;
  //   foundPosts: any;
};
// @ts-ignore
const initialState: ScrappedDataState = {};

const searchInfo = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInfo: (state = initialState, action) => {
      state.search = action.payload;
    },
  },
});

export default searchInfo.reducer;
export const { setSearchInfo } = searchInfo.actions;

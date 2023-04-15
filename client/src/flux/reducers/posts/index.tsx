import { createSlice } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { createPost } from "../../../api";

type PostState = {
  posts: Array<any>;
  foundPosts: any;
};
// @ts-ignore
const initialState: PostState = {
  posts: [],
  foundPosts: null,
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state = initialState, action) => {
      state.foundPosts = action.payload;
    },
    create: (state = initialState, action): any => {
      state.posts.push(action.payload);
    },
  },
});

export default posts.reducer;

export const { getPosts, create } = posts.actions;

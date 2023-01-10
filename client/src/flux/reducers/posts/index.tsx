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
  foundPosts: null
};

const posts = createSlice({
  name:"posts",
  initialState,
  reducers: {
    getPosts: (state = initialState, action) => {
      state.foundPosts = action.payload;
      // return action.payload;
    },
    create: (state = initialState, action): any => {
      // const {data} = await createPost(action.payload);
      // return [...state.posts, action.payload];
      // state.posts = {...state, posts: action.payload}
      // state.posts.concat(action.payload);
      // state.posts = action.payload;
      state.posts.push(action.payload);
      console.log("INSIDE REDUCER POST",state);
      // @ts-ignore
      // return {...state, posts: state.posts.push(action.payload)}
    }
  }
})

export default posts.reducer;

export const {
  getPosts,
  create
} = posts.actions;

// (state = initialState, action: any) => {
//   switch (action.type) {
//     case "FETCH_ALL":
//       return action.payload;
//     case "CREATE":
//       return state;
//     default:
//       return state;
//   }
// };

// export default reducer;
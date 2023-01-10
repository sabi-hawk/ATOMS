import React from "react";

import useStyles from "./Styles";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state: any) => state.posts);

  console.log("MY TEST FINDS OUT POSTS :", posts);
  return (
    <>
      <Post />
      <Post />
      <Post />
    </>
  );
};
export default Posts;

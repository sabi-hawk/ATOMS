import axios from 'axios';

const url = 'http://localhost:3001/api/posts';

export const fetchPosts = async () => await axios.get(url);
export const createPost = (newPost: any) => axios.post(url, newPost);
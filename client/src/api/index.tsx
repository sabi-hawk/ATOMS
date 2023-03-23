import axios from "axios";
import store from "../flux/store";
import { setUser } from "../flux/reducers/auth";
import { setChatsData } from "../flux/reducers/chats";
import { setTemplates } from "../flux/reducers/extras";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

API.interceptors.request.use(
  (config) => {
    const {
      auth: { user },
    } = store.getState();
    if (user?.token && config.headers) {
      config.headers["auth-token"] = user.token;
    }

    return config;
  },
  (error) => {
    console.log("API Request | Interceptor |  Error", error);
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setUser({}));
      store.dispatch(setChatsData({}));
      store.dispatch(setTemplates({}));
    } else {
      return error?.response;
    }
  }
);
export default API;

const url = "http://localhost:3001/api/posts";
export const fetchPosts = async () => await axios.get(url);
export const createPost = (newPost: any) => axios.post(url, newPost);

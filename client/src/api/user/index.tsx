import axios from "axios";
import API from "../index";

// const API = axios.create({ baseURL: "http://localhost:3001/api" });
export const getUser = async (id: string, token: string) =>
  API.get(`/user/${id}`, {
    headers: {
      "auth-token": token,
    },
  });

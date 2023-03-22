import axios from "axios";
import API from "../index";

// const API = axios.create({ baseURL: "http://localhost:3001/api" });

type loginPayload = {
  email: string;
  password: string;
};
export const userLogin = (loginData: loginPayload) =>
  API.post("/auth/login", loginData);

export const registerProvider = (signUpData: any) =>
  API.post("/auth/register", signUpData);

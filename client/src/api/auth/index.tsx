import API from "../index";

type loginPayload = {
  email: string;
  password: string;
};
export const userLogin = (loginData: loginPayload) =>
  API.post("/auth/login", loginData);

export const registerProvider = (signUpData: any) =>
  API.post("/auth/register", signUpData);

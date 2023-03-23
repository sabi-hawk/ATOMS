import API from "../index";

export const getUser = async (id: string) =>
  API.get(`/user/${id}`);

import axios from "axios";


const API = axios.create({ baseURL: "http://localhost:3001/api" });
export const getUser = async (id: string) => API.get(`/user/${id}`);

import axios from "axios";


const API = axios.create({ baseURL: "http://localhost:3001/api" });
export const userChats = async (id: string) => API.get(`/conversation/chat/user/${id}`);
export const getMessages = async (id: string) =>  API.get(`/conversation/chat/${id}/messages`);
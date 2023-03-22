import axios from "axios";
import API from "../index";

// const API = axios.create({ baseURL: "http://localhost:3001/api" });

type sendMessagePayload = {
  senderId: string;
  text: string;
};
export const userChats = async (id: string, token: string) =>
  API.get(`/conversation/chat/user/${id}`, {
    headers: {
      "auth-token": token,
    },
  });

export const getMessages = async (id: string, token: string) =>
  API.get(`/conversation/chat/${id}/messages`, {
    headers: {
      "auth-token": token,
    },
  });

export const sendMessage = async (
  chatId: string,
  message: sendMessagePayload,
  token: string
) =>
  API.post(`/conversation/chat/${chatId}/message`, message, {
    headers: { "auth-token": token },
  });

export const createConversation = async (
  providerId: string,
  clientId: string,
  token: string
) =>
  API.post(
    "/conversation/chat",
    {
      senderId: clientId,
      receiverId: providerId,
    },
    {
      headers: { "auth-token": token },
    }
  );

export async function sendEmail(mailBody: any, token: string) {
  API.post("/conversation/mailtrap/email", mailBody, {
    headers: { "auth-token": token },
  });
}

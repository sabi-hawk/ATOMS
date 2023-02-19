import { Router } from "express";
import * as conversationChatController from "../../../controller/conversation/chat";

const chatRouter = Router();

chatRouter.post("/", conversationChatController.createChat);
chatRouter.post("/:chatId/message", conversationChatController.sendMessage);
chatRouter.get("/:chatId/message/:messageId", conversationChatController.getMessage);
chatRouter.get("/user/:userId", conversationChatController.userChats);
chatRouter.get("/find/:firstId/:secondId", conversationChatController.findChat)
chatRouter.get("/:chatId", conversationChatController.getChat);
chatRouter.get("/:chatId/messages", conversationChatController.getChatMessages);
export default chatRouter;
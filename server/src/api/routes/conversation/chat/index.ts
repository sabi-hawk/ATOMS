import { Router } from "express";
import * as conversationChatController from "../../../controller/conversation/chat";

const chatRouter = Router();

chatRouter.post("/", conversationChatController.createChat);
chatRouter.post("/:chatId/message", conversationChatController.sendMessage);
chatRouter.get("/:chatId/message/:messageId", conversationChatController.getMessage);
chatRouter.get("/:userId", conversationChatController.userChats);
chatRouter.get("/find/:firstId/:secondId", conversationChatController.findChat)
export default chatRouter;
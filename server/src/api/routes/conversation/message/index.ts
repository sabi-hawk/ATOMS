import { Router } from "express";
import * as conversationMessageController from "../../../controller/conversation/message";

const messageRouter = Router();

messageRouter.post("/", conversationMessageController.addMessage);
messageRouter.get("/:chatId", conversationMessageController.getMessages);


export default messageRouter;
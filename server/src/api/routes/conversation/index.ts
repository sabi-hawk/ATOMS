import { Router } from "express";
import * as conversationController from "../../controller/conversation";
import chatRouter from "./chat";
import messageRouter from "./message";

const conversationRouter = Router();

// Email
conversationRouter.post("/mailtrap/email", conversationController.sendMail);
conversationRouter.post("/sendgrid/email", conversationController.gridMailSend);
//Chat
conversationRouter.use("/chat", chatRouter);
// Message
conversationRouter.use("/message", messageRouter);

export default conversationRouter;
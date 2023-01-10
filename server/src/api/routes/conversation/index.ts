import { Router } from "express";
import * as conversationController from "../../controller/conversation";

const conversationRouter = Router();

conversationRouter.post("/", conversationController.sendMail);
conversationRouter.post("/sendgrid/email", conversationController.gridMailSend);

export default conversationRouter;
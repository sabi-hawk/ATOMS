import { Router } from "express";
import * as workController from "../../controller/work";
import uploadFileMiddleware from "../../../middleware/upload";

const workRouter = Router();

workRouter.post("/", workController.startWorking)
workRouter.get("/status", workController.checkWorkExists)
workRouter.get("/get_WorkStatistics", workController.get_WorkStatistics)
workRouter.post("/send/emails", uploadFileMiddleware, workController.sendEmails)
workRouter.get("/logs", workController.get_WorkLogs)



export default workRouter
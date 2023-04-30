import { Router } from "express";
import * as workController from "../../controller/work"
const workRouter = Router();

workRouter.post("/", workController.startWorking)
workRouter.get("/status", workController.checkWorkExists)
workRouter.get("/get_WorkStatistics", workController.get_WorkStatistics)
workRouter.post("/send/emails", workController.sendEmails)


export default workRouter
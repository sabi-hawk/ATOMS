import { Router } from "express";
import * as workController from "../../controller/work"
const workRouter = Router();

workRouter.post("/", workController.startWorking)
workRouter.get("/status", workController.checkWorkExists)


export default workRouter
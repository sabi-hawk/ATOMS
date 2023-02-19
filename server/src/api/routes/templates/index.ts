import { Router } from "express";
import * as templatesController from "../../controller/templates";

const templatesRouter = Router();
templatesRouter.get("/user/:userId/names", templatesController.getDesignNames)
templatesRouter.post("/user/:userId/save", templatesController.saveDesign);
templatesRouter.get("/design", templatesController.getDesign);

export default templatesRouter;
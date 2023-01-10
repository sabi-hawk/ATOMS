import { Router } from "express";
import * as templatesController from "../../controller/templates";

const templatesRouter = Router();
templatesRouter.post("/save", templatesController.saveDesign);
templatesRouter.get("/design", templatesController.getDesign);

export default templatesRouter;
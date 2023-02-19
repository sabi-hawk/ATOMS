import { Router } from "express";
import { auth } from "../../../middleware/auth";
import * as userController from "../../controller/user";

const userRouter = Router();

userRouter.get("/", userController.getUser);
userRouter.get("/:userId", userController.getUserData)

export default userRouter;


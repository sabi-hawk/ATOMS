import {Router} from "express";
import postsRouter from "./post/post";
import pythonRouter from "./python/python";
import authRouter from "./auth";
import userRouter from "./user";
import conversationRouter from "./conversation";
import mediaRouter from "./media";
import templatesRouter from "./templates";

const apiRouter = Router();
apiRouter.use("/posts", postsRouter);
apiRouter.use("/python", pythonRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/conversation", conversationRouter);
apiRouter.use("/media", mediaRouter);
apiRouter.use("/templates", templatesRouter);
export default apiRouter;
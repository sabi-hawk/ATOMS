import { Router } from "express";
import { createPost, getPost } from "../../controller/post/post";

const router = Router();

router.get("/", getPost);
router.post("/", createPost);


export default router;
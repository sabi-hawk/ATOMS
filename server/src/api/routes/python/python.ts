import { Router } from "express";
import { extractEmails } from "../../controller/python/python";

const router = Router();

router.get(`/`, extractEmails);
// router.post("/", createPost);
// router.get(`/:numOfEmails/:numOfPages`, extractEmails);


export default router;
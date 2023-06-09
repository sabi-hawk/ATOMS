import { Router } from "express";
import multer from "multer";
import * as mediaController from "../../controller/media";
import util from "util";
import path from "path";

const maxSize = 2 * 1024 * 1024;
const uploadFolderPath = path.resolve(__dirname, "../../../../public");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("single");

let uploadFileMiddleware = util.promisify(uploadFile);
const mediaRouter = Router();

mediaRouter.post("/upload", uploadFileMiddleware, mediaController.upload);

export default mediaRouter;
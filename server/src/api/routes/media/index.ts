import { Router } from "express";
import multer from "multer";
import * as mediaController from "../../controller/media";
const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "/")
        },
        filename: function (req, file, cb) {
            cb(null, file.filename + ".png")
        }
    })
}).array("user_file")




const mediaRouter = Router();

mediaRouter.post("/upload", mediaController.upload);

export default mediaRouter;
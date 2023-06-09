import util from "util";
import multer from "multer";
import path from "path";

const maxSize = 2 * 1024 * 1024;
const uploadFolderPath = path.resolve(__dirname, "../../../uploads");
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
    limits: {fileSize: maxSize},
}).single("single");

let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;
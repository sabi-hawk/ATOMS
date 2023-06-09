import { Request, Response } from "express";
import multer from "multer";
import uploadFile from "../../../middleware/upload";
import path from "path";
import _ from "lodash";
import * as fs from "fs";

// export const upload = async (req: Request, res: Response) => {
//     try {
//         if (req.files === undefined) {
//             return res.status(400).send({ message: "Upload a file please!" });
//         }

//         let fileNames: Array<string> = [];
//         _(req.files).forEach(async (file: any, key) => {
//             if (file?.length > 1) {
//                 file?.map(async (f: any) => {
//                     fileNames.push(`${Date.now()}${f?.name}`);
//                     await f.mv(path.resolve(__dirname, "../../../../public/", `${fileNames[fileNames.length - 1]}`))
//                 })
//             } else {
//                 fileNames.push(`${Date.now()}${file?.name}`);
//                 // @ts-ignore
//                 await file.mv(path.resolve(__dirname, "../../../../public/", `${fileNames[fileNames.length - 1]}`))
//             }
//         });
//         return res.status(200).json({ message: "File(s) uploaded Successfully!", nameList: fileNames })
//     } catch (error) {
//         res.status(500).send({
//             // @ts-ignore
//             message: `Unable to upload the file: ${error}`,
//         });
//     }
// }
export const upload = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Upload a file please!" });
        }

        const fileNames: string[] = [];

        if (Array.isArray(req.file)) {
            // Handle multiple files
            req.file.forEach((file) => {
                const fileName = `${Date.now()}${file.originalname}`;
                fileNames.push(fileName);
                fs.renameSync(file.path, path.join(path.resolve(__dirname, "../../../../public/"), fileName));
            });
        } else {
            // Handle single file
            const fileName = `${Date.now()}${req.file.originalname}`;
            fileNames.push(fileName);
            fs.renameSync(req.file.path, path.join(path.resolve(__dirname, "../../../../public/"), fileName));
        }

        return res.status(200).json({
            message: "File(s) uploaded successfully!",
            nameList: fileNames,
        });
    } catch (error) {
        res.status(500).send({
            message: `Unable to upload the file: ${error}`,
        });
    }
};

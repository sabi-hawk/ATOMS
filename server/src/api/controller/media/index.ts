import { Request, Response } from "express";
import multer from "multer";
import uploadFile from "../../../middleware/upload";
import path from "path";
import _ from "lodash";

export const upload = async (req: Request, res: Response) => {
    try {
        if (req.files === undefined) {
            return res.status(400).send({ message: "Upload a file please!" });
        }

        let fileNames: Array<string> = [];
        _(req.files).forEach(async (file: any, key) => {
            if (file?.length > 1) {
                file?.map(async (f: any) => {
                    fileNames.push(`${Date.now()}${f?.name}`);
                    await f.mv(path.resolve(__dirname, "../../../../public/", `${fileNames[fileNames.length - 1]}`))
                })
            } else {
                fileNames.push(`${Date.now()}${file?.name}`);
                // @ts-ignore
                await file.mv(path.resolve(__dirname, "../../../../public/", `${fileNames[fileNames.length - 1]}`))
            }
        });
        return res.status(200).json({ message: "File(s) uploaded Successfully!", nameList: fileNames })
    } catch (error) {
        res.status(500).send({
            // @ts-ignore
            message: `Unable to upload the file: ${error}`,
        });
    }
}

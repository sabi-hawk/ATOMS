import { Request, Response } from "express";
import User from "../../../models/User";
import fs from "fs";
import { resolveContent } from "nodemailer/lib/shared";
import path from "path";

export const saveDesign = async (req: Request, res: Response) => {
    try {
        console.log("here Saving design", req.body.design);

        fs.writeFileSync(path.resolve(__dirname, "../../../../public/design.json"), JSON.stringify(req.body.design));
        return res.status(200).json({ message: "Design Saved Successfully" });
    } catch (error) {
        console.log("Error | controller | templates | saveDesign | catch", error)
        return res.status(500).json({ message: "Something went wrong", error: error });
    }
}

export const getDesign = async (req: Request, res: Response) => {
    try {
        fs.readFile(path.resolve(__dirname, "../../../../public/design.json"), "utf-8", (err, jsonString) => {
            if (err) {
                console.log("Error reading jsonDesign", err);
                return;
            }
            try {
                const jsonDesign = JSON.parse(jsonString);
                res.status(200).json({ design: jsonDesign });
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
    } catch (error) {
        console.log("Error | controller | templates | getDesign | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
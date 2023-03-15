import { Request, Response } from "express";
import Work from "../../../models/Work";
import { authenticateRequest } from "../../../utils/mongo";

export const startWorking = async (req: Request, res: Response) => {
    try {
        const data = await authenticateRequest(req, res);

        const work = await new Work({
            userId: data.userId,
            tags: req.body.tags,
            templateId: req.body.templateId,
            emailThreshold: req.body.emailThreshold,
            status: "searching",
        }).save();

        return res.status(200).json({ work });
    } catch (error: any) {
        console.log("Error | controller | work | startWorking | catch", error)
        return res.status(error?.status || 500).json({ error: error?.error || "Something went wrong" });
    }
}

export const checkWorkExists = async (req: Request, res: Response) => {
    try {
        const data = await authenticateRequest(req, res);
        const work = await Work.findOne({ userId: data.userId, status: "searching" })
        if (work) {
            return res.status(200).json({ work: work })
        }
        return res.status(404).json({ message: "Work doesn't exists!" })
    } catch (error: any) {
        console.log("Error | controller | work | checkWorkExists | catch", error)
        return res.status(error?.status || 500).json({ error: error?.error || "Something went wrong" });
    }
}
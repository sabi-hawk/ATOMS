import nodemailer from "nodemailer";
import Work from "../../../models/Work";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { authenticateRequest } from "../../../utils/mongo";
import { extractEmails } from "../../../utils/python";


export const startWorking = async (req: Request, res: Response) => {
    try {
        const data = await authenticateRequest(req, res);
        const work = await new Work({
            userId: data.userId,
            tags: req.body.tags,
            templateId: req.body.templateId,
            emailThreshold: req.body.emailThreshold,
            status: "searching",
            name: req.body.name
        }).save();

        res.status(200).json({ work });
        // start searching
        const scrappedData = await extractEmails(req.body.emailThreshold.toString(), req.body.tags);
        console.log("Found Data", scrappedData)

        await Work.findByIdAndUpdate(work._id, { emailsList: scrappedData, status: "done-searching" })
        console.log("Emails Added in Work Modal")
        // 
    } catch (error: any) {
        console.log("Error | controller | work | startWorking | catch", error)
        return res.status(error?.status || 500).json({ error: error?.error || "Something went wrong" });
    }
}

export const checkWorkExists = async (req: Request, res: Response) => {
    try {
        const data = await authenticateRequest(req, res);
        // const work = await Work.findOne({ userId: data.userId, status: "searching" })
        const work = await Work.findOne({ userId: data.userId })
            .sort({ timeStamp: -1 })
            .limit(1).exec()
        if (work) {
            return res.status(200).json({ work: { _id: work._id, status: work.status } })
        }
        return res.status(404).json({ message: "Work doesn't exists!" })
    } catch (error: any) {
        console.log("Error | controller | work | checkWorkExists | catch", error)
        return res.status(error?.status || 500).json({ error: error?.error || "Something went wrong" });
    }
}

const findFile = async (userId: string | undefined, templateId: string | undefined, req: Request, res: Response) => {
    let foundFileName: string = "";
    try {
        const files = await fs.promises.readdir(path.resolve(__dirname, "../../../../public/templates/html"));
        for (const file of files) {
            console.log("File", file);
            if (file.includes(`${userId}_${templateId}`) || file.includes(templateId || "")) {
                foundFileName = file;
                console.log("File Name", foundFileName);
                const html = await fs.promises.readFile(path.resolve(__dirname, `../../../../public/templates/html/${foundFileName}`), "utf-8");
                return html;
            }
        }
        throw { message: `File not Found ${foundFileName}` }
    } catch (err) {
        console.log("Error reading directory", err);
        throw err
    }
};

export const sendEmails = async (req: Request, res: Response) => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "6f97c92e255da9",
            pass: "a033c8ab71b200"
        }
    });

    try {
        let htmlContent: string = ""
        const data = await authenticateRequest(req, res);
        const work = await Work.findOne({ userId: data.userId })
            .sort({ timeStamp: -1 })
            .limit(1).exec()
        if (work) {
            htmlContent = await findFile(work.userId, work.templateId, req, res);
            await Work.findByIdAndUpdate(work._id, { status: "IDLE" })

            res.status(200).json({ message: "Mails are in Queue!", status: "IDLE" })
            const to = await work.emailsList.map((element) => element.email);

            let mailOptions = {
                from: data.email,
                to: to,
                subject: "Promotions",
                html: htmlContent,
                text: undefined,
                attachment: undefined
            };

            transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });
            return
        }
        return res.status(404).json({ message: "Work doesn't exists!" })
    } catch (error: any) {
        console.log("Error | controller | work | sendEmails | catch", error)
        return res.status(error?.status || 500).json({ error: error?.error || "Something went wrong" });
    }
}
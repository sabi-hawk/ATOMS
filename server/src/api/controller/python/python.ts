import { Request, Response } from "express";
import PostMessage from "../../../models/postMessage";
import { spawn } from "child_process"
import path from "path";
import { json } from "body-parser";

export const extractEmails = async (req: Request, res: Response) => {
    const { query } = req.body;
    const { numOfEmails, numOfPages, search }: any = req.query;
    try {
        console.log("here is path", path.resolve(__dirname,
            '../../../python/extras/AVS/requesting.py'))
        const process = spawn('python', [path.resolve(__dirname,
            '../../../python/extras/AVS/requesting.py'), search, numOfEmails, numOfPages])

        let scrappedRecords: any = [];
        process.stdout.on('data', (data) => {
            let record = data.toString();
            record = JSON.parse(record);
            scrappedRecords.push(record);
            console.log("received record:\n", record)
        });
        process.stdout.on('end', function () {
            console.log("END");
            res.status(200).json({ data: scrappedRecords });
        })
        process.stderr.on('data', (data) => {
            console.log('err results: %j', data.toString('utf8'))
            return res.status(409).json({ message: data.toString('utf8') });
        });
    } catch (error) {
        // @ts-ignore
        res.status(409).json({ message: error.message });
    }
}

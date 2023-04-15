import { Request, Response } from "express";
import { spawn } from "child_process"
import path from "path";
import { json } from "body-parser";

export const extractEmails = (count: string, list: Array<string>) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("[Executing Scrapping Logic]")
            const process = spawn('python', [path.resolve(__dirname, '../../python/extras/AVS/requesting.py'), list[0], count, "5"])

            let scrappedRecords: any = [];
            process.stdout.on('data', (data) => {
                let record = data.toString();
                record = JSON.parse(record);
                scrappedRecords.push(record);
                console.log("received record:\n", record)
            });
            process.stdout.on('end', function () {
                resolve(scrappedRecords);
            })
            process.stderr.on('data', (data) => {
                console.log('err results: %j', data.toString('utf8'));
                reject(data.toString('utf8'));
            });
        } catch (error) {
            console.log("Error Searching Emails");
            reject(error);
        }
    });
};

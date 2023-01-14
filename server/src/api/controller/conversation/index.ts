import { Request, Response } from "express";
import nodemailer from "nodemailer";
import SendGridMail from "@sendgrid/mail";


// Email
export const sendMail = async (req: Request, res: Response) => {
    try {
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6f97c92e255da9",
                pass: "a033c8ab71b200"
            }
        });

        if (req.body.to === undefined || req.body.from === undefined) {
            return res.status(422).json({ error: "to & from are required fields", message: "Validation error" })
        }

        let mailOptions = {
            from: req.body.from,//'sender@gmail.com', // Sender address
            to: req.body.to, //'receiver@gmail.com', // List of recipients
            subject: req.body?.subject,//'Node Mailer', // Subject line
            html: undefined,
            text: undefined,
            attachment: undefined
        };

        if (req.body?.htmlContent) {
            mailOptions.html = req.body.htmlContent
            if (req.body?.attachment) {
                mailOptions.attachment = req.body.attachment
            }
        } else if (req.body?.text) {
            mailOptions.text = req.body.text
            if (req.body?.attachment) {
                mailOptions.attachment = req.body.attachment
            }
        } else if (req.body?.attachment) {
            mailOptions.attachment = req.body.attachment
        } else {
            res.status(422).json({ error: "text or html-content is required", message: "Validation error" });
        }

        console.log("Before Transport", mailOptions);
        transport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Something went wrong!", error: err });
            } else {
                console.log(info);
                return res.status(200).json({ message: "Mail Sent Successfully!", info: info });
            }
        });
    } catch (error) {
        console.log("Error | controller | conversation | send-email | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}

export const gridMailSend = async (req: Request, res: Response) => {
    try {
        SendGridMail.setApiKey(process.env.SENDGRID_API_KEY?.toString() as string);
        const msg = {
            to: 'miansabby516@gmail.com', // Change to your recipient
            from: 'miansabby516@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: req.body.htmlContent,
        }
        SendGridMail.send(msg).then((info) => {
            return res.status(200).json({ message: "Mail Sent Successfully!", info: info });
        }).catch((error) => {
            console.log("Error | controller | conversation | grid-mail-send | catch", error)
            res.status(500).json({ message: "Something went wrong", error: error });
        })
    } catch (error) {
        console.log("Error | controller | conversation | grid-mail-send | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}


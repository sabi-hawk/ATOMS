import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = "KisiKoNahiBtaonga";
import Session from "../../models/Session";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            let user = jwt.verify(token, SECRET_KEY);
            // @ts-ignore
            req.body.userId = user.id;
        } else {
            res.status(401).json({ message: "Unauthorized User" });
        }
        next()
    } catch (error) {
        console.log("Error | middleware | auth | catch ", error);
        res.status(401).json({ message: "Unauthorized User" });
    }
}



export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("auth-token");
        // @ts-ignore
        const decode = jwt.verify(token, SECRET_KEY);
        const session = await Session.findOne({ _id: decode.sessionId })

        if (!session) {
            return res.status(401).json({
                error: 'Session not found'
            })
        }

        if (session.expiresAt) {
            const now = new Date().getTime();
            const expiresAt = new Date(session.expiresAt).getTime();
            if (now > expiresAt) {
                return res.status(401).json({
                    error: 'Session expired'
                })
            }
        }
        next();
    } catch (error) {
        console.log("Error | utils | mongo | authenticate")
    }
}
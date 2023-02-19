import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { authenticate } from "../../middleware/auth";
import Session from "../../models/Session";
const SECRET_KEY = "KisiKoNahiBtaonga"

export type jwtVerifyType = {
    email: string,
    userId: string,
    sessionId: string,
    iat: number
}
export const authenticateRequest = async (req: Request, res: Response) => {
    try {
        // console.log("Her 1", req.header("auth-token"))
        const token = req.header("auth-token");
        if (!token) {
            throw {
                status: 401,
                error: 'Unauthorized Access'
            }
            // return res.status(401).json({
            //     message: "Unauthorized Access"
            // })
        }
        // console.log("Her 2")
        const decode: any = jwt.verify(token, SECRET_KEY);
        const session = await Session.findOne({ _id: decode.sessionId })

        // console.log("Her 3")
        if (!session) {
            throw {
                status: 401,
                error: 'Session not found'
            }
            // return res.status(401).json({
            //     error: 'Session not found'
            // })
        }

        // console.log("Her 4")
        if (session.expiresAt) {
            const now = new Date().getTime();
            const expiresAt = new Date(session.expiresAt).getTime();
            if (now > expiresAt) {
                // console.log("Doubted area")
                throw {
                    status: 401,
                    error: 'Session expired'
                }
                // return res.status(401).json({
                //     error: 'Session expired'
                // })
            }
        }
        // console.log("Her 5")
        return decode;
    } catch (error) {
        console.log("Error | utils | mongo | authenticate")
        throw error;
        // return res.status(500).json({ message: "Something went wrong2", error: error });
    }
}
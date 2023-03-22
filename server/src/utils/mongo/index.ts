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

        const token = req.header("auth-token");
        if (!token) {
            throw {
                status: 401,
                error: 'Unauthorized Access'
            }

        }
        const decode: any = jwt.verify(token, SECRET_KEY);
        const session = await Session.findOne({ _id: decode.sessionId })

        if (!session) {
            throw {
                status: 401,
                error: 'Session not found'
            }

        }

        if (session.expiresAt) {
            const now = new Date().getTime();
            const expiresAt = new Date(session.expiresAt).getTime();
            if (now > expiresAt) {
                throw {
                    status: 401,
                    error: 'Session expired'
                }

            }
        }
        
        return decode;
    } catch (error) {
        console.log("Error | utils | mongo | authenticate")
        throw error;
        // return res.status(500).json({ message: "Something went wrong2", error: error });
    }
}
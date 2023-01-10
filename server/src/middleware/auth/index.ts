import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = "KisiKoNahiBtaonga";

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

// token = token.split(" ")[1];
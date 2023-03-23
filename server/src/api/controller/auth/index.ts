import { Request, Response } from "express";
import User from "../../../models/User";
import { validateLoginRequest, validateRegisterRequest } from "./validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const SECRET_KEY = "KisiKoNahiBtaonga"
import { Schema } from "mongoose";
import Session from "../../../models/Session";



export const register = async (req: Request, res: Response) => {
    try {
        const requestData = await validateRegisterRequest(req);
        const existingUser = await User.findOne({ email: requestData.email });
        if (existingUser) {
            return res.status(400).json({ error: "email already exists" })
        }
        const hashedPassword = await bcrypt.hash(requestData.password, 10);
        const user = await User.create({ ...requestData, password: hashedPassword });
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
        return res.status(201).json({ user: user, token: token });

    } catch (error) {
        console.log("Error | controller | auth | register | catch", error)
        return res.status(500).json({ message: "Something went wrong", error: error });
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const requestData = await validateLoginRequest(req);
        const existingUser = await User.findOne({ email: requestData.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(requestData.password, existingUser.password)

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // console.log("USER ID", existingUser._id)
        const session = await createSession(existingUser)
        // const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ ...existingUser.toObject(), token: session.accessToken, expiresAt: session.expiresAt }); // user: existingUser, token: token

    } catch (error) {
        console.log("Error | controller | auth | login | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}

const createSession = async (user: any) => {
    // const expiresAt = new Date(Date.now() + 60 * 1000);
    const expiresAt = new Date();
    // expiresAt.getSeconds() + 2
    expiresAt.setHours(expiresAt.getHours() + 1);//
    // console.log("BEFORE");
    const newSession = await new Session({
        userId: user._id,
        expiresAt: expiresAt
    }).save();

    // console.log("AFTER");
    const token = jwt.sign({ email: user.email, userId: user._id, sessionId: newSession._id }, SECRET_KEY);
    

    newSession.accessToken = token;
    return newSession.save()
}

// const user = await new User(requestData).save();
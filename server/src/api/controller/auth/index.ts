import { Request, Response } from "express";
import User from "../../../models/User";
import { validateLoginRequest, validateRegisterRequest } from "./validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const SECRET_KEY = "KisiKoNahiBtaonga"

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
        return  res.status(500).json({ message: "Something went wrong", error: error });
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

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log("Error | controller | auth | login | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}



// const user = await new User(requestData).save();
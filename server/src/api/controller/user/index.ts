import { Request, Response } from "express";
import User from "../../../models/User";

export const getUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body.userId)
        let user = await User.findOne({ _id: req.body.userId });
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: "User not found" })
    } catch (error) {
        console.log("Error | controller | user | getUser | catch", error)
        return  res.status(500).json({ message: "Something went wrong", error: error });
    }
}
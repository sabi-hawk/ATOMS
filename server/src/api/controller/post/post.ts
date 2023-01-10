import { Request, Response } from "express";
import PostMessage from "../../../models/postMessage";

export const getPost = (req: Request, res:Response) => {
    try {
        res.send({message: "milgya"});
    } catch (error) {

    }
}
export const createPost = async (req: Request, res: Response) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    console.log("INSIDE POST CREATION BACK", post, "\n\n\n", newPost);
    try {
        await newPost.save();
        // @ts-ignore
        res.status(201).json(newPost);
    } catch (error) {
        // @ts-ignore
        res.status(409).json({message: error.message});
    }
}

// res.status(201).json(newPost);

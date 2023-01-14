import { Request, Response } from "express";
import Message from "../../../../models/Message";

export const addMessage = async (req: Request, res: Response) => {
    const { chatId, senderId, text } = req.body
    try {
        const message = await new Message({
            chatId,
            senderId,
            text
        }).save();

        res.status(200).json(message)
    } catch (error) {
        console.log("Error | controller | conversation | message | addMessage | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({chatId: chatId});
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error | controller | conversation | message | getMessages | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
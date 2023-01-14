import { Request, Response } from "express";
import Chat from "../../../../models/Chat";


export const createChat = async (req: Request, res: Response) => {
    try {
        const chat = await new Chat({
            members: [req.body.senderId, req.body.receiverId]
        }).save();

        res.status(200).json(chat);
    } catch (error) {
        console.log("Error | controller | conversation | chat | createChat | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
export const sendMessage = async (req: Request, res: Response) => {
    console.log("Inside Send Message")
    const { chatId } = req.params
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            res.status(404).json({ message: "Chat not found!" })
        }

        let memberFound: Boolean = false;
        await chat?.members.forEach((member) => {
            console.log("MEMBERS", member, req.body.senderId)
            if (member === req.body.senderId) {
                console.log("Inside If")
                memberFound = true
            }
        })
        console.log("member", memberFound)
        if (!memberFound) {
            return res.status(404).json({ message: "You are not member of this chat!" })
        }
        console.log("CHECK STATE", req.body);
        const updatedChat = await Chat.findByIdAndUpdate(chatId,
            {
                $push: {
                    messages: {
                        senderId: req.body.senderId,
                        text: req.body.text
                    }
                }
            },
            { new: true })
        res.status(200).json(updatedChat);
    } catch (error) {
        console.log("Error | controller | conversation | chat | createChat | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
export const getMessage = async (req: Request, res: Response) => {
    console.log("Inside Send Message")
    const { chatId, messageId } = req.params
    try {
        console.log("Filters", chatId, messageId);
        const chat = await Chat.find({ _id: chatId, "messages._id": messageId });
        if (!chat) {
            res.status(404).json({ message: "Chat not found!" })
        }
        console.log("found chat", chat);
        let memberFound: Boolean = false;
        // await chat?.members.forEach((member) => {
        //     console.log("MEMBERS", member, req.body.senderId)
        //     if (member === req.body.senderId) {
        //         console.log("Inside If")
        //         memberFound = true
        //     }
        // })
        console.log("member", memberFound)
        if (!memberFound) {
            return res.status(404).json({ message: "You are not member of this chat!" })
        }
        console.log("CHECK STATE", req.body);
        const updatedChat = await Chat.findByIdAndUpdate(chatId,
            {
                $push: {
                    messages: {
                        senderId: req.body.senderId,
                        text: req.body.text
                    }
                }
            },
            { new: true })
        res.status(200).json(updatedChat);
    } catch (error) {
        console.log("Error | controller | conversation | chat | createChat | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
export const userChats = async (req: Request, res: Response) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(chat);
    } catch (error) {
        console.log("Error | controller | conversation | chat | userChats | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}

export const findChat = async (req: Request, res: Response) => {
    try {
        const chat = await Chat.find({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json(chat);
    } catch (error) {
        console.log("Error | controller | conversation | chat | findChat | catch", error)
        res.status(500).json({ message: "Something went wrong", error: error });
    }
}
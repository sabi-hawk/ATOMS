import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        messages: [
            {
                senderId: {
                    type: String
                },
                text: {
                    type: String
                },
                isSeen: {
                    type: Boolean,
                    default: false
                },
                createdAt: { type: Date, default: Date.now },
            }
        ]
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Chat", ChatSchema);
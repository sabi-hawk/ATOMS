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
                }
            }
        ]
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Chat", ChatSchema);
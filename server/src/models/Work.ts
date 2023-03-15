import mongoose from "mongoose";

const statusEnum = ['searching', "sending", "completed"]
const WorkSchema = new mongoose.Schema(
    {
        userId: { type: String },
        tags: { type: Array },
        templateId: { type: String },
        emailThreshold: { type: Number },
        status: { type: String, enum: statusEnum, required: true },
        emailsList: { type: Array },
        name: { type: String, default: "myWork" }
    }, {
    timestamps: true
}
)

export default mongoose.model("Work", WorkSchema)
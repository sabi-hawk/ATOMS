import mongoose from "mongoose";


const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    startedAt: {
        type: Date,
        require: true
    },
    expiresAt: {
        type: Date,
        require: true
    },
    accessToken: {
        type: String
    }
}, {
    timestamps: true
})
export default mongoose.model("Session", SessionSchema)
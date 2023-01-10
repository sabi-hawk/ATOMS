import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        first: { type: String, trim: true, required: true },
        last: { type: String, trim: true },
    },
    organization: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    password: {type: String, required: true},
    country: {type: String, required: true}
})

export default mongoose.model("User", UserSchema);
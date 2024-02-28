import mongoose, { Document } from "mongoose";
import { IUser } from "../interfaces/entity.interface.js";

export interface UserType extends Document, IUser {
    _id: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            //unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<UserType>("User", userSchema);

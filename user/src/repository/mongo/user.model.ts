import mongoose, { HydratedDocument, Model } from "mongoose";
import { IUser } from "../../interfaces/entity.interface.js";

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
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
        isVerified: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export type IDBUser = HydratedDocument<
    IUser,
    { createdAt: Date; updatedAt: Date }
>;

export type IUserModel = Model<IUser>;

export default mongoose.model<IUser>("User", userSchema);

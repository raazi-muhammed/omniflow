import mongoose, { HydratedDocument } from "mongoose";
import { IMember } from "../interfaces/entity.interface.js";

const membersSchema = new mongoose.Schema<IMember>(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
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

export type IDBMember = HydratedDocument<
    IMember,
    { createdAt: Date; updatedAt: Date }
>;

export default mongoose.model<IMember>("Member", membersSchema);

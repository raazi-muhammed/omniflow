import mongoose, { HydratedDocument, Model } from "mongoose";
import { AccessLevels, IMember } from "../../../interfaces/entity.interface.js";

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
        access: {
            apiDoc: {
                type: Number,
                enum: AccessLevels,
                default: AccessLevels.NO_ACCESS,
            },
            dbDesign: {
                type: Number,
                enum: AccessLevels,
                default: AccessLevels.NO_ACCESS,
            },
            module: {
                type: Number,
                enum: AccessLevels,
                default: AccessLevels.NO_ACCESS,
            },
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

export type IDBMember = HydratedDocument<
    IMember,
    { createdAt: Date; updatedAt: Date }
>;

export type IMemberModel = Model<IMember>;

export default mongoose.model<IMember>("Member", membersSchema);

import mongoose, { HydratedDocument, Model } from "mongoose";
import {
    AccessLevels,
    IMemberAccess,
} from "../../../interfaces/entity.interface.js";

const memberAccessSchema = new mongoose.Schema<IMemberAccess>(
    {
        project: {
            type: String,
            required: true,
        },
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
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
        deletedAt: {
            type: Date,
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

export type IDBMemberAccess = HydratedDocument<
    IMemberAccess,
    { createdAt: Date; updatedAt: Date }
>;

export type IMemberAccessModel = Model<IMemberAccess>;

export default mongoose.model<IMemberAccess>(
    "MemberAccess",
    memberAccessSchema
);

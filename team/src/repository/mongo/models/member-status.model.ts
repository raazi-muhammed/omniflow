import mongoose, { HydratedDocument, Model } from "mongoose";
import {
    IMemberStatus,
    InviteStatus,
    Role,
} from "../../../interfaces/entity.interface.js";

const memberStatusSchema = new mongoose.Schema<IMemberStatus>(
    {
        role: {
            type: String,
            enum: Role,
            default: Role.DEFAULT,
        },
        inviteStatus: {
            type: String,
            enum: InviteStatus,
            default: InviteStatus.PENDING,
        },
        team: {
            type: String,
        },
        project: {
            type: String,
            required: true,
        },
        info: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
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

export type IDBMemberStatus = HydratedDocument<
    IMemberStatus,
    { createdAt: Date; updatedAt: Date }
>;

export type IMemberStatusModel = Model<IMemberStatus>;

export default mongoose.model<IMemberStatus>(
    "MemberStatus",
    memberStatusSchema
);

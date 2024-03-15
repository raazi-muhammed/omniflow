import mongoose, { HydratedDocument, Model } from "mongoose";
import { IProject } from "../../interfaces/entity.interface.js";

const projectSchema = new mongoose.Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            default: new Date(),
        },
        dueDate: {
            type: Date,
            default: new Date(),
        },
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Member",
        },
        members: [
            {
                _id: false,
                role: {
                    type: String,
                    enum: ["TEAM_LEAD", "DEFAULT"],
                    default: "DEFAULT",
                },
                inviteStatus: {
                    type: String,
                    enum: ["ACCEPTED", "REJECTED", "PENDING"],
                    default: "PENDING",
                },
                info: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Member",
                },
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
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

export type IDBProject = HydratedDocument<
    IProject,
    { createdAt: Date; updatedAt: Date }
>;
export type IProjectModel = Model<IProject>;

export default mongoose.model<IProject>("Project", projectSchema);

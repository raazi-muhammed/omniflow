import mongoose, { Document } from "mongoose";
import { IProject } from "../interfaces/entity.interface.js";
import { IUser } from "@omniflow/common/dist/lib/token.js";

export interface ProjectType extends Document, IProject {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: IUser;
    members: IUser[];
}

const projectSchema = new mongoose.Schema(
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
            type: Number,
            default: new Date(),
        },
        dueDate: {
            type: Number,
            default: new Date(),
        },
        projectLead: {
            type: Object,
            required: true,
        },
        members: [
            {
                type: Object,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ProjectType>("Project", projectSchema);

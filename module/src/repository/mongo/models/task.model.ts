import mongoose, { HydratedDocument, Model } from "mongoose";
import { ITask, TaskStatus } from "../../../interfaces/entity.interface.js";

const taskSchema = new mongoose.Schema<ITask>(
    {
        name: {
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
        deletedAt: {
            type: Date,
            default: null,
        },
        projectId: {
            type: String,
            required: true,
        },
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
        },
        status: {
            type: String,
            enum: TaskStatus,
            default: TaskStatus.TO_DO,
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

export type IDBTask = HydratedDocument<
    ITask,
    { createdAt: Date; updatedAt: Date }
>;
export type ITaskModel = Model<ITask>;

export default mongoose.model<ITask>("Task", taskSchema);

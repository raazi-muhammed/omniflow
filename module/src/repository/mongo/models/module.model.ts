import mongoose, { HydratedDocument, Model } from "mongoose";
import { IModule } from "../../../interfaces/entity.interface.js";

const moduleSchema = new mongoose.Schema<IModule>(
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
        dependencies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module",
            },
        ],
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

export type IDBModule = HydratedDocument<
    IModule,
    { createdAt: Date; updatedAt: Date }
>;
export type IModuleModel = Model<IModule>;

export default mongoose.model<IModule>("Module", moduleSchema);

import mongoose, { HydratedDocument, Model } from "mongoose";
import { IMeeting } from "../../../interfaces/entity.interfaces.js";

const meetingSchema = new mongoose.Schema<IMeeting>(
    {
        name: {
            type: String,
            required: true,
        },
        agenda: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        projectId: {
            type: String,
            required: true,
        },
        meetingLink: {
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

export type IDBMeeting = HydratedDocument<
    IMeeting,
    { createdAt: Date; updatedAt: Date }
>;
export type IMeetingModel = Model<IMeeting>;

export default mongoose.model<IMeeting>("Meeting", meetingSchema);

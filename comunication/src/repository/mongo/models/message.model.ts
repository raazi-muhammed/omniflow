import mongoose, { HydratedDocument, Model } from "mongoose";
import { IMessage } from "../../../interfaces/entity.interfaces.js";

const messageSchema = new mongoose.Schema<IMessage>(
    {
        roomId: {
            type: String,
            required: true,
        },
        from: {
            type: Object,
            required: true,
        },
        content: {
            type: String,
            required: true,
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

export type IDBMessage = HydratedDocument<
    IMessage,
    { createdAt: Date; updatedAt: Date }
>;

export type IMessageModel = Model<IMessage>;

export default mongoose.model<IMessage>("Message", messageSchema);

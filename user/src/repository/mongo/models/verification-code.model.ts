import mongoose, { HydratedDocument, Model } from "mongoose";
import { IVerificationCode } from "../../../interfaces/entity.interface.js";

const verificationCodeSchema = new mongoose.Schema<IVerificationCode>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        code: {
            type: Number,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            index: { expires: "5m" },
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

export type IDBVerificationCode = HydratedDocument<
    IVerificationCode,
    { createdAt: Date; updatedAt: Date }
>;

export type IVerificationCodeModel = Model<IVerificationCode>;

export default mongoose.model<IVerificationCode>(
    "VerificationCode",
    verificationCodeSchema
);

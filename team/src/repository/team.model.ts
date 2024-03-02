import mongoose, { HydratedDocument, Model } from "mongoose";
import { ITeam } from "../interfaces/entity.interface.js";

const teamSchema = new mongoose.Schema<ITeam>(
    {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Member",
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Member",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export type IDBTeam = HydratedDocument<
    ITeam,
    { createdAt: Date; updatedAt: Date }
>;

export type ITeamModel = Model<ITeam>;

export default mongoose.model<ITeam>("Team", teamSchema);
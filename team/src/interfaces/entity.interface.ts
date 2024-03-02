import { Types } from "mongoose";

export type IDType = Types.ObjectId;

export interface ITeam {
    name: string;
    avatar?: string;
    members: [IDType];
    lead: IDType;
}

export interface IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

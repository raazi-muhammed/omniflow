import { Types } from "mongoose";
import { IDBMember } from "../repository/members.model.js";
import { IMember, ITeam } from "./entity.interface.js";
import { IDBTeam } from "../repository/team.model.js";

export type IProjectRepository = {
    add: (data: ITeam) => Promise<IDBTeam>;
    getAll: (userId: Types.ObjectId) => Promise<IDBTeam[]>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember>;
    upsert: (data: IMember) => Promise<IDBMember>;
    getByUsername: (username: string) => Promise<IDBMember>;
};

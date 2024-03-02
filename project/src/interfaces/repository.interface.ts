import { Types } from "mongoose";
import { IDBMember } from "../repository/members.model.js";
import { IDBProject } from "../repository/project.model.js";
import { IMember, IProject } from "./entity.interface.js";

export type IProjectRepository = {
    add: (data: IProject) => Promise<IDBProject>;
    getAll: (userId: Types.ObjectId) => Promise<IDBProject[]>;
    get: (id: string) => Promise<IDBProject>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember>;
    upsert: (data: IMember) => Promise<IDBMember>;
    getByUsername: (username: string) => Promise<IDBMember>;
};

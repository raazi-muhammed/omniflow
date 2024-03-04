import { Types } from "mongoose";
import { IDBMember } from "../repository/members.model.js";
import { IDBProject } from "../repository/project.model.js";
import { IMember, IProject } from "./entity.interface.js";

export type IProjectRepository = {
    add: (data: IProject) => Promise<IDBProject | null>;
    edit: (data: IProject) => Promise<boolean | null>;
    getAll: (userId: Types.ObjectId) => Promise<IDBProject[] | null>;
    get: (id: string) => Promise<IDBProject | null>;
    delete: (id: string) => Promise<boolean | null>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember | null>;
    upsert: (data: IMember) => Promise<IDBMember | null>;
    getByUsername: (username: string) => Promise<IDBMember | null>;
};

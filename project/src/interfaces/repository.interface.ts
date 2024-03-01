import { IDBMember } from "../repository/members.model.js";
import { IDBProject } from "../repository/project.model.js";
import { IMember, IProject } from "./entity.interface.js";

export type IProjectRepository = {
    add: (data: IProject) => Promise<IDBProject>;
    getAll: () => Promise<IDBProject[]>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember>;
    upsert: (data: IMember) => Promise<IDBMember>;
};

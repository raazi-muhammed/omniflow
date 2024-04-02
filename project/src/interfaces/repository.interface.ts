import { IDBMember } from "../repository/mongo/models/members.model.js";
import { IDBProject } from "../repository/mongo/models/project.model.js";
import { IMember, IMemberInProject, IProject } from "./entity.interface.js";

export type IProjectRepository = {
    add: (data: IProject) => Promise<IDBProject | null>;
    edit: (data: {
        id: string;
        title: string;
        description: string;
        startDate: Date;
        dueDate: Date;
        priority: number;
    }) => Promise<boolean | null>;
    getAll: (userId: string) => Promise<IDBProject[] | null>;
    get: (id: string) => Promise<IDBProject | null>;
    delete: (id: string) => Promise<boolean | null>;
    addMember: (data: {
        projectId: string;
        member: IMemberInProject;
    }) => Promise<boolean | null>;
    removeMember: (data: {
        projectId: string;
        memberId: string;
    }) => Promise<boolean | null>;
    changeTeamLead: (data: {
        projectId: string;
        userId: string;
    }) => Promise<boolean | null>;
};
export type IMemberRepository = {
    add: (data: IMember) => Promise<IDBMember | null>;
    upsert: (data: IMember) => Promise<IDBMember | null>;
    getByUsername: (username: string) => Promise<IDBMember | null>;
    getByEmail: (email: string) => Promise<IDBMember | null>;
    editUser: (data: {
        avatar?: string;
        username: string;
        name: string;
    }) => Promise<boolean>;
};

import { IUser } from "@omniflow/common/dist/lib/token.js";

export interface IProject {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: IUser;
    members: IUser[];
}

class ProjectEntityClass {
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: IUser;
    members: IUser[];

    constructor(data: IProject) {}
    validate: () => void;
    get: () => IProject;
}

export type IProjectEntity = typeof ProjectEntityClass;

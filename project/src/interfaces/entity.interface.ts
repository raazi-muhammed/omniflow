import { Types } from "mongoose";

export interface IProject {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: Types.ObjectId;
    members: Types.ObjectId[];
}

export interface IMember {
    role: "Team Lead" | "Freelance" | "Default";
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

class ProjectEntityClass {
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    projectLead: Types.ObjectId;
    members: Types.ObjectId[];

    constructor(data: IProject) {}
    validate: () => void;
    get: () => IProject;
}

export type IProjectEntity = typeof ProjectEntityClass;

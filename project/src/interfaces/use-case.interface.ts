import { IDBProject } from "../repository/mongo/project.model.js";
import { IMember, IProject } from "./entity.interface.js";

export type IAddProjectUseCase = (userData: IProject) => IProject;
export type ICreateUserUseCase = (userData: IMember) => IMember;

export type IMemberUseCase = {
    addMemberToProject: (data: {
        userData: IMember;
        projectId: string;
    }) => Promise<void>;
    removeMemberFromProject: (data: {
        userEmail: string;
        projectId: string;
    }) => Promise<void>;
};
export type IProjectUseCase = {
    changeProjectLead: (data: {
        leadEmail: string;
        projectId: string;
    }) => Promise<void>;
    getProject: (data: {
        projectId: string;
    }) => Promise<{ project: IDBProject; token: string }>;
    deleteProject: (data: { projectId: string }) => Promise<void>;
    getAllProjects: (data: { userEmail: string }) => Promise<IDBProject[]>;
    addProject: (data: {
        member: IMember;
        projectData: {
            title: string;
            description: string;
            dueDate: Date;
            startDate: Date;
            priority: number;
        };
    }) => Promise<IDBProject>;
    editProject: (data: {
        projectId: string;
        title: string;
        description: string;
        dueDate: Date;
        startDate: Date;
        priority: number;
    }) => Promise<void>;
};

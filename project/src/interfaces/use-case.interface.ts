import { IUser } from "@omniflow/common/dist/interfaces/entity.interface.js";
import { IDBProject } from "../repository/mongo/models/project.model.js";
import { IAccess, IMember, IProject } from "./entity.interface.js";

export type IAddProjectUseCase = (userData: IProject) => IProject;
export type ICreateUserUseCase = (userData: IMember) => IMember;

export type IMemberUseCase = {
    addMemberToProject: (data: {
        userData: { avatar?: string; username: string; email: string };
        projectId: string;
    }) => Promise<void>;
    removeMemberFromProject: (data: {
        userEmail: string;
        projectId: string;
    }) => Promise<void>;
    editMember: (data: {
        name: string;
        avatar?: string;
        username: string;
    }) => Promise<void>;
    changeMemberAccess: (data: {
        userName: string;
        projectId: string;
        access: IAccess;
    }) => Promise<void>;
};
export type IProjectUseCase = {
    changeProjectLead: (data: {
        leadEmail: string;
        projectId: string;
    }) => Promise<void>;
    getProject: (data: {
        user: IUser;
        projectId: string;
    }) => Promise<{ project: IDBProject; access: IAccess; token: string }>;
    deleteProject: (data: { projectId: string }) => Promise<void>;
    getAllProjects: (data: { userEmail: string }) => Promise<IDBProject[]>;
    addProject: (data: {
        member: IUser;
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

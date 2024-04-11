import { Types } from "mongoose";

/* Module */
export interface IModule {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    dependencies: string[];
    parentModule?: Types.ObjectId;
    deletedAt?: Date;
}

export interface IModuleEntity extends IModule {
    validate: () => void;
    get: () => IModule;
}

export interface IModuleEntityConstructor {
    new (data: IModule): IModuleEntity;
}

/* Task */
export interface ITask {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    status: TaskStatus;
    startDate: Date;
    dueDate: Date;
    module?: Types.ObjectId;
    assignee?: Types.ObjectId | IMember;
    reporter: Types.ObjectId | IMember;
    deletedAt?: Date;
}

export interface ITaskEntity extends ITask {
    validate: () => void;
    get: () => ITask;
}

export interface ITaskEntityConstructor {
    new (data: ITask): ITaskEntity;
}

export enum TaskStatus {
    TO_DO = "TO_DO",
    ON_PROGRESS = "ON_PROGRESS",
    COMPLETED = "COMPLETED",
}

export interface IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

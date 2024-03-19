import { Types } from "mongoose";

/* Module */
export interface IModule {
    name: string;
    description: string;
    projectId: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    dependencies: [string];
    parentModule?: Types.ObjectId;
    deletedAt: Date | null;
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
    startDate: Date;
    dueDate: Date;
    module?: Types.ObjectId;
    deletedAt: Date | null;
}

export interface ITaskEntity extends ITask {
    validate: () => void;
    get: () => IModule;
}

export interface ITaskEntityConstructor {
    new (data: ITask): ITaskEntity;
}

import { IDBModule } from "../repository/mongo/models/module.model.js";
import { IDBTask } from "../repository/mongo/models/task.model.js";
import { IModule, ITask } from "./entity.interface.js";

export type IModuleRepository = {
    add: (data: IModule) => Promise<IDBModule>;
    getAll: (data: {
        projectId: string;
        parentModule?: string;
    }) => Promise<IDBModule[]>;
    getById: (moduleId: string) => Promise<IDBModule>;
    getModuleList: (data: { projectId: string }) => Promise<IDBModule[]>;
};

export type ITaskRepository = {
    add: (data: ITask) => Promise<IDBTask>;
    edit: (data: { taskId: string; taskData: ITask }) => Promise<boolean>;
    deleteById: (taskId: string) => Promise<boolean>;
    getAll: (data: { projectId: string }) => Promise<IDBTask[]>;
    getById: (id: string) => Promise<IDBTask>;
};

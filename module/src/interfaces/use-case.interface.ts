import { IDBModule } from "../repository/mongo/models/module.model.js";
import { IDBTask } from "../repository/mongo/models/task.model.js";
import { IModule, ITask } from "./entity.interface.js";

export type IModuleUseCases = {
    addModule: (data: IModule) => Promise<IDBModule>;
    getModules: (data: {
        projectId: string;
        parentModule?: string;
    }) => Promise<IDBModule[]>;
    getModule: (data: { moduleId: string }) => Promise<IDBModule>;
    getModuleList: (data: { projectId: string }) => Promise<IDBModule[]>;
};
export type ITaskUseCases = {
    addTask: (data: ITask) => Promise<IDBTask>;
    getTasks: () => Promise<IDBTask[]>;
};

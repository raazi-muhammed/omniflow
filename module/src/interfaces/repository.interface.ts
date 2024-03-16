import { IDBModule } from "../repository/mongo/models/module.model.js";
import { IModule } from "./entity.interface.js";

export type IModuleRepository = {
    add: (data: IModule) => Promise<IDBModule>;
    getAll: (data: { projectId: string }) => Promise<IDBModule[]>;
};

import { IModule } from "../../interfaces/entity.interface.js";
import { IModuleRepository } from "../../interfaces/repository.interface.js";
import { IDBModule, IModuleModel } from "./models/module.model.js";

export default function buildModuleRepository({
    database,
}: {
    database: IModuleModel;
}): IModuleRepository {
    return Object.freeze({
        add: async (moduleData: IModule) => {
            return (await database.create(moduleData)) as IDBModule;
        },
        getAll: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find({ projectId })
                .populate("dependencies")) as IDBModule[];
        },
    });
}

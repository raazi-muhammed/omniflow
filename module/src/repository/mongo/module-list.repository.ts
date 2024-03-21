import { Types } from "mongoose";
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
        edit: async ({
            moduleData,
            id,
        }: {
            id: string;
            moduleData: IModule;
        }) => {
            const response = await database.updateOne({ _id: id }, moduleData);
            return response.modifiedCount > 0;
        },
        delete: async (id: string) => {
            const response = await database.updateOne(
                { _id: id },
                { deletedAt: new Date() }
            );
            return response.modifiedCount > 0;
        },
        getAll: async ({
            projectId,
            parentModule = null,
        }: {
            projectId: string;
            parentModule?: string;
        }) => {
            return (await database
                .find({ projectId, parentModule, deletedAt: null })
                .populate("dependencies")) as IDBModule[];
        },
        getById: async (moduleId: string) => {
            return (await database
                .findById(new Types.ObjectId(moduleId))
                .populate("dependencies")) as IDBModule;
        },
        getModuleList: async ({ projectId }: { projectId: string }) => {
            return (await database
                .find({ projectId, deletedAt: null })
                .populate("dependencies")) as IDBModule[];
        },
    });
}

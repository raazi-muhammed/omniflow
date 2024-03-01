import { IProject } from "../interfaces/entity.interface.js";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildProjectRepository({
    database,
}): IProjectRepository {
    return Object.freeze({
        add: async (projectData: IProject) => {
            return await database.create(projectData);
        },
        getAll: async () => {
            return await database
                .find()
                .populate("projectLead")
                .populate("members");
        },
        get: async (id: string) => {
            return await database
                .findById(id)
                .populate("projectLead")
                .populate("members");
        },
    });
}

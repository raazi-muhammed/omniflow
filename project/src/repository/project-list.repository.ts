import { IProject } from "../interfaces/entity.interface.js";
import IProjectRepository from "../interfaces/repository.interface.js";

export default function buildProjectRepository({
    database,
}): IProjectRepository {
    return Object.freeze({
        add: async (projectData: IProject) => {
            await database.create(projectData);
            return true;
        },
    });
}

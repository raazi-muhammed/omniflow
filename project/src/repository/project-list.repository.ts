import { Types } from "mongoose";
import { IProject } from "../interfaces/entity.interface.js";
import { IProjectRepository } from "../interfaces/repository.interface.js";
import { IDBProject, IProjectModel } from "./project.model.js";

export default function buildProjectRepository({
    database,
}: {
    database: IProjectModel;
}): IProjectRepository {
    return Object.freeze({
        add: async (projectData: IProject) => {
            return (await database.create(projectData)) as IDBProject;
        },
        getAll: async (userId: Types.ObjectId) => {
            return (await database
                .find({ members: { $in: [userId] } })
                .populate("projectLead")
                .populate("members")) as IDBProject[];
        },
        get: async (id: string) => {
            return (await database
                .findById(id)
                .populate("projectLead")
                .populate("members")) as IDBProject;
        },
    });
}

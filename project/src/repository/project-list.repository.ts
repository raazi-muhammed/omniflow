import { Types } from "mongoose";
import { IMemberInProject, IProject } from "../interfaces/entity.interface.js";
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
        edit: async (projectData: IProject) => {
            const result = await database.updateOne(
                { _id: projectData._id },
                {
                    title: projectData.title,
                    description: projectData.description,
                    startDate: projectData.startDate,
                    dueDate: projectData.dueDate,
                }
            );
            console.log("Updated");

            return result.modifiedCount > 0;
        },
        getAll: async (userId: Types.ObjectId) => {
            return (await database
                .find({ "members.info": userId, isDeleted: false })
                .populate("lead")
                .populate("members.info")) as IDBProject[];
        },
        get: async (id: string) => {
            return (await database
                .findById(id)
                .populate("lead")
                .populate("members.info")) as IDBProject;
        },
        delete: async (id: string) => {
            const result = await database.updateOne(
                {
                    _id: id,
                },
                {
                    isDeleted: true,
                }
            );
            return result.modifiedCount > 0;
        },
        addMember: async ({
            projectId,
            member,
        }: {
            projectId: string;
            member: IMemberInProject;
        }) => {
            const response = await database.updateOne(
                { _id: projectId },
                {
                    $addToSet: { members: member },
                }
            );
            return response.acknowledged;
        },
        changeTeamLead: async ({
            userId,
            projectId,
        }: {
            userId: string;
            projectId: string;
        }) => {
            const response = await database.updateOne(
                { _id: projectId },
                {
                    lead: userId,
                }
            );
            return response.acknowledged;
        },
    });
}

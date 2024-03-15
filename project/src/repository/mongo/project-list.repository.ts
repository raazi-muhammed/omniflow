import { Types } from "mongoose";
import {
    IMemberInProject,
    IProject,
} from "../../interfaces/entity.interface.js";
import { IProjectRepository } from "../../interfaces/repository.interface.js";
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
        edit: async (projectData: {
            id: string;
            title: string;
            description: string;
            startDate: Date;
            dueDate: Date;
            priority: number;
        }) => {
            const result = await database.updateOne(
                { _id: projectData.id },
                {
                    title: projectData.title,
                    description: projectData.description,
                    startDate: projectData.startDate,
                    dueDate: projectData.dueDate,
                    priority: projectData.priority,
                }
            );
            console.log("Updated");

            return result.modifiedCount > 0;
        },
        getAll: async (userId: string) => {
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
                    _id: new Types.ObjectId(id),
                },
                {
                    isDeleted: true,
                }
            );
            console.log({ result });

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
            return response.modifiedCount > 0;
        },
        removeMember: async ({
            projectId,
            memberId,
        }: {
            projectId: string;
            memberId: string;
        }) => {
            const response = await database.updateOne(
                { _id: projectId },
                {
                    $pull: {
                        members: {
                            info: memberId,
                        },
                    },
                }
            );
            return response.modifiedCount > 0;
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

import { ITask } from "../../interfaces/entity.interface.js";
import { ITaskRepository } from "../../interfaces/repository.interface.js";
import { IDBTask, ITaskModel } from "./models/task.model.js";

export default function buildTaskRepository({
    database,
}: {
    database: ITaskModel;
}): ITaskRepository {
    return Object.freeze({
        add: async (taskData: ITask) => {
            return (await database.create(taskData)) as IDBTask;
        },
        edit: async ({
            taskData,
            taskId,
        }: {
            taskId: string;
            taskData: ITask;
        }) => {
            const response = await database.updateOne(
                { _id: taskId },
                taskData
            );
            return response.modifiedCount > 0;
        },
        changeStatus: async ({
            status,
            taskId,
        }: {
            taskId: string;
            status: string;
        }) => {
            const response = await database.updateOne(
                { _id: taskId },
                { status }
            );
            return response.modifiedCount > 0;
        },
        changeAssignee: async ({
            taskId,
            assignee,
        }: {
            taskId: string;
            assignee: string;
        }) => {
            const response = await database.updateOne(
                { _id: taskId },
                { assignee }
            );
            return response.modifiedCount > 0;
        },
        deleteById: async (taskId: string) => {
            const response = await database.updateOne(
                { _id: taskId },
                { deletedAt: new Date() }
            );
            return response.modifiedCount > 0;
        },
        getAll: async ({ projectId }: { projectId: string }) => {
            return (await database.find({
                projectId,
                deletedAt: null,
            })) as IDBTask[];
        },
        getById: async (id: string) => {
            return (await database
                .findOne({ _id: id })
                .populate("assignee")
                .populate("reporter")) as IDBTask;
        },
    });
}

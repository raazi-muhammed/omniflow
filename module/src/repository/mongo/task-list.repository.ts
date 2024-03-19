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
        getAll: async ({ projectId }: { projectId: string }) => {
            return (await database.find({ projectId })) as IDBTask[];
        },
        getById: async (id: string) => {
            return (await database.findOne({ _id: id })) as IDBTask;
        },
    });
}

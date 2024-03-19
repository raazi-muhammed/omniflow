import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { ITaskUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetTaskController({
    taskUseCases,
}: {
    taskUseCases: ITaskUseCases;
}) {
    return async (req: IRequest) => {
        const taskId = req.params.taskId;
        if (!taskId) throw new BadRequestError("Task id not found");

        const tasks = await taskUseCases.getTask({ id: taskId });

        const response = new ResponseCreator();
        return response.setData(tasks);
    };
}

import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITaskUseCases } from "../../interfaces/use-case.interface.js";

export default function buildDeleteTaskController({
    taskUseCases,
}: {
    taskUseCases: ITaskUseCases;
}) {
    return async (req: IRequest) => {
        const taskId = req.params.taskId;
        if (!taskId) throw new BadRequestError("Task id not found");

        await taskUseCases.deleteTask({ taskId: taskId });

        const response = new ResponseCreator();
        return response.setMessage("Task edited");
    };
}

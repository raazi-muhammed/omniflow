import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { ITaskUseCases } from "../../interfaces/use-case.interface.js";

export default function buildEditTaskController({
    taskUseCases,
}: {
    taskUseCases: ITaskUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const taskId = req.params.taskId;
        if (!taskId) throw new BadRequestError("Task id not found");

        const data = req.body;
        validateBody(data, [
            "name",
            "priority",
            "startDate",
            "dueDate",
            "description",
        ]);

        await taskUseCases.editTask({
            taskId,
            taskData: {
                ...data,
                projectId: currentProject.id,
            },
        });

        const response = new ResponseCreator();
        return response.setMessage("Task edited").setStatusCode(204);
    };
}

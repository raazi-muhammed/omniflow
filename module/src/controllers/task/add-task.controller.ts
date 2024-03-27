import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { ITaskUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddTaskController({
    taskUseCases,
}: {
    taskUseCases: ITaskUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject, currentUser } = req;
        const data = req.body;
        validateBody(data, [
            "name",
            "priority",
            "startDate",
            "dueDate",
            "description",
        ]);

        await taskUseCases.addTask({
            ...data,
            projectId: currentProject.id,
            reporter: currentUser,
        });

        const response = new ResponseCreator();
        return response.setMessage("Task created").setStatusCode(201);
    };
}

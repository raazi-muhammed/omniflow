import { IRequest, ResponseCreator } from "@omniflow/common";
import { ITaskUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetTasksController({
    taskUseCases,
}: {
    taskUseCases: ITaskUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const tasks = await taskUseCases.getTasks();

        const response = new ResponseCreator();
        return response.setData(tasks);
    };
}

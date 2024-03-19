import { NotFoundError } from "@omniflow/common";
import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTaskUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async ({ id }: { id: string }) => {
        const task = await taskRepository.getById(id);
        if (!task) throw new NotFoundError("Task not found");

        return task;
    };
}

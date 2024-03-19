import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTasksUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async () => {
        const tasks = await taskRepository.getAll();

        return tasks;
    };
}

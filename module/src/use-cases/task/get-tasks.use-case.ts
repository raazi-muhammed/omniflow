import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTasksUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const tasks = await taskRepository.getAll({ projectId });

        return tasks;
    };
}

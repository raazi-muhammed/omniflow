import { AnErrorOccurredError } from "@omniflow/common";
import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildDeleteTaskUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async ({ taskId }: { taskId: string }) => {
        const deleted = await taskRepository.deleteById(taskId);
        if (!deleted) throw new AnErrorOccurredError();
        return deleted;
    };
}

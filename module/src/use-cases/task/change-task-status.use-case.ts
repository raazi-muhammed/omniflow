import { AnErrorOccurredError } from "@omniflow/common";
import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildChangeTaskStatusUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async ({ taskId, status }: { status: string; taskId: string }) => {
        const updated = await taskRepository.changeStatus({ taskId, status });
        if (!updated) throw new AnErrorOccurredError();
        return updated;
    };
}

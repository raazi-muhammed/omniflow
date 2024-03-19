import { AnErrorOccurredError } from "@omniflow/common";
import { ITask } from "../../interfaces/entity.interface.js";
import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildEditTaskUseCase({
    taskRepository,
}: {
    taskRepository: ITaskRepository;
}) {
    return async ({
        taskId,
        taskData,
    }: {
        taskData: ITask;
        taskId: string;
    }) => {
        const updated = await taskRepository.edit({ taskId, taskData });
        if (!updated) throw new AnErrorOccurredError();
        return updated;
    };
}

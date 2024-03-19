import {
    IModule,
    ITaskEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { ITaskRepository } from "../../interfaces/repository.interface.js";

export default function buildAddTaskUseCase({
    taskRepository,
    TaskCreator,
}: {
    TaskCreator: ITaskEntityConstructor;
    taskRepository: ITaskRepository;
}) {
    return async (moduleData: IModule) => {
        const entity = new TaskCreator(moduleData);
        entity.validate();
        const data = entity.get();

        const task = await taskRepository.add(data);

        return task;
    };
}

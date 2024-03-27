import { Types } from "mongoose";
import {
    ITask,
    ITaskEntityConstructor,
} from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    ITaskRepository,
} from "../../interfaces/repository.interface.js";

export default function buildAddTaskUseCase({
    taskRepository,
    TaskCreator,
    memberRepository,
}: {
    TaskCreator: ITaskEntityConstructor;
    taskRepository: ITaskRepository;
    memberRepository: IMemberRepository;
}) {
    return async (moduleData: ITask) => {
        console.log(
            "----------------------------------------------------------------"
        );

        let reporter = await memberRepository.getByEmail(
            // @ts-ignore
            moduleData.reporter.email
            // @ts-ignore
        );
        // @ts-ignore
        if (!reporter) {
            reporter = await memberRepository.add({
                // @ts-ignore
                username: moduleData.reporter.username,
                // @ts-ignore
                name: moduleData.reporter.name,
                // @ts-ignore
                avatar: moduleData.reporter.avatar,
                // @ts-ignore
                email: moduleData.reporter.email,
                // @ts-ignore
            });
        }

        let assignee = await memberRepository.getByEmail(
            // @ts-ignore
            moduleData.assignee.email
        );
        if (!assignee)
            // @ts-ignore
            assignee = await memberRepository.add(moduleData.assignee);

        const entity = new TaskCreator({
            ...moduleData,
            reporter: new Types.ObjectId(reporter.id),
            assignee: new Types.ObjectId(assignee.id),
        });
        entity.validate();
        const data = entity.get();

        const task = await taskRepository.add(data);

        return task;
    };
}

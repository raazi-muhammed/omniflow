import { Types } from "mongoose";
import {
    IMember,
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
        const inputReporter = moduleData.reporter as IMember;
        let reporter = await memberRepository.getByEmail(inputReporter.email);
        if (!reporter) {
            reporter = await memberRepository.add({
                username: inputReporter.username,
                name: inputReporter.name,
                avatar: inputReporter.avatar,
                email: inputReporter.email,
            });
        }

        const inputAssignee = moduleData.assignee as IMember;
        let assignee = await memberRepository.getByEmail(inputAssignee.email);
        if (!assignee) assignee = await memberRepository.add(inputAssignee);

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

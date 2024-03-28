import { AnErrorOccurredError } from "@omniflow/common";
import {
    IMemberRepository,
    ITaskRepository,
} from "../../interfaces/repository.interface.js";
import { IMember } from "../../interfaces/entity.interface.js";

export default function buildChangeTaskAssigneeUseCase({
    taskRepository,
    memberRepository,
}: {
    taskRepository: ITaskRepository;
    memberRepository: IMemberRepository;
}) {
    return async (input: { assignee: IMember; taskId: string }) => {
        let assignee = await memberRepository.getByEmail(input.assignee.email);
        if (!assignee) assignee = await memberRepository.add(input.assignee);

        const updated = await taskRepository.changeAssignee({
            taskId: input.taskId,
            assignee: assignee.id,
        });
        if (!updated) throw new AnErrorOccurredError();
    };
}

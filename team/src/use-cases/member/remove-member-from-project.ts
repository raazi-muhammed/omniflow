import { AnErrorOccurredError } from "@omniflow/common";
import { IMemberStatusRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveMemberFromProjectUseCase({
    memberStatusRepository,
}: {
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({
        memberId,
        projectId,
    }: {
        memberId: string;
        projectId: string;
    }) => {
        const deleted = await memberStatusRepository.removeMemberFromProject({
            memberId,
            projectId,
        });

        if (!deleted) throw new AnErrorOccurredError();
    };
}

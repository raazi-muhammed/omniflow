import { IMemberStatusRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMembersListUseCase({
    memberStatusRepository,
}: {
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const data = await memberStatusRepository.getAllMembers({
            projectId,
        });
        return data;
    };
}

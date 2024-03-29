import {
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildGetMembersListUseCase({
    teamRepository,
    memberStatusRepository,
}: {
    teamRepository: ITeamRepository;
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const data = await memberStatusRepository.getAllMembers({
            projectId,
        });
        return data;
    };
}

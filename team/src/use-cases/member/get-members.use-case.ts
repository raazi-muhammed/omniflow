import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMembersListUseCase({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const data = await teamRepository.getAllMembers({
            projectId,
        });
        return data;
    };
}

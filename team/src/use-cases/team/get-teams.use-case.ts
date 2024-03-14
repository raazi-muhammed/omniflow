import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTeamsUseCase({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const teams = await teamRepository.getTeams({
            projectId,
        });

        return teams;
    };
}

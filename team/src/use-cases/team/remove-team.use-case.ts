import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveTeamUseCase({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async ({
        projectId,
        teamName,
    }: {
        projectId: string;
        teamName: string;
    }) => {
        await teamRepository.removeTeam({
            projectId,
            teamName,
        });
    };
}

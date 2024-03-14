import { AnErrorOccurredError } from "@omniflow/common";
import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMembersFromTeamUseCase({
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
        const teamData = await teamRepository.getTeam({
            projectId,
            teamName,
        });
        if (!teamData) throw new AnErrorOccurredError();

        return teamData;
    };
}

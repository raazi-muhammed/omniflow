import { AnErrorOccurredError, NotFoundError } from "@omniflow/common";
import { IMemberStatusRepository } from "../../interfaces/repository.interface.js";
import { teamRepository } from "../../repository/mongo/index.js";

export default function buildRemoveMemberFromTeamUseCase({
    memberStatusRepository,
}: {
    memberStatusRepository: IMemberStatusRepository;
}) {
    return async ({
        memberId,
        projectId,
        teamName,
    }: {
        memberId: string;
        teamName: string;
        projectId: string;
    }) => {
        const team = await teamRepository.getTeam({ projectId, teamName });
        if (!team) throw new NotFoundError("Team not found");

        const deleted = await memberStatusRepository.removeMemberFromTeam({
            projectId,
            memberId,
            teamId: team.id,
        });
        if (!deleted) throw new AnErrorOccurredError();
    };
}

import { NotFoundError } from "@omniflow/common";
import {
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildGetMembersFromTeamUseCase({
    memberStatusRepository,
    teamRepository,
}: {
    memberStatusRepository: IMemberStatusRepository;
    teamRepository: ITeamRepository;
}) {
    return async ({
        projectId,
        teamName,
    }: {
        projectId: string;
        teamName: string;
    }) => {
        const team = await teamRepository.getTeam({ projectId, teamName });
        if (!team) throw new NotFoundError("Team not found");

        const data = await memberStatusRepository.getMembersFromTeam({
            projectId,
            teamId: team.id,
        });
        return data;
    };
}

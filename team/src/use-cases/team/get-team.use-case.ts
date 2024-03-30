import { AnErrorOccurredError } from "@omniflow/common";
import {
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { IDBTeam } from "../../repository/mongo/models/team.model.js";

export default function buildGetTeamUseCase({
    teamRepository,
    memberStatusRepository,
}: {
    teamRepository: ITeamRepository;
    memberStatusRepository: IMemberStatusRepository;
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

        const members = await memberStatusRepository.getMembersFromTeam({
            projectId,
            teamId: teamData.id,
        });

        return {
            ...teamData,
            name: teamData.name,
            lead: teamData.lead,
            members,
        } as IDBTeam;
    };
}

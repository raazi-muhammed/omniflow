import { AnErrorOccurredError, ConflictError } from "@omniflow/common";
import {
    ITeamEntityConstructor,
    InviteStatus,
    Role,
} from "../../interfaces/entity.interface.js";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildAddTeamUseCase({
    TeamEntity,
    teamRepository,
    memberRepository,
}: {
    TeamEntity: ITeamEntityConstructor;
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async ({
        teamName,
        leadEmail,
        projectId,
    }: {
        teamName: string;
        leadEmail: string;
        projectId: string;
    }) => {
        const leadUser = await memberRepository.getByEmail(leadEmail);

        const foundTeam = await teamRepository.getTeam({
            projectId,
            teamName,
        });
        if (foundTeam) throw new ConflictError("Team name taken");

        const teamEntity = new TeamEntity({
            name: teamName,
            project: projectId,
            lead: leadUser.id,
            members: [
                {
                    role: Role.TEAM_LEAD,
                    inviteStatus: InviteStatus.ACCEPTED,
                    info: leadUser.id,
                },
            ],
        });

        await teamRepository.removeMemberFromTeam({
            teamName: "Default",
            projectId,
            memberId: leadUser.id,
        });

        const teamAdded = await teamRepository.add(teamEntity);
        if (!teamAdded) throw new AnErrorOccurredError();

        return teamAdded;
    };
}

import { UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    IMemberStatusRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { InviteStatus, Role } from "../../interfaces/entity.interface.js";

export default function buildMoveMemberToTeamUseCase({
    memberRepository,
    memberStatusRepository,
    teamRepository,
}: {
    memberRepository: IMemberRepository;
    memberStatusRepository: IMemberStatusRepository;
    teamRepository: ITeamRepository;
}) {
    return async ({
        projectId,
        toTeamName,
        formTeamName,
        memberEmail,
    }: {
        toTeamName: string;
        formTeamName: string;
        projectId: string;
        memberEmail: string;
    }) => {
        const user = await memberRepository.getByEmail(memberEmail);
        if (!user) throw new UserNotFoundError();

        const team = await teamRepository.getTeam({
            projectId,
            teamName: toTeamName,
        });

        await memberStatusRepository.addMember({
            deletedAt: null,
            info: user.id,
            inviteStatus: InviteStatus.ACCEPTED,
            project: projectId,
            role: Role.DEFAULT,
            team: team.id,
        });
    };
}

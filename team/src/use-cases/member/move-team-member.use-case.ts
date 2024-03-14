import { UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { InviteStatus, Role } from "../../interfaces/entity.interface.js";

export default function buildMoveMemberToTeamUseCase({
    teamRepository,
    memberRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
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

        await teamRepository.addMemberToTeam({
            projectId,
            teamName: toTeamName,
            member: {
                inviteStatus: InviteStatus.ACCEPTED,
                role: Role.DEFAULT,
                info: user.id,
            },
        });
        await teamRepository.removeMemberFromTeam({
            projectId,
            teamName: formTeamName,
            memberId: user.id,
        });
    };
}

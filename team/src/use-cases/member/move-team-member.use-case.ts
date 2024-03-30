import { ConflictError, UserNotFoundError } from "@omniflow/common";
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

        const toTeam = await teamRepository.getTeam({
            projectId,
            teamName: toTeamName,
        });

        const fromTeam = await teamRepository.getTeam({
            projectId,
            teamName: formTeamName,
        });

        const memberAlreadyExists =
            await memberStatusRepository.getMemberFromTeam({
                memberId: user.id,
                projectId,
                teamId: toTeam.id,
            });
        if (memberAlreadyExists)
            throw new ConflictError("Member already on that team");

        await memberStatusRepository.moveMemberFromTeam({
            projectId,
            fromTeamId: fromTeam.id,
            toTeamId: toTeam.id,
            memberId: user.id,
        });
    };
}

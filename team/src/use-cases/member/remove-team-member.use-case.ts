import { ResponseCreator, UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildRemoveMemberFromTeamUseCase({
    teamRepository,
    memberRepository,
}: {
    teamRepository: ITeamRepository;
    memberRepository: IMemberRepository;
}) {
    return async ({
        memberEmail,
        projectId,
        teamName,
    }: {
        memberEmail: string;
        teamName: string;
        projectId: string;
    }) => {
        const user = await memberRepository.getByEmail(memberEmail);
        if (!user) throw new UserNotFoundError();

        await teamRepository.removeMemberFromTeam({
            projectId,
            teamName,
            memberId: user.id,
        });
    };
}

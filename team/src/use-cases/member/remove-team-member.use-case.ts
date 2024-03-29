import { ResponseCreator, UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { IMemberProducers } from "../../interfaces/broker.interface.js";

export default function buildRemoveMemberFromTeamUseCase({
    teamRepository,
    memberRepository,
    memberProducers,
}: {
    teamRepository: ITeamRepository;
    memberProducers: IMemberProducers;
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

        /* await teamRepository.removeMemberFromTeam({
            projectId,
            teamName,
            memberId: user.id,
        });

        await memberProducers.removeMemberToProject({
            userEmail: memberEmail,
            projectId: projectId,
        }); */
    };
}

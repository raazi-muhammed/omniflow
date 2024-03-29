import {
    AnErrorOccurredError,
    BadRequestError,
    UserNotFoundError,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";

export default function buildChangeTeamLeadUseCase({
    memberRepository,
    teamRepository,
}: {
    memberRepository: IMemberRepository;
    teamRepository: ITeamRepository;
}) {
    return async ({
        leadEmail,
        projectId,
        teamName,
    }: {
        leadEmail: string;
        teamName: string;
        projectId: string;
    }) => {
        const userFound = await memberRepository.getByEmail(leadEmail);
        if (!userFound) throw new UserNotFoundError();

        const currentTeam = await teamRepository.getTeam({
            projectId,
            teamName,
        });
        if (currentTeam.lead.id === userFound.id)
            throw new BadRequestError(`${userFound.name} is already team lead`);

        const teamLeadChanged = await teamRepository.changeTeamLead({
            projectId,
            teamName,
            userId: userFound.id,
        });

        /* await teamRepository.removeMemberFromTeam({
            projectId,
            teamName,
            memberId: userFound.id,
        }); */

        if (!teamLeadChanged) {
            throw new AnErrorOccurredError("Changing team lead failed");
        }
    };
}

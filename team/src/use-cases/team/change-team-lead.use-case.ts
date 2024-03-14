import { AnErrorOccurredError, UserNotFoundError } from "@omniflow/common";
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

        const teamLeadChanged = await teamRepository.changeTeamLead({
            projectId,
            teamName,
            userId: userFound.id,
        });

        if (!teamLeadChanged) {
            throw new AnErrorOccurredError("Changing team lead failed");
        }
    };
}

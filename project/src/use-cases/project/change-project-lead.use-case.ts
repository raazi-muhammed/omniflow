import { AnErrorOccurredError, UserNotFoundError } from "@omniflow/common";
import {
    IMemberRepository,
    IProjectRepository,
} from "../../interfaces/repository.interface.js";

export default function buildChangeProjectLeadUseCase({
    memberRepository,
    projectRepository,
}: {
    memberRepository: IMemberRepository;
    projectRepository: IProjectRepository;
}) {
    return async ({
        leadEmail,
        projectId,
    }: {
        leadEmail: string;
        projectId: string;
    }) => {
        const userFound = await memberRepository.getByEmail(leadEmail);
        if (!userFound) throw new UserNotFoundError();

        const teamLeadChanged = await projectRepository.changeTeamLead({
            projectId,
            userId: userFound.id,
        });
        if (!teamLeadChanged) {
            throw new AnErrorOccurredError("Changing team lead failed");
        }
    };
}

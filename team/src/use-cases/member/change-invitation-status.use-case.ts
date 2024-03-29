import {
    AnErrorOccurredError,
    UnauthorizedError,
    UserNotFoundError,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../../interfaces/repository.interface.js";
import { IMemberProducers } from "../../interfaces/broker.interface.js";

export default function buildChangeInvitationStatusUseCase({
    memberRepository,
    teamRepository,
    memberProducers,
}: {
    memberRepository: IMemberRepository;
    teamRepository: ITeamRepository;
    memberProducers: IMemberProducers;
}) {
    return async ({
        memberId,
        projectId,
        currentUserEmail,
        invitationAccepted,
    }: {
        memberId: string;
        projectId: string;
        currentUserEmail: string;
        invitationAccepted: boolean;
    }) => {
        const memberDetails = await memberRepository.getById(memberId);
        if (!memberDetails) throw new UserNotFoundError();

        if (memberDetails.email !== currentUserEmail) {
            throw new UnauthorizedError("please login, unauthorized");
        }

        if (invitationAccepted) {
            const isUpdated = await teamRepository.invitationAccepted({
                projectId,
                memberId: memberDetails.id,
            });

            if (!isUpdated) throw new AnErrorOccurredError();

            memberProducers.addMemberToProject({
                userData: memberDetails,
                projectId,
            });
        } else {
            const isUpdated = await teamRepository.invitationRejected({
                projectId,
                memberId: memberDetails.id,
            });
            if (!isUpdated) throw new AnErrorOccurredError();
        }
    };
}

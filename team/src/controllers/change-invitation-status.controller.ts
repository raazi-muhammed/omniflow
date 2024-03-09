import {
    AnErrorOccurredError,
    IRequest,
    IToken,
    ResponseCreator,
    UnauthorizedError,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import {
    IMemberRepository,
    ITeamRepository,
} from "../interfaces/repository.interface.js";
import { InvitationTokenData } from "../interfaces/utils.interface.js";
import { IAddMemberProducer } from "../interfaces/events.interface.js";

export default function buildChangeInvitationStatusController({
    token,
    memberRepository,
    teamRepository,
    productAddMember,
}: {
    token: IToken<InvitationTokenData>;
    memberRepository: IMemberRepository;
    teamRepository: ITeamRepository;
    productAddMember: IAddMemberProducer;
}) {
    return async (req: IRequest) => {
        const { currentUser } = req;
        validateBody(req.body, ["token", "invitationAccepted"]);

        const tokenBody = req.body.token;
        const invitationAccepted = req.body.invitationAccepted;

        if (!tokenBody) throw new Error("No token founds");

        const tokenData = await token.verify(`Bearer ${tokenBody}`);

        const memberDetails = await memberRepository.getById(
            tokenData.memberId
        );
        if (!memberDetails) throw new UserNotFoundError();

        if (memberDetails.email !== currentUser.email) {
            throw new UnauthorizedError("please login, unauthorized");
        }

        if (invitationAccepted) {
            const isUpdated = await teamRepository.invitationAccepted({
                projectId: tokenData.projectId,
                memberId: memberDetails.id,
            });

            if (!isUpdated) throw new AnErrorOccurredError();

            productAddMember({
                userData: memberDetails,
                projectId: tokenData.projectId,
            });
        } else {
            const isUpdated = await teamRepository.invitationRejected({
                projectId: tokenData.projectId,
                memberId: memberDetails.id,
            });
            if (!isUpdated) throw new AnErrorOccurredError();
        }

        const response = new ResponseCreator();
        return response.setMessage(
            invitationAccepted ? "Invitation accepted" : "Invitation rejected"
        );
    };
}

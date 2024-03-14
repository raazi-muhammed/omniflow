import {
    IRequest,
    IToken,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { InvitationTokenData } from "../../interfaces/utils.interface.js";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildChangeInvitationStatusController({
    token,
    memberUseCases,
}: {
    token: IToken<InvitationTokenData>;
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentUser } = req;
        validateBody(req.body, ["token", "invitationAccepted"]);

        const tokenBody = req.body.token;
        const invitationAccepted = req.body.invitationAccepted;

        if (!tokenBody) throw new Error("No token founds");

        const tokenData = await token.verify(`Bearer ${tokenBody}`);

        await memberUseCases.changeInvitationStatus({
            currentUserEmail: currentUser.email,
            invitationAccepted,
            memberId: tokenData.memberId,
            projectId: tokenData.projectId,
        });

        const response = new ResponseCreator();
        return response.setMessage(
            invitationAccepted ? "Invitation accepted" : "Invitation rejected"
        );
    };
}

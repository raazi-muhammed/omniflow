import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMemberFromTeamController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const projectId = req.currentProject.id;
        const teamName = req.params.name;
        if (!teamName || typeof teamName !== "string") {
            throw new BadRequestError("Invalid team name");
        }
        const memberId = req.params.memberId;
        if (!memberId || typeof memberId !== "string") {
            throw new BadRequestError("Invalid member id");
        }

        await memberUseCases.removeMemberFromTeam({
            projectId,
            memberId: memberId,
            teamName,
        });

        const response = new ResponseCreator();
        return response.setMessage("Member removed");
    };
}

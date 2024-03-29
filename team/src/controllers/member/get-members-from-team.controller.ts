import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    logger,
} from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMembersFromTeamController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const teamName = req.params.name;
        if (!teamName || typeof teamName !== "string") {
            throw new BadRequestError("Invalid team data");
        }

        const members = await memberUseCases.getMembersFromTeam({
            projectId: currentProject.id,
            teamName,
        });

        const response = new ResponseCreator();
        return response.setData(members);
    };
}

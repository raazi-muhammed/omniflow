import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMemberFromTeamController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputData = req.params;

        validateBody(inputData, ["name", "email"]);

        await memberUseCases.removeMemberFromTeam({
            projectId: currentProject.id,
            memberEmail: inputData.email,
            teamName: inputData.name,
        });

        const response = new ResponseCreator();
        return response.setMessage("Member removed");
    };
}

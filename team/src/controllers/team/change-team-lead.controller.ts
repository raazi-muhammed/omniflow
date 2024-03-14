import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { ITeamUseCases } from "../../interfaces/use-case.interface.js";

export default function buildChangeTeamLeadController({
    teamUseCases,
}: {
    teamUseCases: ITeamUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputBody = req.body;
        validateBody(inputBody, ["lead", "teamName"]);

        await teamUseCases.changeTeamLead({
            leadEmail: inputBody.lead,
            teamName: inputBody.teamName,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setMessage("Team lead changed");
    };
}

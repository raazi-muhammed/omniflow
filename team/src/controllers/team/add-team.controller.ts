import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { ITeamUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddTeamController({
    teamUseCases,
}: {
    teamUseCases: ITeamUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const teamInput = req.body;
        validateBody(teamInput, ["name", "lead"]);

        const team = await teamUseCases.addTeam({
            leadEmail: teamInput.lead,
            projectId: currentProject.id,
            teamName: teamInput.name,
        });

        const response = new ResponseCreator();
        return response.setData(team).setMessage("Team added");
    };
}

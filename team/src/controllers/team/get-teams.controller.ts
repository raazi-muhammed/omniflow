import { IRequest, ResponseCreator } from "@omniflow/common";
import { ITeamRepository } from "../../interfaces/repository.interface.js";
import { ITeamUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetTeamsController({
    teamUseCases,
}: {
    teamUseCases: ITeamUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const teams = await teamUseCases.getTeams({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(teams);
    };
}

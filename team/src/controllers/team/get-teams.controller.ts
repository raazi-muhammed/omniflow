import { IRequest, ResponseCreator } from "@omniflow/common";
import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTeamsController({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const teams = await teamRepository.getTeams({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(teams);
    };
}

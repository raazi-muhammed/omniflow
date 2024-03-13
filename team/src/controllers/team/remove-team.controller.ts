import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveTeamController({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const inputData = req.params;
        console.log({ inputData, name: inputData.name });

        validateBody(inputData, ["name"]);

        await teamRepository.removeTeam({
            projectId: currentProject.id,
            teamName: inputData.name,
        });

        const response = new ResponseCreator();
        return response.setMessage("Team removed");
    };
}

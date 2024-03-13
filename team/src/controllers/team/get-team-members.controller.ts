import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { ITeamRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMembersFromTeamController({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const team = req.params.name;

        if (!team || typeof team !== "string") {
            throw new BadRequestError("Invalid team data");
        }

        const data = await teamRepository.getTeam({
            projectId: currentProject.id,
            teamName: team,
        });

        if (!data) throw new AnErrorOccurredError();

        const response = new ResponseCreator();

        return response.setData(data);
    };
}

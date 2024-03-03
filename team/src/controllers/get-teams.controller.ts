import {
    IRequest,
    ReposeCreator,
    UnauthorizedError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { ITeamRepository } from "../interfaces/repository.interface.js";

export default function buildGetTeamsController({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentUser, currentProject } = req;

        if (!currentUser) throw new UserUnauthorizedError();
        if (!currentProject) {
            throw new UnauthorizedError("Project not authorized");
        }

        const teams = await teamRepository.getTeams({
            projectId: currentProject._id,
        });

        const response = new ReposeCreator();
        return response.setData(teams);
    };
}

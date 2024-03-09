import { IRequest, ResponseCreator } from "@omniflow/common";
import { ITeamRepository } from "../interfaces/repository.interface.js";

export default function buildGetMembersListController({
    teamRepository,
}: {
    teamRepository: ITeamRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const data = await teamRepository.getAllMembers({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(data);
    };
}

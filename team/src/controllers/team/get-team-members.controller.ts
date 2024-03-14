import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { ITeamUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMembersFromTeamController({
    teamUseCases,
}: {
    teamUseCases: ITeamUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const team = req.params.name;

        if (!team || typeof team !== "string") {
            throw new BadRequestError("Invalid team data");
        }

        const data = await teamUseCases.getTeamMembers({
            projectId: currentProject.id,
            teamName: team,
        });

        const response = new ResponseCreator();
        return response.setData(data);
    };
}

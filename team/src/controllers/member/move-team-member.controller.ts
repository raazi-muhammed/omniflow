import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildMoveMemberToTeamController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputData = req.body;

        validateBody(inputData, ["toTeam", "fromTeam", "email"]);

        await memberUseCases.moveMemberToTeam({
            toTeamName: inputData.toTeam,
            formTeamName: inputData.fromTeam,
            memberEmail: inputData.email,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setMessage("Member moved");
    };
}

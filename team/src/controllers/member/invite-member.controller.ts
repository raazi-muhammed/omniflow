import { IRequest, validateBody, ResponseCreator } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildInviteMemberController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const userInput = req.body;
        validateBody(userInput, ["email", "message", "username", "name"]);

        await memberUseCases.inviteMember({
            email: userInput.email,
            message: userInput.message,
            username: userInput.username,
            name: userInput.name,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setStatusCode(201).setMessage("User invited");
    };
}

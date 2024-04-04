import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildChangeMemberAccessController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const memberUsername = req.params.memberUsername;
        if (!memberUsername || typeof memberUsername !== "string") {
            throw new BadRequestError("Invalid username");
        }
        const input = req.body;

        validateBody(input, ["apiDoc", "dbDesign", "module"]);

        const access = await memberUseCases.changeMemberAccess({
            projectId: currentProject.id,
            userName: memberUsername,
            access: input,
        });

        const response = new ResponseCreator();
        return response.setMessage("Access updated").setData(access);
    };
}

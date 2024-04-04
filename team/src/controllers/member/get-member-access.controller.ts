import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";
import { IAccess } from "../../interfaces/entity.interface.js";

export default function buildGetMemberAccessController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject, currentUser } = req;
        const memberUsername = req.params.memberUsername;
        if (!memberUsername || typeof memberUsername !== "string") {
            throw new BadRequestError("Invalid username");
        }

        const access = await memberUseCases.getMemberAccess({
            projectId: currentProject.id,
            userName: currentUser.username,
        });

        let toReturn: IAccess;
        if (!access) {
            toReturn = {
                apiDoc: 0,
                dbDesign: 0,
                module: 0,
            };
        } else {
            toReturn = access.access;
        }

        const response = new ResponseCreator();
        return response.setData(toReturn);
    };
}

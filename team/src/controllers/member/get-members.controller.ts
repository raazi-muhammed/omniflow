import { IRequest, ResponseCreator, logger } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMembersController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const members = await memberUseCases.getMembersList({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(members);
    };
}

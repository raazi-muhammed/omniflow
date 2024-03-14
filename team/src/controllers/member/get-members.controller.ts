import { IRequest, ResponseCreator } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetMembersListController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const members = memberUseCases.getMembersList({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(members);
    };
}

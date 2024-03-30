import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";

export default function buildRemoveMemberFromProjectController({
    memberUseCases,
}: {
    memberUseCases: IMemberUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const memberId = req.params.memberId;
        if (!memberId || typeof memberId !== "string") {
            throw new BadRequestError("Invalid member id");
        }

        await memberUseCases.removeMemberFromProject({
            projectId: currentProject.id,
            memberId,
        });

        const response = new ResponseCreator();
        return response.setMessage("Member removed");
    };
}

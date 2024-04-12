import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

export default function buildChangeProjectLeadController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const inputBody = req.body;
        validateBody(inputBody, ["lead"]);

        await projectUseCases.changeProjectLead({
            projectId: currentProject.id,
            leadEmail: inputBody.lead,
        });

        const response = new ResponseCreator();
        return response.setMessage("Team lead changed").setStatusCode(204);
    };
}

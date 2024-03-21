import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

export default function buildDeleteProjectController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        await projectUseCases.deleteProject({ projectId: currentProject.id });

        const response = new ResponseCreator();
        return response.setMessage("Project deleted").setStatusCode(204);
    };
}

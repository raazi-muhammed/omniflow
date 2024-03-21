import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

export default function buildEditProjectController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const projectData = req.body;

        validateBody(projectData, [
            "title",
            "startDate",
            "dueDate",
            "description",
        ]);

        await projectUseCases.editProject({
            projectId: currentProject.id,
            title: projectData.title,
            description: projectData.description,
            dueDate: projectData.dueDate,
            startDate: projectData.startDate,
            priority: projectData.priority,
        });

        const response = new ResponseCreator();
        return response.setMessage("Project edited").setStatusCode(204);
    };
}

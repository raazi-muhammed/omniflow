import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";
import { IProject } from "../../interfaces/entity.interface.js";

function sanitizeProjectData(projectData: any): IProject {
    projectData.startDate = new Date(projectData.startDate);
    projectData.dueDate = new Date(projectData.dueDate);

    return projectData;
}

export default function buildAddProjectController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const projectData = req.body;
        const currentUser = req.currentUser;

        validateBody(projectData, [
            "title",
            "description",
            "dueDate",
            "startDate",
            "priority",
        ]);

        const addProjectData = sanitizeProjectData(projectData);

        const project = await projectUseCases.addProject({
            member: currentUser,
            projectData: addProjectData,
        });

        const response = new ResponseCreator();
        return response
            .setData(project)
            .setStatusCode(201)
            .setMessage("Project added");
    };
}

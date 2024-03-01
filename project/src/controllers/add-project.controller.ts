import { IRequest, ReposeCreator, validateBody } from "@omniflow/common";
import IProjectRepository from "../interfaces/repository.interface.js";
import { IAddProjectUseCase } from "../interfaces/use-case.interface.js";
import { IProject } from "../interfaces/entity.interface.js";

function sanitizeProjectData(projectData: any): IProject {
    projectData.projectLead = projectData.currentUser;
    delete projectData.currentUser;
    projectData.startDate = new Date(projectData.startDate);
    projectData.dueDate = new Date(projectData.dueDate);

    return projectData;
}

export default function buildAddProjectController({
    projectRepository,
    addProjectUseCase,
}: {
    projectRepository: IProjectRepository;
    addProjectUseCase: IAddProjectUseCase;
}) {
    return async (req: IRequest) => {
        console.log(req);
        const projectData = req.body;
        if (!projectData.currentUser) throw new Error("Please login");

        console.log({ projectData });

        validateBody(projectData, [
            "title",
            "description",
            "dueDate",
            "startDate",
            "priority",
        ]);

        const addProjectData = sanitizeProjectData(projectData);

        console.log({ addProjectData });

        const project = await addProjectUseCase(addProjectData);

        const projectAdded = await projectRepository.add(project);
        if (!projectAdded) throw new Error("Cannot add project to db");

        const response = new ReposeCreator();
        return response.setData(project).setStatusCode(201);
    };
}

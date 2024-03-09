import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";
import { IAddProjectUseCase } from "../interfaces/use-case.interface.js";

export default function buildEditProjectController({
    projectRepository,
    createProject,
}: {
    projectRepository: IProjectRepository;
    createProject: IAddProjectUseCase;
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

        const project = createProject(projectData);

        const updateProject = await projectRepository.edit({
            id: currentProject.id,
            ...project,
        });

        console.log({ updateProject, project, currentProject, projectData });

        const response = new ResponseCreator();

        return response.setData(updateProject).setMessage("Project edited");
    };
}

import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";
import { IAddProjectUseCase } from "../interfaces/use-case.interface.js";

export default function buildEditProjectController({
    projectRepository,
    addProjectUseCase,
}: {
    projectRepository: IProjectRepository;
    addProjectUseCase: IAddProjectUseCase;
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

        const project = await addProjectUseCase(projectData);

        const updateProject = await projectRepository.edit({
            _id: currentProject._id,
            ...project,
        });

        console.log({ updateProject, project, currentProject, projectData });

        const response = new ResponseCreator();

        return response.setData(updateProject).setMessage("Project edited");
    };
}
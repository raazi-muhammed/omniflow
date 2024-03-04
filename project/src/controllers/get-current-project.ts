import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildGetCurrentProject({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const projectData = await projectRepository.get(currentProject._id);

        const response = new ResponseCreator();
        return response.setData(projectData);
    };
}

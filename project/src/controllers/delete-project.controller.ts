import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildDeleteProjectController({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        console.log("delte project");

        const response = new ResponseCreator();
        await projectRepository.delete(currentProject._id);

        return response.setMessage("Project deleted");
    };
}

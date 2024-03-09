import {
    AnErrorOccurredError,
    IRequest,
    NotFoundError,
    ResponseCreator,
} from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildDeleteProjectController({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const projectDeleted = await projectRepository.delete(
            currentProject.id
        );

        if (!projectDeleted) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        await projectRepository.delete(currentProject.id);

        return response.setMessage("Project deleted");
    };
}

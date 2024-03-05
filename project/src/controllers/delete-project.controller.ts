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
        console.log({ currentProject });

        const toDelteProject = await projectRepository.get(currentProject._id);
        console.log({ toDelteProject });

        const projectDeleted = await projectRepository.delete(
            currentProject._id
        );

        console.log({ projectDeleted });

        if (!projectDeleted) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        await projectRepository.delete(currentProject._id);

        return response.setMessage("Project deleted");
    };
}

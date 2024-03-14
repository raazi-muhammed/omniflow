import { AnErrorOccurredError } from "@omniflow/common";
import { IProjectRepository } from "../../interfaces/repository.interface.js";

export default function buildDeleteProjectUseCase({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const projectDeleted = await projectRepository.delete(projectId);
        if (!projectDeleted) throw new AnErrorOccurredError();
    };
}

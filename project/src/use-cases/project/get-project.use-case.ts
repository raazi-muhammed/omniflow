import { IToken } from "@omniflow/common";
import { IProjectRepository } from "../../interfaces/repository.interface.js";
import { IProject } from "../../interfaces/entity.interface.js";

export default function buildGetProjectUseCase({
    projectRepository,
    token,
}: {
    projectRepository: IProjectRepository;
    token: IToken<IProject>;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const projectData = await projectRepository.get(projectId);
        const projectToken = token.sign(projectData);

        return {
            project: projectData,
            token: projectToken,
        };
    };
}

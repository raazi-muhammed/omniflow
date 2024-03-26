import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildGetFoldersUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const folders = await endPointsRepository.getFolders({ projectId });
        return folders;
    };
}

import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildGetFoldersUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({
        projectId,
        parentFolder,
    }: {
        projectId: string;
        parentFolder?: string;
    }) => {
        const folders = await endPointsRepository.getFolders({
            projectId,
            parentFolder,
        });
        return folders;
    };
}

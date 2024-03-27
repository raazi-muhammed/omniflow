import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildGetFolderListUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const folders = await endPointsRepository.getFolderList({
            projectId,
        });
        return folders;
    };
}

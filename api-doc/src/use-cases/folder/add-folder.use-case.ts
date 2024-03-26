import { IFolder } from "../../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddFolderUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (data: IFolder) => {
        const folder = await endPointsRepository.addFolder(data);
        return folder;
    };
}

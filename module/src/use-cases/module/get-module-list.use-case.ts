import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildGetModuleListUseCase({
    moduleRepository,
}: {
    moduleRepository: IModuleRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        return await moduleRepository.getModuleList({ projectId });
    };
}

import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildGetModulesUseCase({
    moduleRepository,
}: {
    moduleRepository: IModuleRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        return await moduleRepository.getAll({ projectId });
    };
}

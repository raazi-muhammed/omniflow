import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildGetModuleUseCase({
    moduleRepository,
}: {
    moduleRepository: IModuleRepository;
}) {
    return async ({ moduleId }: { moduleId: string }) => {
        return await moduleRepository.getById(moduleId);
    };
}

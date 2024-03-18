import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildGetModulesUseCase({
    moduleRepository,
}: {
    moduleRepository: IModuleRepository;
}) {
    return async ({
        projectId,
        parentModule,
    }: {
        projectId: string;
        parentModule?: string;
    }) => {
        return await moduleRepository.getAll({ projectId, parentModule });
    };
}

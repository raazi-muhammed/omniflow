import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTablesUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const table = await databaseRepository.getTables({ projectId });
        return table;
    };
}

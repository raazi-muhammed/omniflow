import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildGetTableUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ tableId }: { tableId: string }) => {
        const table = await databaseRepository.getTableById(tableId);
        return table;
    };
}

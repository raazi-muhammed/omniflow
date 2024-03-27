import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildEditTableUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({
        tableId,
        tableData,
    }: {
        tableData: { name: string; description: string };
        tableId: string;
    }) => {
        const table = await databaseRepository.editTable({
            id: tableId,
            tableData,
        });
        return table;
    };
}

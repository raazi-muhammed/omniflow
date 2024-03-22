import { ITable, ITableField } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildAddTableFieldUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async (data: ITableField) => {
        const table = await databaseRepository.addTableField(data);
        return table;
    };
}

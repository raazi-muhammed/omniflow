import {
    ITable,
    ITableEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildAddTableUseCase({
    databaseRepository,
    Table,
}: {
    databaseRepository: IDatabaseRepository;
    Table: ITableEntityConstructor;
}) {
    return async (data: ITable) => {
        const tableEntity = new Table(data);
        tableEntity.validate();
        const tableData = tableEntity.get();

        const table = await databaseRepository.addTable(tableData);
        return table;
    };
}

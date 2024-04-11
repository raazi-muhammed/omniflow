import {
    ITableField,
    ITableFieldEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildAddTableFieldUseCase({
    databaseRepository,
    TableField,
}: {
    databaseRepository: IDatabaseRepository;
    TableField: ITableFieldEntityConstructor;
}) {
    return async (data: ITableField) => {
        const tableFieldEntity = new TableField(data);
        tableFieldEntity.validate();
        const tableField = tableFieldEntity.get();

        const table = await databaseRepository.addTableField(tableField);
        return table;
    };
}

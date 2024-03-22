import { databaseRepository } from "../repository/sql/index.js";
import { ITableUseCases } from "../interfaces/use-cases.interface.js";
import buildChangeTablePosition from "./table/change-table-position.use-case.js";
import buildGetTablesUseCase from "./table/get-tables.use-case.js";
import buildAddTableUseCase from "./table/add-table.use-case.js";

const addTable = buildAddTableUseCase({ databaseRepository });
const getTables = buildGetTablesUseCase({ databaseRepository });
const changeTablePosition = buildChangeTablePosition({ databaseRepository });

export const tableUseCases: ITableUseCases = {
    addTable,
    getTables,
    changeTablePosition,
};

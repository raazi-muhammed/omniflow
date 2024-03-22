import { databaseRepository } from "../repository/sql/index.js";
import { ITableUseCases } from "../interfaces/use-cases.interface.js";
import buildChangeTablePosition from "./table/change-table-position.use-case.js";
import buildGetTablesUseCase from "./table/get-tables.use-case.js";
import buildAddTableUseCase from "./table/add-table.use-case.js";
import buildGetTableUseCase from "./table/get-table.use-case.js";

const addTable = buildAddTableUseCase({ databaseRepository });
const getTables = buildGetTablesUseCase({ databaseRepository });
const changeTablePosition = buildChangeTablePosition({ databaseRepository });
const getTable = buildGetTableUseCase({ databaseRepository });

export const tableUseCases: ITableUseCases = {
    addTable,
    getTables,
    getTable,
    changeTablePosition,
};

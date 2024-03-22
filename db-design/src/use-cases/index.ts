import addTableUseCase from "./table/add-table.use-case.js";
import { databaseRepository } from "../repository/sql/index.js";
import { ITableUseCases } from "../interfaces/use-cases.interface.js";
import getTablesUseCase from "./table/get-tables.use-case.js";

const addTable = addTableUseCase({ databaseRepository });
const getTables = getTablesUseCase({ databaseRepository });

export const tableUseCases: ITableUseCases = {
    addTable,
    getTables,
};

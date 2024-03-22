import { ITableController } from "../interfaces/controller.interface.js";
import { tableUseCases } from "../use-cases/index.js";
import buildAddTableController from "./table/add-table.controller.js";
import buildChangeTablePositionController from "./table/change-table-position.controller.js";
import buildGetTablesController from "./table/get-tables.controller.js";

const addTable = buildAddTableController({ tableUseCases });
const getTables = buildGetTablesController({ tableUseCases });
const changeTablePosition = buildChangeTablePositionController({
    tableUseCases,
});

export const tableController: ITableController = Object.freeze({
    addTable,
    getTables,
    changeTablePosition,
});

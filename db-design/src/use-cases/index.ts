import { databaseRepository } from "../repository/sql/index.js";
import {
    IRelationUseCases,
    ITableUseCases,
} from "../interfaces/use-cases.interface.js";
import buildChangeTablePosition from "./table/change-table-position.use-case.js";
import buildGetTablesUseCase from "./table/get-tables.use-case.js";
import buildAddTableUseCase from "./table/add-table.use-case.js";
import buildGetTableUseCase from "./table/get-table.use-case.js";
import buildAddTableFieldUseCase from "./table/add-table-field.use-case.js";
import buildAddTableRelationUseCase from "./relation/add-relation.use-case.js";
import buildGetRelationsUseCase from "./relation/get-relations.use-case.js";
import buildRemoveRelationUseCase from "./relation/remove-relation.use-case.js";
import buildRemoveTableUseCase from "./table/remove-table.use-case.js";
import buildEditTableFieldUseCase from "./table/edit-table.use-case.js";
import buildRemoveTableFieldUseCase from "./table/remove-table-field.use-case.js";

const addTable = buildAddTableUseCase({ databaseRepository });
const getTables = buildGetTablesUseCase({ databaseRepository });
const changeTablePosition = buildChangeTablePosition({ databaseRepository });
const getTable = buildGetTableUseCase({ databaseRepository });
const addTableField = buildAddTableFieldUseCase({ databaseRepository });
const removeTableField = buildRemoveTableFieldUseCase({ databaseRepository });
const removeTable = buildRemoveTableUseCase({ databaseRepository });
const editTable = buildEditTableFieldUseCase({ databaseRepository });

const addRelation = buildAddTableRelationUseCase({ databaseRepository });
const getRelations = buildGetRelationsUseCase({ databaseRepository });
const removeRelation = buildRemoveRelationUseCase({ databaseRepository });

export const tableUseCases: ITableUseCases = Object.freeze({
    addTable,
    getTables,
    getTable,
    changeTablePosition,
    addTableField,
    removeTable,
    editTable,
    removeTableField,
});

export const relationUseCases: IRelationUseCases = Object.freeze({
    addRelation,
    getRelations,
    removeRelation,
});

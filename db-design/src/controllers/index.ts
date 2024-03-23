import {
    IRelationController,
    ITableController,
} from "../interfaces/controller.interface.js";
import { tableUseCases } from "../use-cases/index.js";
import buildAddRelationController from "./relation/add-relation.controller.js";
import buildAddTableFieldController from "./table/add-table-field.controller.js";
import buildAddTableController from "./table/add-table.controller.js";
import buildChangeTablePositionController from "./table/change-table-position.controller.js";
import buildGetTableController from "./table/get-table.controller.js";
import buildGetTablesController from "./table/get-tables.controller.js";
import { relationUseCases } from "../use-cases/index.js";
import buildGetRelationsController from "./relation/get-relations.controller.js";
import buildRemoveRelationController from "./relation/remove-relation.controller.js";

const addTable = buildAddTableController({ tableUseCases });
const getTables = buildGetTablesController({ tableUseCases });
const getTable = buildGetTableController({ tableUseCases });
const addTableField = buildAddTableFieldController({ tableUseCases });
const changeTablePosition = buildChangeTablePositionController({
    tableUseCases,
});

const addRelation = buildAddRelationController({ relationUseCases });
const getRelations = buildGetRelationsController({ relationUseCases });
const removeRelation = buildRemoveRelationController({ relationUseCases });

export const tableController: ITableController = Object.freeze({
    addTable,
    getTables,
    getTable,
    changeTablePosition,
    addTableField,
});

export const relationController: IRelationController = Object.freeze({
    addRelation,
    getRelations,
    removeRelation,
});

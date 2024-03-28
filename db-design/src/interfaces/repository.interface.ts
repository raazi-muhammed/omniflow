import { IDBTableField } from "../repository/sql/models/table-field.model.js";
import { IDBRelation } from "../repository/sql/models/relations.model.js";
import { IDBTable } from "../repository/sql/models/table.model.js";
import { ITable, ITableField, IRelation } from "./entity.interface.js";

export type IDatabaseRepository = {
    addTable: (data: ITable) => Promise<IDBTable>;
    getTables: (data: { projectId: string }) => Promise<IDBTable[]>;
    getTableById: (id: string) => Promise<IDBTable>;
    editTable: (data: {
        id: string;
        tableData: { name: string; description: string };
    }) => Promise<boolean>;
    removeTable: (data: { id: string }) => Promise<boolean>;
    addTableField: (data: ITableField) => Promise<IDBTableField>;
    removeTableField: (data: { fieldId: string }) => Promise<boolean>;
    addRelation: (data: IRelation) => Promise<IDBRelation>;
    removeRelation: (data: { relationId: string }) => Promise<boolean>;
    getRelations: (data: { projectId: string }) => Promise<IDBRelation[]>;
    getRelation: (data: IRelation) => Promise<IDBRelation | null>;
    removeRelationsByField: (data: { fieldId: string }) => Promise<boolean>;
    getTableFields: (data: { tableId: string }) => Promise<IDBTableField[]>;
    changeTablePosition: (data: {
        x: number;
        y: number;
        tableId: string;
    }) => Promise<boolean>;
};

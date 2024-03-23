import { IDBTableField } from "../repository/sql/models/table-field.model.js";
import { IDBRelation } from "../repository/sql/models/relations.model.js";
import { IDBTable } from "../repository/sql/models/table.model.js";
import { IRelation, ITable, ITableField } from "./entity.interface.js";

export type ITableUseCases = {
    addTable: (data: ITable) => Promise<IDBTable>;
    getTables: (data: { projectId: string }) => Promise<IDBTable[]>;
    getTable: (data: { tableId: string }) => Promise<IDBTable>;
    addTableField: (data: ITableField) => Promise<IDBTableField>;
    changeTablePosition: (data: {
        tableId: string;
        x: number;
        y: number;
    }) => Promise<void>;
};

export type IRelationUseCases = {
    addRelation: (data: IRelation) => Promise<IDBRelation>;
    getRelations: (data: { projectId: string }) => Promise<IDBRelation[]>;
};

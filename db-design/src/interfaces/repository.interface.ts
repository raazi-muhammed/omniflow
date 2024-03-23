import { IDBTableField } from "../repository/sql/models/table-field.model.js";
import { IDBRelation } from "../repository/sql/models/relations.model.js";
import { IDBTable } from "../repository/sql/models/table.model.js";
import { ITable, ITableField, IRelation } from "./entity.interface.js";

export type IDatabaseRepository = {
    addTable: (data: ITable) => Promise<IDBTable>;
    getTables: (data: { projectId: string }) => Promise<IDBTable[]>;
    getTableById: (id: string) => Promise<IDBTable>;
    addTableField: (data: ITableField) => Promise<IDBTableField>;
    addRelation: (data: IRelation) => Promise<IDBRelation>;
    getRelations: (data: { projectId: string }) => Promise<IDBRelation[]>;
    changeTablePosition: (data: {
        x: number;
        y: number;
        tableId: string;
    }) => Promise<boolean>;
};

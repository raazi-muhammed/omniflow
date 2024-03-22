import { IDBTableField } from "../repository/sql/models/table-field.model.js";
import { IDBTable } from "../repository/sql/models/table.model.js";
import { ITable, ITableField } from "./entity.interface.js";

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

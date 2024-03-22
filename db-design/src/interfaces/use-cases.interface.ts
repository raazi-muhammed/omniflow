import { IDBTable } from "../repository/sql/models/table.model.js";
import { ITable } from "./entity.interface.js";

export type ITableUseCases = {
    addTable: (data: ITable) => Promise<IDBTable>;
    getTables: (data: { projectId: string }) => Promise<IDBTable[]>;
    changeTablePosition: (data: {
        tableId: string;
        x: number;
        y: number;
    }) => Promise<void>;
};

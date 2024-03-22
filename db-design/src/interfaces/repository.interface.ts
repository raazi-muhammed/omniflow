import { IDBTable } from "../repository/sql/models/table.model.js";
import { ITable } from "./entity.interface.js";

export type IDatabaseRepository = {
    addTable: (data: ITable) => Promise<IDBTable>;
    getTables: (data: { projectId: string }) => Promise<IDBTable[]>;
};

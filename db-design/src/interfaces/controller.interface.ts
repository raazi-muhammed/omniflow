import { IRequest, ResponseCreator } from "@omniflow/common";

export type ITableController = {
    addTable: (req: IRequest) => Promise<ResponseCreator>;
    getTables: (req: IRequest) => Promise<ResponseCreator>;
};

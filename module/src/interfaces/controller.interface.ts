import { IRequest, ResponseCreator } from "@omniflow/common";

export type IModuleController = {
    addModule: (req: IRequest) => Promise<ResponseCreator>;
    getModules: (req: IRequest) => Promise<ResponseCreator>;
    getModule: (req: IRequest) => Promise<ResponseCreator>;
    getModuleList: (req: IRequest) => Promise<ResponseCreator>;
};

export type ITaskController = {
    addTask: (req: IRequest) => Promise<ResponseCreator>;
    getTasks: (req: IRequest) => Promise<ResponseCreator>;
    getTask: (req: IRequest) => Promise<ResponseCreator>;
    editTask: (req: IRequest) => Promise<ResponseCreator>;
};

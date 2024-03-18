import { IRequest, ResponseCreator } from "@omniflow/common";

export type IModuleController = {
    addModule: (req: IRequest) => Promise<ResponseCreator>;
    getModules: (req: IRequest) => Promise<ResponseCreator>;
    getModuleList: (req: IRequest) => Promise<ResponseCreator>;
};

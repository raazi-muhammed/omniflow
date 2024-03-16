import { IRequest, ResponseCreator } from "@omniflow/common";

export type IModuleController = {
    addModule: (req: IRequest) => Promise<ResponseCreator>;
};

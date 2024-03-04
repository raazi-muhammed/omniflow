import { IRequest, ResponseCreator } from "@omniflow/common";

export type IProjectController = {
    add: (req: IRequest) => Promise<ResponseCreator>;
    edit: (req: IRequest) => Promise<ResponseCreator>;
    getAll: (req: IRequest) => Promise<ResponseCreator>;
    deleteProject: (req: IRequest) => Promise<ResponseCreator>;
    getProject: (req: IRequest) => Promise<ResponseCreator>;
    currentProject: (req: IRequest) => Promise<ResponseCreator>;
};

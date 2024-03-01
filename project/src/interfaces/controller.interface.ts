import { IRequest, ReposeCreator } from "@omniflow/common";

export type IProjectController = {
    add: (req: IRequest) => Promise<ReposeCreator>;
    getAll: (req: IRequest) => Promise<ReposeCreator>;
    getProject: (req: IRequest) => Promise<ReposeCreator>;
};

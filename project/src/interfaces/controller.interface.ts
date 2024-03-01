import { IRequest, ReposeCreator } from "@omniflow/common";

export type IProjectController = {
    add: (req: IRequest) => Promise<ReposeCreator>;
};

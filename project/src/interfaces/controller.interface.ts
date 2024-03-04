import { IRequest, ResponseCreator } from "@omniflow/common";
import { IMember } from "./entity.interface.js";

export type IProjectController = {
    add: (req: IRequest) => Promise<ResponseCreator>;
    edit: (req: IRequest) => Promise<ResponseCreator>;
    getAll: (req: IRequest) => Promise<ResponseCreator>;
    deleteProject: (req: IRequest) => Promise<ResponseCreator>;
    getProject: (req: IRequest) => Promise<ResponseCreator>;
    currentProject: (req: IRequest) => Promise<ResponseCreator>;
    addMemberToProject: (data: {
        userData: IMember;
        projectId: string;
    }) => Promise<void>;
};

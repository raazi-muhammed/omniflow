import { IRequest, ResponseCreator } from "@omniflow/common";
import { IMember } from "./entity.interface.js";

export type IProjectController = {
    addProject: (req: IRequest) => Promise<ResponseCreator>;
    editProject: (req: IRequest) => Promise<ResponseCreator>;
    getProject: (req: IRequest) => Promise<ResponseCreator>;
    deleteProject: (req: IRequest) => Promise<ResponseCreator>;
    getProjects: (req: IRequest) => Promise<ResponseCreator>;
    currentProject: (req: IRequest) => Promise<ResponseCreator>;
    changeProjectLead: (req: IRequest) => Promise<ResponseCreator>;
    addProjectMember: (data: {
        userData: IMember;
        projectId: string;
    }) => Promise<void>;
};

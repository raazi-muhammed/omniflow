import { IRequest, ResponseCreator } from "@omniflow/common";

export type ITeamController = {
    addTeam: (req: IRequest) => Promise<ResponseCreator>;
    inviteMember: (req: IRequest) => Promise<ResponseCreator>;
    getMembersList: (req: IRequest) => Promise<ResponseCreator>;
    getTeams: (req: IRequest) => Promise<ResponseCreator>;
    changeInvitationStatus: (req: IRequest) => Promise<ResponseCreator>;
};

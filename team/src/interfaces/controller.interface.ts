import { IRequest, ResponseCreator } from "@omniflow/common";

export type ITeamController = {
    addTeam: (req: IRequest) => Promise<ResponseCreator>;
    inviteMember: (req: IRequest) => Promise<ResponseCreator>;
    getMembersList: (req: IRequest) => Promise<ResponseCreator>;
    getTeams: (req: IRequest) => Promise<ResponseCreator>;
    changeInvitationStatus: (req: IRequest) => Promise<ResponseCreator>;
    changeTeamLead: (req: IRequest) => Promise<ResponseCreator>;
    getMemberFromTeam: (req: IRequest) => Promise<ResponseCreator>;
    removeMemberFromTeam: (req: IRequest) => Promise<ResponseCreator>;
    moveMember: (req: IRequest) => Promise<ResponseCreator>;
    removeTeam: (req: IRequest) => Promise<ResponseCreator>;
};

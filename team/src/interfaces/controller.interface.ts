import { IRequest, ResponseCreator } from "@omniflow/common";

export type ITeamController = {
    addTeam: (req: IRequest) => Promise<ResponseCreator>;
    getTeams: (req: IRequest) => Promise<ResponseCreator>;
    removeTeam: (req: IRequest) => Promise<ResponseCreator>;
    inviteMember: (req: IRequest) => Promise<ResponseCreator>;
    getMembers: (req: IRequest) => Promise<ResponseCreator>;
    changeMemberInvitationStatus: (req: IRequest) => Promise<ResponseCreator>;
    changeTeamLead: (req: IRequest) => Promise<ResponseCreator>;
    getTeam: (req: IRequest) => Promise<ResponseCreator>;
    removeMemberFromTeam: (req: IRequest) => Promise<ResponseCreator>;
    moveTeamMember: (req: IRequest) => Promise<ResponseCreator>;
    getMembersFromTeam: (req: IRequest) => Promise<ResponseCreator>;
    removeMemberFromProject: (req: IRequest) => Promise<ResponseCreator>;
    addMemberToTeam: (req: IRequest) => Promise<ResponseCreator>;
};

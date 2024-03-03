import { IRequest, ReposeCreator } from "@omniflow/common";

export type ITeamController = {
    addTeam: (req: IRequest) => Promise<ReposeCreator>;
    inviteMember: (req: IRequest) => Promise<ReposeCreator>;
    getTeams: (req: IRequest) => Promise<ReposeCreator>;
};

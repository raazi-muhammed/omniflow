import { IRequest, ReposeCreator } from "@omniflow/common";

export type ITeamController = {
    addTeam: (req: IRequest) => Promise<ReposeCreator>;
};

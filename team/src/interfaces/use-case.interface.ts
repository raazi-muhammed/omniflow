import { IMember, ITeam } from "./entity.interface.js";

export type IAddTeamUseCase = (data: ITeam) => ITeam;
export type IAddMemberUseCase = (data: IMember) => IMember;

export type ITeamUseCase = {
    addTeam: IAddTeamUseCase;
    addMember: IAddMemberUseCase;
};

import { Types } from "mongoose";

export type IDType = Types.ObjectId;

export enum Role {
    TEAM_LEAD = "TEAM_LEAD",
    PROJECT_LEAD = "PROJECT_LEAD",
    MAIN_TEAM_LEAD = "MAIN_TEAM_LEAD",
    DEFAULT = "DEFAULT",
}
export enum InviteStatus {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
}

export interface ITeam {
    name: string;
    avatar?: string;
    project: string;
    isDeleted?: boolean;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: IDType;
    }[];
    lead?: IDType;
}

export interface IMemberInProject {
    role: Role;
    inviteStatus: InviteStatus;
    info: IDType;
}

export interface IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface ITeamEntity extends ITeam {
    name: string;
    avatar?: string;
    project: string;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: IDType;
    }[];
    lead?: IDType;

    get: () => ITeam;
}

export interface IMemberEntity extends IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;

    get: () => IMember;
}

export interface IMemberEntityConstructor {
    new (data: IMember): IMemberEntity;
}

export interface ITeamEntityConstructor {
    new (data: ITeam): ITeamEntity;
}

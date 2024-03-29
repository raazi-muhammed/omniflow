import { Types } from "mongoose";
import { IDBMember } from "../repository/mongo/models/member.model.js";
import { IDBMemberStatus } from "../repository/mongo/models/member-status.model.js";

export type IDType = Types.ObjectId;

export enum Role {
    TEAM_LEAD = "TEAM_LEAD",
    PROJECT_LEAD = "PROJECT_LEAD",
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
    members?: IDBMemberStatus[];
    lead?: IDType;
}

export interface IMemberStatus {
    team: string;
    project: string;
    role: Role;
    inviteStatus: InviteStatus;
    info: IDType;
    deletedAt: Date | null;
}

export interface IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface ITeamEntity extends ITeam {
    get: () => ITeam;
}

export interface IMemberEntity extends IMember {
    get: () => IMember;
}

export interface IMemberEntityConstructor {
    new (data: IMember): IMemberEntity;
}

export interface ITeamEntityConstructor {
    new (data: ITeam): ITeamEntity;
}

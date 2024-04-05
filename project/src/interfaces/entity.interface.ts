import { Types } from "mongoose";

export enum Role {
    TEAM_LEAD = "TEAM_LEAD",
    DEFAULT = "DEFAULT",
}
export enum InviteStatus {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
}

export interface IProject {
    id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    lead: Types.ObjectId;
    isDeleted: boolean;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: Types.ObjectId;
        access: IAccess;
    }[];
}

export interface IAccess {
    apiDoc: AccessLevels;
    dbDesign: AccessLevels;
    module: AccessLevels;
}

export enum AccessLevels {
    NO_ACCESS = 0,
    CAN_VIEW = 1,
    CAN_EDIT = 2,
}

export interface IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface IProjectEntity extends IProject {
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    isDeleted: boolean;
    lead: Types.ObjectId;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: Types.ObjectId;
        access: IAccess;
    }[];

    validate: () => void;
    get: () => IProject;
}

export interface IMemberEntity extends IMember {
    name: string;
    username: string;
    email: string;
    avatar?: string;

    validate: () => void;
    get: () => IMember;
}

export interface IMemberEntityConstructor {
    new (data: IMember): IMemberEntity;
}

export interface IProjectEntityConstructor {
    new (date: IProject): IProjectEntity;
}

export interface IMemberInProject {
    role: Role;
    inviteStatus: InviteStatus;
    info: Types.ObjectId;
    access: IAccess;
}

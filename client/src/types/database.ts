export interface IUser {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface IProject {
    _id?: string;
    title: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    lead: IUser;
    members: { info: IUser }[];
}

export enum Role {
    TEAM_LEAD = "TEAM_LEAD",
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
    members: ITeamMember[];
    lead?: IUser;
}

export interface ITeamMember {
    role: Role;
    inviteStatus: InviteStatus;
    info: IUser;
}

export type IAllMemberList = {
    project: string;
    team: string;
    info: IUser;
};

export type IEndpoint = {
    name: string;
    route: string;
    method: string;
    summary?: string;
    projectId: string;
};

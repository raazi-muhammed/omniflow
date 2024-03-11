export interface IUser {
    id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface IProject {
    id?: string;
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

export type IVariable = {
    name: string;
    type: string;
    endpointId: string;
    description?: string;
};

export type IHeader = {
    key: string;
    value: string;
    endpointId: string;
    description?: string;
};

export type IEndpoint = {
    id?: string;
    name: string;
    route: string;
    method: string;
    summary?: string;
    projectId: string;
    variables: IVariable[];
    headers: IHeader[];
};

export enum EDataTypes {
    OPTIONAL = "OPTIONAL",
    UNIQUE = "UNIQUE",
    KEY = "KEY",
}

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
    projectLead: IUser;
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
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: IUser;
    }[];
    lead?: IUser;
}

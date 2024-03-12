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
    id: string;
    name: string;
    type: string;
    endpointId: string;
    description?: string;
};

export type IHeader = {
    id: string;
    key: string;
    value: string;
    endpointId: string;
    description?: string;
};

export type ISchemaItem = {
    id: string;
    key: string;
    type: string;
    endpointId: string;
    options: string[];
};

export type IEndpointRequest = {
    id: string;
    endpointId: string;
    statusCode: number;
    description?: string;
    body?: string;
};

export const dataValueTypes = [
    { value: "Array", label: "Array" },
    { value: "Binary", label: "Binary" },
    { value: "Boolean", label: "Boolean" },
    { value: "Date", label: "Date" },
    { value: "Decimal", label: "Decimal" },
    { value: "Double", label: "Double" },
    { value: "Int", label: "Int" },
    { value: "Long", label: "Long" },
    { value: "Objectid", label: "Objectid" },
    { value: "Object", label: "Object" },
    { value: "String", label: "String" },
    { value: "Timestamp", label: "Timestamp" },
];

export type IEndpoint = {
    id: string;
    name: string;
    route: string;
    method: string;
    summary?: string;
    body?: string;
    projectId: string;
    variables: IVariable[];
    schema: ISchemaItem[];
    headers: IHeader[];
    requests: IEndpointRequest[];
};

export enum EDataTypes {
    OPTIONAL = "OPTIONAL",
    UNIQUE = "UNIQUE",
    KEY = "KEY",
}

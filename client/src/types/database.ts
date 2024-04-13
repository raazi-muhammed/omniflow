export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface IProject {
    id: string;
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
    members: ITeamMember[];
    lead?: IUser;
}

export interface ITeamMember {
    role: Role;
    inviteStatus: InviteStatus;
    info: IUser;
}

export type IMemberStatus = {
    role: Role;
    inviteStatus: InviteStatus;
    info: IUser;
};

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

export const contentTypes = [
    { label: "application/json", value: "APPLICATION/JSON" },
    { label: "application/xml", value: "APPLICATION/XML" },
    {
        label: "application/x-www-form-urlencoded",
        value: "APPLICATION/X-WWW-FORM-URLENCODED",
    },
    { label: "multipart/form-data", value: "MULTIPART/FORM-DATA" },
    { label: "text/plain", value: "TEXT/PLAIN" },
];

export type IEndpointRequest = {
    id: string;
    endpointId: string;
    statusCode: number;
    type: string;
    description?: string;
    body?: string;
};

export const dataValueTypes = [
    { label: "Array", value: "ARRAY" },
    { label: "Binary", value: "BINARY" },
    { label: "Boolean", value: "BOOLEAN" },
    { label: "Date", value: "DATE" },
    { label: "Decimal", value: "DECIMAL" },
    { label: "Double", value: "DOUBLE" },
    { label: "Int", value: "INT" },
    { label: "Long", value: "LONG" },
    { label: "Objectid", value: "OBJECTID" },
    { label: "Object", value: "OBJECT" },
    { label: "String", value: "STRING" },
    { label: "Timestamp", value: "TIMESTAMP" },
];

export type IEndpoint = {
    id: string;
    name: string;
    route: string;
    method: string;
    summary?: string;
    body?: string;
    parentFolder?: string;
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

export interface IModule {
    id: string;
    name: string;
    description: string;
    priority: number;
    startDate: Date;
    dueDate: Date;
    deletedAt: Date | null;
    dependencies: IModule[];
    parentModule: string;
}

export interface ITask {
    id: string;
    name: string;
    description: string;
    projectId: string;
    priority: number;
    status: TaskStatus;
    startDate: Date;
    dueDate: Date;
    module?: string;
    deletedAt: Date | null;
    assignee?: IUser;
    reporter: IUser;
}

export enum TaskStatus {
    TO_DO = "TO_DO",
    ON_PROGRESS = "ON_PROGRESS",
    COMPLETED = "COMPLETED",
}

export type IMeeting = {
    id: string;
    name: string;
    projectId: string;
    agenda: string;
    notes?: string;
    startDate: Date;
    endDate?: Date | null;
    deletedAt?: Date | null;
    meetingLink?: string;
};

export type ITable = {
    id: string;
    name: string;
    description: string;
    projectId: string;
    x: number;
    y: number;
    fields: ITableField[];
};

export type ITableField = {
    id: string;
    name: string;
    type: string;
    description: string;
    tableId: string;
    options?: string[];
};

export type IRelation = {
    id: string;
    projectId: string;
    to: string;
    from: string;
};

export type IFolder = {
    id: string;
    name: string;
    parentFolder?: string;
    projectId: string;
};

export type IMessage = {
    from: IUser;
    content: string;
    createdAt: Date;
    isLoading?: boolean;
    type: MessageType;
    file?: {
        url: string;
        name: string;
    };
};

export enum MessageType {
    TEXT_ONLY = "TEXT_ONLY",
    IMAGE = "IMAGE",
    FILE = "FILE",
}

export interface IMemberAccess {
    project: string;
    member: IUser;
    deletedAt: Date;
    access: IAccess;
}

export interface IAccess {
    apiDoc: number;
    dbDesign: number;
    module: number;
}

export enum AccessLevels {
    NO_ACCESS = 0,
    CAN_VIEW = 1,
    CAN_EDIT = 2,
}

export enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

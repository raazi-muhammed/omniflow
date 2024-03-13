/* Endpoint */
export type IEndpoint = {
    name: string;
    route?: string;
    method: string;
    summary: string;
    body?: string;
    projectId: string;
};

export interface IEndpointEntity extends IEndpoint {
    validate: () => void;
    get: () => IEndpoint;
}

export interface IEndpointEntityConstructor {
    new (data: IEndpoint): IEndpointEntity;
}

/* Variable */
export type IVariable = {
    name: string;
    type: string;
    endpointId: string;
    description?: string;
};

export interface IVariableEntity extends IVariable {
    validate: () => void;
    get: () => IVariable;
}

export interface IVariableEntityConstructor {
    new (data: IVariable): IVariableEntity;
}

/* Header */
export type IHeader = {
    key: string;
    value: string;
    endpointId: string;
    description?: string;
};
export interface IHeaderEntity extends IHeader {
    validate: () => void;
    get: () => IHeader;
}

export interface IHeaderEntityConstructor {
    new (data: IHeader): IHeaderEntity;
}

/* Schema Item */
export type ISchemaItem = {
    key: string;
    type: string;
    endpointId: string;
    options: string[];
};
export interface ISchemaItemEntity extends ISchemaItem {
    validate: () => void;
    get: () => ISchemaItem;
}

export interface ISchemaItemEntityConstructor {
    new (data: ISchemaItem): ISchemaItemEntity;
}

/* Endpoint Response */
export type IEndpointResponse = {
    endpointId: string;
    statusCode: number;
    description?: string;
    body?: string;
};
export interface IEndpointResponseEntity extends IEndpointResponse {
    validate: () => void;
    get: () => IEndpointResponse;
}

export interface IEndpointResponseEntityConstructor {
    new (data: IEndpointResponse): IEndpointResponseEntity;
}

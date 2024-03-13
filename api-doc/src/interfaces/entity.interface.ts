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

export interface IVariableEntity extends IVariable {
    validate: () => void;
    get: () => IVariable;
}

export interface IVariableEntityConstructor {
    new (data: IVariable): IVariableEntity;
}

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
export type ISchemaItem = {
    key: string;
    type: string;
    endpointId: string;
    options: string[];
};
export type IEndpointRequest = {
    endpointId: string;
    statusCode: number;
    description?: string;
    body?: string;
};

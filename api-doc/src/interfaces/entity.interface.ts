export type IEndpoint = {
    name: string;
    route?: string;
    method: string;
    summary: string;
    projectId: string;
};

export interface IEndpointEntity extends IEndpoint {
    validate: () => void;
    get: () => IEndpoint;
}

export interface IEndpointEntityConstructor {
    new (data: IEndpoint): IEndpointEntity;
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
    description?: string;
};
export type ISchemaItem = {
    key: string;
    type: string;
    options: string[];
    description?: string;
};

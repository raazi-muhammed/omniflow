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

import { IDBEndpoint } from "../repository/endpoint.model.js";
import { IEndpoint, IHeader, IVariable } from "./entity.interface.js";

export type IEndpointsRepository = {
    addEndpoint: (data: IEndpoint) => Promise<IDBEndpoint>;
    getEndpoints: (data: { projectId: string }) => Promise<IDBEndpoint[]>;
    getEndpoint: (data: {
        projectId: string;
        endpointId: string;
    }) => Promise<IDBEndpoint>;
    addEndpointVariable: (data: IVariable) => Promise<boolean>;
    addEndpointHeader: (data: IHeader) => Promise<boolean>;
};

import { IDBHeader } from "../repository/endpoint-header.mode.js";
import { IDBEndpointRequest } from "../repository/endpoint-request.model.js";
import { IDBSchemaItem } from "../repository/endpoint-schema.model.js";
import { IDBVariable } from "../repository/endpoint-variable.model.js";
import { IDBEndpoint } from "../repository/endpoint.model.js";
import {
    IEndpoint,
    IEndpointRequest,
    IHeader,
    ISchemaItem,
    IVariable,
} from "./entity.interface.js";

export type IEndpointsRepository = {
    addEndpoint: (data: IEndpoint) => Promise<IDBEndpoint>;
    getEndpoints: (data: { projectId: string }) => Promise<IDBEndpoint[]>;
    getEndpoint: (data: {
        projectId: string;
        endpointId: string;
    }) => Promise<IDBEndpoint>;
    addEndpointVariable: (data: IVariable) => Promise<IDBVariable>;
    removeEndpointVariable: (variableId: string) => Promise<boolean>;
    addEndpointHeader: (data: IHeader) => Promise<IDBHeader>;
    removeEndpointHeader: (headerId: string) => Promise<boolean>;
    addEndpointBody: (data: {
        endpointId: string;
        body: string;
    }) => Promise<boolean>;
    addEndpointSchema: (data: ISchemaItem) => Promise<IDBSchemaItem>;
    removeEndpointSchema: (schemaId: string) => Promise<boolean>;
    addEndpointRequest: (data: IEndpointRequest) => Promise<IDBEndpointRequest>;
    removeEndpointResponse: (requestId: string) => Promise<boolean>;
};

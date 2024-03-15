import { IDBHeader } from "../repository/sql/endpoint-header.mode.js";
import { IDBEndpointResponse } from "../repository/sql/endpoint-response.model.js";
import { IDBSchemaItem } from "../repository/sql/endpoint-schema.model.js";
import { IDBVariable } from "../repository/sql/endpoint-variable.model.js";
import { IDBEndpoint } from "../repository/sql/endpoint.model.js";
import {
    IEndpoint,
    IEndpointResponse,
    IHeader,
    ISchemaItem,
    IVariable,
} from "./entity.interface.js";

export type IEndpointsRepository = {
    addEndpoint: (data: IEndpoint) => Promise<IDBEndpoint>;
    updateEndpoint: (data: {
        newData: IEndpoint;
        id: string;
    }) => Promise<boolean>;
    removeEndpoint: (endpointId: string) => Promise<boolean>;
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
    addEndpointResponse: (
        data: IEndpointResponse
    ) => Promise<IDBEndpointResponse>;
    removeEndpointResponse: (requestId: string) => Promise<boolean>;
};

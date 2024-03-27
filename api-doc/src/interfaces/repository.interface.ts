import { IDBHeader } from "../repository/sql/models/endpoint-header.mode.js";
import { IDBEndpointResponse } from "../repository/sql/models/endpoint-response.model.js";
import { IDBSchemaItem } from "../repository/sql/models/endpoint-schema.model.js";
import { IDBVariable } from "../repository/sql/models/endpoint-variable.model.js";
import { IDBEndpoint } from "../repository/sql/models/endpoint.model.js";
import { IDBFolder } from "../repository/sql/models/folder.model.js";
import {
    IEndpoint,
    IEndpointResponse,
    IFolder,
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
    getEndpoints: (data: {
        projectId: string;
        parentFolder?: string;
    }) => Promise<IDBEndpoint[]>;
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
    addFolder: (data: IFolder) => Promise<IDBFolder>;
    getFolders: (data: {
        projectId: string;
        parentFolder?: string;
    }) => Promise<IDBFolder[]>;
    getFolderList: (data: { projectId: string }) => Promise<IDBFolder[]>;
};

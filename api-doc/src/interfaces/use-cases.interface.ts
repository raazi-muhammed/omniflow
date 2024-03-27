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

export type ICreateEndpointUseCase = (data: IEndpoint) => IEndpoint;
export type ICreateVariableUseCase = (data: IVariable) => IVariable;
export type ICreateHeaderUseCase = (data: IHeader) => IHeader;
export type ICreateEndpointResponseUseCase = (
    data: IEndpointResponse
) => IEndpointResponse;
export type ICreateSchemaItemUseCase = (data: ISchemaItem) => ISchemaItem;

export type IFolderUseCases = {
    addFolder: (data: IFolder) => Promise<IDBFolder>;
    getFolders: (data: {
        projectId: string;
        parentFolder?: string;
    }) => Promise<IDBFolder[]>;
    getFolderList: (data: { projectId: string }) => Promise<IDBFolder[]>;
};

export type IBodyUseCases = {
    addBody: (data: { endpointId: string; body: string }) => Promise<void>;
    removeSchema: (data: { schemaId: string }) => Promise<void>;
    addSchema: (data: ISchemaItem) => Promise<IDBSchemaItem>;
};

export type IEndpointUseCases = {
    addEndpoint: (data: IEndpoint) => Promise<IDBEndpoint>;
    getEndpoint: (data: { endpointId: string }) => Promise<IDBEndpoint>;
    getEndpoints: (data: {
        projectId: string;
        parentFolder?: string;
    }) => Promise<IDBEndpoint[]>;
    removeEndpoint: (data: { id: string }) => Promise<void>;
    editEndpoint: (data: {
        id: string;
        endpointData: IEndpoint;
    }) => Promise<void>;
};

export type IHeaderUseCases = {
    addHeader: (data: IHeader) => Promise<IDBHeader>;
    removeHeader: (data: { id: string }) => Promise<void>;
};

export type IVariableUseCases = {
    addVariable: (data: IVariable) => Promise<IDBVariable>;
    removeVariable: (data: { id: string }) => Promise<void>;
};

export type IResponseUseCases = {
    addResponse: (data: IEndpointResponse) => Promise<IDBEndpointResponse>;
    removeResponse: (data: { id: string }) => Promise<void>;
};

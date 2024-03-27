import { IDBSchemaItem } from "../repository/sql/models/endpoint-schema.model.js";
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
    editEndpoint: (data: {
        id: string;
        endpointData: IEndpoint;
    }) => Promise<void>;
};

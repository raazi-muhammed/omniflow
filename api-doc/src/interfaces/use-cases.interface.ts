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
    getFolders: (data: { projectId: string }) => Promise<IDBFolder[]>;
};

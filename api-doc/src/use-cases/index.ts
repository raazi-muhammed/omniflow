import Variable from "../entities/variable.entity.js";
import Header from "../entities/header.entity.js";
import SchemaItem from "../entities/schema-item.entity.js";
import EndpointResponse from "../entities/endpoint-response.entity.js";
import buildCreateVariableUseCase from "./create-variable.use-case.js";
import buildCreateHeaderUseCase from "./create-header.use-case.js";
import buildCreateSchemaItemUseCase from "./create-schema-item.use-case.js";
import buildCreateEndpointResponseUseCase from "./create-endpoint-response.use-case.js";
import buildAddFolderUseCase from "./folder/add-folder.use-case.js";
import { endPointsRepository } from "../repository/sql/index.js";
import {
    IBodyUseCases,
    IEndpointUseCases,
    IFolderUseCases,
} from "../interfaces/use-cases.interface.js";
import buildGetFoldersUseCase from "./folder/get-folders.use-case.js";
import buildGetFolderListUseCase from "./folder/get-folder-list.use-case.js";
import buildAddEndpointBodyUseCase from "./body/add-endpoint-body.use-case.js";
import buildRemoveEndpointSchemaUseCase from "./body/remove-endpoint-schema.use-case.js";
import buildAddEndpointSchemaUseCase from "./body/add-endpoint-schema.use-case.js";
import buildAddEndpointUseCase from "./endpoint/add-endpoint.use-case.js";
import buildEditEndpointUseCase from "./endpoint/edit-endpoint.use-case.js";
import Endpoint from "../entities/endpoint.entity.js";

export const createVariableUseCase = buildCreateVariableUseCase({ Variable });
export const createHeaderUseCase = buildCreateHeaderUseCase({ Header });
export const createSchemaItemUseCase = buildCreateSchemaItemUseCase({
    SchemaItem,
});
export const createEndpointResponseUseCase = buildCreateEndpointResponseUseCase(
    {
        EndpointResponse,
    }
);

/* Endpoint */
const addEndpoint = buildAddEndpointUseCase({ endPointsRepository, Endpoint });
const editEndpoint = buildEditEndpointUseCase({
    endPointsRepository,
    Endpoint,
});

export const endpointUseCases: IEndpointUseCases = Object.freeze({
    addEndpoint,
    editEndpoint,
});

/* Body & Schema */
const addBody = buildAddEndpointBodyUseCase({
    endPointsRepository,
});
const removeSchema = buildRemoveEndpointSchemaUseCase({ endPointsRepository });
const addSchema = buildAddEndpointSchemaUseCase({
    endPointsRepository,
    SchemaItem,
});

export const bodyUseCases: IBodyUseCases = Object.freeze({
    addBody,
    removeSchema,
    addSchema,
});

/* Folder */
const addFolder = buildAddFolderUseCase({ endPointsRepository });
const getFolders = buildGetFoldersUseCase({ endPointsRepository });
const getFolderList = buildGetFolderListUseCase({ endPointsRepository });

export const folderUseCases: IFolderUseCases = Object.freeze({
    addFolder,
    getFolders,
    getFolderList,
});

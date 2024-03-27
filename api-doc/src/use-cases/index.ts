import Variable from "../entities/variable.entity.js";
import Header from "../entities/header.entity.js";
import SchemaItem from "../entities/schema-item.entity.js";
import EndpointResponse from "../entities/endpoint-response.entity.js";
import buildAddFolderUseCase from "./folder/add-folder.use-case.js";
import { endPointsRepository } from "../repository/sql/index.js";
import {
    IBodyUseCases,
    IEndpointUseCases,
    IFolderUseCases,
    IHeaderUseCases,
    IResponseUseCases,
    IVariableUseCases,
} from "../interfaces/use-cases.interface.js";
import buildGetFoldersUseCase from "./folder/get-folders.use-case.js";
import buildGetFolderListUseCase from "./folder/get-folder-list.use-case.js";
import buildAddEndpointBodyUseCase from "./body/add-endpoint-body.use-case.js";
import buildRemoveEndpointSchemaUseCase from "./body/remove-endpoint-schema.use-case.js";
import buildAddEndpointSchemaUseCase from "./body/add-endpoint-schema.use-case.js";
import buildAddEndpointUseCase from "./endpoint/add-endpoint.use-case.js";
import buildEditEndpointUseCase from "./endpoint/edit-endpoint.use-case.js";
import Endpoint from "../entities/endpoint.entity.js";
import buildGetEndpointUseCase from "./endpoint/get-endpoint.use-case.js";
import buildGetEndpointsUseCase from "./endpoint/get-endpoints.use-case.js";
import buildRemoveEndpointUseCase from "./endpoint/remove-endpoint.use-case.js";
import buildAddEndpointHeaderUseCase from "./header/add-endpoint-header.use-case.js";
import buildRemoveEndpointHeaderUseCase from "./header/remove-endpoint-header.use-case.js";
import buildAddEndpointVariableUseCase from "./variable/add-endpiont-variable.use-case.js";
import buildRemoveEndpointVariableUseCase from "./variable/remove-endpiont-variable.use-case.js";
import buildRemoveEndpointResponseUseCase from "./response/remove-endpoint-response.use-case.js";
import buildAddEndpointResponseUseCase from "./response/add-endpoint-response.use-case.js";

/* Endpoint */
const addEndpoint = buildAddEndpointUseCase({ endPointsRepository, Endpoint });
const getEndpoint = buildGetEndpointUseCase({ endPointsRepository });
const getEndpoints = buildGetEndpointsUseCase({ endPointsRepository });
const removeEndpoint = buildRemoveEndpointUseCase({ endPointsRepository });
const editEndpoint = buildEditEndpointUseCase({
    endPointsRepository,
    Endpoint,
});

export const endpointUseCases: IEndpointUseCases = Object.freeze({
    addEndpoint,
    editEndpoint,
    getEndpoint,
    getEndpoints,
    removeEndpoint,
});

/* Header */
const addHeader = buildAddEndpointHeaderUseCase({
    endPointsRepository,
    Header,
});
const removeHeader = buildRemoveEndpointHeaderUseCase({
    endPointsRepository,
});
export const headerUseCases: IHeaderUseCases = Object.freeze({
    addHeader,
    removeHeader,
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

/* Variables */
const addVariable = buildAddEndpointVariableUseCase({
    endPointsRepository,
    Variable,
});
const removeVariable = buildRemoveEndpointVariableUseCase({
    endPointsRepository,
});

export const variableUseCases: IVariableUseCases = Object.freeze({
    addVariable,
    removeVariable,
});

/* Response */
const removeResponse = buildRemoveEndpointResponseUseCase({
    endPointsRepository,
});
const addResponse = buildAddEndpointResponseUseCase({ endPointsRepository });
export const responseUseCases: IResponseUseCases = Object.freeze({
    addResponse,
    removeResponse,
});

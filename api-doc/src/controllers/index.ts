import { IEndpointController } from "../interfaces/controller.interface.js";
import buildAddEndpointController from "./endpoint/add-endpoint.controller.js";
import { endPointsRepository } from "../repository/sql/index.js";
import buildGetEndpointsController from "./endpoint/get-endpoints.controller.js";
import {
    createEndpointUseCase,
    createHeaderUseCase,
    createSchemaItemUseCase,
    createVariableUseCase,
} from "../use-cases/index.js";
import getEndpointController from "./endpoint/get-endpoint.controller.js";
import buildEndpointVariableController from "./variable/add-endpoint-variable.controller.js";
import buildEndpointHeaderController from "./header/add-endpoint-header.controller.js";
import buildAddEndpointBodyController from "./body/add-endpoint-body.controller.js";
import buildAddEndpointSchemaController from "./body/add-endpoint-schema.controller.js";
import buildAddEndpointResponse from "./response/add-endpoint-response.controller.js";
import buildRemoveEndpointVariableController from "./variable/remove-endpoint-variable.controller.js";
import buildRemoveEndpointHeaderController from "./header/remove-endpoint-header.controller.js";
import buildRemoveEndpointSchemaController from "./body/remove-endpoint-schema.controller.js";
import buildRemoveEndpointResponseController from "./response/remove-endpoint-response.controller.js";
import buildEditEndpointController from "./endpoint/edit-endpoint.controller.js";
import buildRemoveEndpointController from "./endpoint/remove-endpoint.controller.js";

const addEndpoint = buildAddEndpointController({
    createEndpointUseCase,
    endPointsRepository,
});
const editEndpoint = buildEditEndpointController({
    createEndpointUseCase,
    endPointsRepository,
});
const removeEndpoint = buildRemoveEndpointController({
    endPointsRepository,
});
const getEndpoints = buildGetEndpointsController({
    endPointsRepository,
});

const getEndpoint = getEndpointController({
    endPointsRepository,
});

const addEndpointVariable = buildEndpointVariableController({
    createVariable: createVariableUseCase,
    endPointsRepository,
});

const addEndpointHeader = buildEndpointHeaderController({
    createHeader: createHeaderUseCase,
    endPointsRepository,
});

const addEndpointBody = buildAddEndpointBodyController({
    endPointsRepository,
});
const addEndpointSchema = buildAddEndpointSchemaController({
    createSchemaItem: createSchemaItemUseCase,
    endPointsRepository,
});
const addEndpointResponse = buildAddEndpointResponse({
    endPointsRepository,
});
const removeEndpointVariable = buildRemoveEndpointVariableController({
    endPointsRepository,
});

const removeEndpointHeader = buildRemoveEndpointHeaderController({
    endPointsRepository,
});
const removeEndpointSchema = buildRemoveEndpointSchemaController({
    endPointsRepository,
});
const removeEndpointResponse = buildRemoveEndpointResponseController({
    endPointsRepository,
});

export const endpointController: IEndpointController = Object.freeze({
    addEndpoint,
    getEndpoints,
    getEndpoint,
    editEndpoint,
    removeEndpoint,
    addEndpointVariable,
    removeEndpointVariable,
    addEndpointHeader,
    addEndpointBody,
    addEndpointSchema,
    addEndpointResponse,
    removeEndpointHeader,
    removeEndpointSchema,
    removeEndpointResponse,
});

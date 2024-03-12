import { IEndpointController } from "../interfaces/controller.interface.js";
import buildAddEndpointController from "./add-endpoint.controller.js";
import { endPointsRepository } from "../repository/index.js";
import buildGetEndpointsController from "./get-endpoints.controller.js";
import { createEndpointUseCase } from "../use-cases/index.js";
import getEndpointController from "./get-endpoint.controller.js";
import buildEndpointVariableController from "./add-endpoint-variable.controller.js";
import buildEndpointHeaderController from "./add-endpoint-header.controller.js";
import buildAddEndpointBodyController from "./add-endpoint-body.controller.js";
import buildAddEndpointSchemaController from "./add-endpoint-schema.controller.js";
import buildAddEndpointResponse from "./add-endpoint-response.controller.js";
import buildRemoveEndpointVariableController from "./remove-endpoint-variable.controller.js";
import buildRemoveEndpointHeaderController from "./remove-endpoint-header.controller.js";
import buildRemoveEndpointSchemaController from "./remove-endpoint-schema.controller.js";
import buildRemoveEndpointResponseController from "./remove-endpoint-response.controller.js";

const addEndpoint = buildAddEndpointController({
    createEndpointUseCase,
    endPointsRepository,
});
const getEndpoints = buildGetEndpointsController({
    endPointsRepository,
});

const getEndpoint = getEndpointController({
    endPointsRepository,
});

const addEndpointVariable = buildEndpointVariableController({
    endPointsRepository,
});

const addEndpointHeader = buildEndpointHeaderController({
    endPointsRepository,
});

const addEndpointBody = buildAddEndpointBodyController({
    endPointsRepository,
});
const addEndpointSchema = buildAddEndpointSchemaController({
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

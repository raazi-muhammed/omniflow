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

export const endpointController: IEndpointController = Object.freeze({
    addEndpoint,
    getEndpoints,
    getEndpoint,
    addEndpointVariable,
    addEndpointHeader,
    addEndpointBody,
    addEndpointSchema,
});

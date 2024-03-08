import { IEndpointController } from "../interfaces/controller.interface.js";
import buildAddEndpointController from "./add-endpoint.controller.js";
import { endPointsRepository } from "../repository/index.js";
import buildGetEndpointsController from "./get-endpoints.controller.js";
import { createEndpointUseCase } from "../use-cases/index.js";
import getEndpointController from "./get-endpoint.controller.js";

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

export const endpointController: IEndpointController = Object.freeze({
    addEndpoint,
    getEndpoints,
    getEndpoint,
});

import { IEndpointController } from "../interfaces/controller.interface.js";
import buildAddEndpointController from "./add-endpoint.controller.js";
import { endPointsRepository } from "../repository/index.js";
import buildGetEndpointsController from "./get-endpoints.controller.js";

const addEndpoint = buildAddEndpointController({
    endPointsRepository,
});
const getEndpoints = buildGetEndpointsController({
    endPointsRepository,
});

export const endpointController: IEndpointController = Object.freeze({
    addEndpoint,
    getEndpoints,
});

import buildCreateEndpointUseCase from "./create-endpoint.use-case.js";
import Endpoint from "../entities/endpoint.entity.js";

export const createEndpointUseCase = buildCreateEndpointUseCase({ Endpoint });

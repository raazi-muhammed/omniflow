import buildCreateEndpointUseCase from "./create-endpoint.use-case.js";
import Endpoint from "../entities/endpoint.entity.js";
import Variable from "../entities/variable.entity.js";
import buildCreateVariableUseCase from "./create-variable.use-case.js";

export const createEndpointUseCase = buildCreateEndpointUseCase({ Endpoint });
export const createVariableUseCase = buildCreateVariableUseCase({ Variable });

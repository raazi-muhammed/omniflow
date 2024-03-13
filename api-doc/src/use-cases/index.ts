import buildCreateEndpointUseCase from "./create-endpoint.use-case.js";
import Endpoint from "../entities/endpoint.entity.js";
import Variable from "../entities/variable.entity.js";
import Header from "../entities/header.entity.js";
import SchemaItem from "../entities/schema-item.entity.js";
import EndpointResponse from "../entities/endpoint-response.entity.js";
import buildCreateVariableUseCase from "./create-variable.use-case.js";
import buildCreateHeaderUseCase from "./create-header.use-case.js";
import buildCreateSchemaItemUseCase from "./create-schema-item.use-case.js";
import buildCreateEndpointResponseUseCase from "./create-endpoint-response.use-case.js";

export const createEndpointUseCase = buildCreateEndpointUseCase({ Endpoint });
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

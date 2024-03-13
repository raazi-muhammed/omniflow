import {
    IEndpointResponse,
    IEndpointResponseEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateEndpointResponseUseCase({
    EndpointResponse,
}: {
    EndpointResponse: IEndpointResponseEntityConstructor;
}) {
    return (data: IEndpointResponse) => {
        const response = new EndpointResponse(data);
        response.validate();
        return response.get();
    };
}

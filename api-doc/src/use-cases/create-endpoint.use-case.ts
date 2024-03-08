import { IEndpoint } from "../interfaces/entity.interface.js";
import { IEndpointEntityConstructor } from "../interfaces/entity.interface.js";

export default function buildCreateEndpointUseCase({
    Endpoint,
}: {
    Endpoint: IEndpointEntityConstructor;
}) {
    return (data: IEndpoint) => {
        const endpoint = new Endpoint(data);
        endpoint.validate();
        return endpoint.get();
    };
}

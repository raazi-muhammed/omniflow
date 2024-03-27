import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import {
    IEndpoint,
    IEndpointEntityConstructor,
} from "../../interfaces/entity.interface.js";

export default function buildAddEndpointUseCase({
    endPointsRepository,
    Endpoint,
}: {
    endPointsRepository: IEndpointsRepository;
    Endpoint: IEndpointEntityConstructor;
}) {
    return async (data: IEndpoint) => {
        const EEndpoint = new Endpoint(data);
        EEndpoint.validate();
        const endpointData = EEndpoint.get();

        const endpoint = await endPointsRepository.addEndpoint(endpointData);
        return endpoint;
    };
}

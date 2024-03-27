import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import {
    IEndpoint,
    IEndpointEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { AnErrorOccurredError } from "@omniflow/common";

export default function buildEditEndpointUseCase({
    endPointsRepository,
    Endpoint,
}: {
    endPointsRepository: IEndpointsRepository;
    Endpoint: IEndpointEntityConstructor;
}) {
    return async ({
        id,
        endpointData,
    }: {
        id: string;
        endpointData: IEndpoint;
    }) => {
        const EEndpoint = new Endpoint(endpointData);
        EEndpoint.validate();
        const data = EEndpoint.get();

        const endpoint = await endPointsRepository.updateEndpoint({
            id,
            newData: data,
        });
        if (!endpoint) throw new AnErrorOccurredError();
    };
}
